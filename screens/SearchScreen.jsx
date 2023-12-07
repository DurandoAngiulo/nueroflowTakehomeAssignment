import React, { useState, useEffect } from "react";
import { useAuthRequest } from "expo-auth-session";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import searchScreenStyles from "../styles/searchScreenStyles";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [tokenExpiry, setTokenExpiry] = useState(null);
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.EXPO_PUBLIC_SPOTIFY_REDIRECT_URI,
      scopes: ["user-read-email", "user-library-read"],
      usePKCE: false,
    },
    discovery
  );

  const nav = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [nav]);

  //Authentication on load
  useEffect(() => {
    const authenticateOnLoad = async () => {
      try {
        setLoading(true);
        const result = await promptAsync();
        if (result.type === "success") {
          const { code } = result.params;
          const tokenResponse = await fetch(discovery.tokenEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(
              process.env.EXPO_PUBLIC_SPOTIFY_REDIRECT_URI
            )}&client_id=${
              process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID
            }&client_secret=${process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET}`,
          });
          const data = await tokenResponse.json();
          setAccessToken(data.access_token);
          setTokenExpiry(new Date().getTime() + data.expires_in * 1000);
        }
      } catch (error) {
        console.error("Spotify Authentication Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (request) {
      authenticateOnLoad();
    }
  }, [request, promptAsync]);

  //successful authentication, handle data
  useEffect(() => {
    const fetchData = async () => {
      if (accessToken && !isTokenExpired() && query.trim()) {
        try {
          setLoading(true);
          const response = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(
              query
            )}&type=artist`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const data = await response.json();

          if (data.artists && data.artists.items) {
            setArtists(data.artists.items);
          } else {
            console.error("Unexpected response from Spotify API:", data);
          }
        } catch (error) {
          console.error("Error searching Spotify:", error);

          if (error.message === "Invalid access token") {
            await refreshToken();

            fetchData();
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [accessToken, isTokenExpired, query]);

  //Token refresh if expired
  const refreshToken = async () => {
    try {
      const refreshResponse = await fetch(discovery.tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=refresh_token&refresh_token=your_stored_refresh_token&client_id=${process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID}&client_secret=${process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET}`,
      });
      const data = await refreshResponse.json();
      setAccessToken(data.access_token);
      setTokenExpiry(new Date().getTime() + data.expires_in * 1000);
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  const isTokenExpired = () => {
    return tokenExpiry && new Date().getTime() > tokenExpiry;
  };

  const renderArtistItem = ({ item }) => (
    <TouchableOpacity
      style={searchScreenStyles.artistItemContainer}
      onPress={() => navigation.navigate("Artist", { artist: item })}
    >
      <View>
        <View style={searchScreenStyles.imageShadow}>
          <Image
            source={{ uri: item.images[0]?.url }}
            style={searchScreenStyles.artistImage}
          />
        </View>

        <Text style={searchScreenStyles.artistName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={searchScreenStyles.container}>
      <View style={searchScreenStyles.searchBar}>
        <TextInput
          style={searchScreenStyles.searchInput}
          placeholder="Search for artists"
          value={query}
          onChangeText={(text) => setQuery(text)}
        />
        <Pressable
          style={searchScreenStyles.searchButton}
          onPress={() => {
            if (query.trim()) {
              setArtists([]);
            }
          }}
        >
          <Text style={searchScreenStyles.searchText}>Search</Text>
        </Pressable>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : query.trim() === "" ? (
        <></>
      ) : (
        <FlatList
          style={searchScreenStyles.artistsContainer}
          data={artists}
          keyExtractor={(item) => item.id}
          renderItem={renderArtistItem}
        />
      )}
    </View>
  );
};

export default SearchScreen;
