import React from "react";
import { View, Text, Image } from "react-native";
import artistScreenStyles from "../styles/ArtistScreenStyles";

const ArtistScreen = ({ route }) => {
  const { artist } = route.params;

  return (
    <View style={artistScreenStyles.container}>
      <Image
        source={{ uri: artist.images[0]?.url }}
        style={{
          width: "100%",
          height: "70%",
          resizeMode: "cover",
          marginBottom: 100,
        }}
      />
      <View style={artistScreenStyles.overlay} />
      <Text style={artistScreenStyles.artistName}>{artist.name}</Text>
      <View style={artistScreenStyles.followersSpacing}>
        <View style={artistScreenStyles.followersContainer}>
          <Text style={artistScreenStyles.followersNumber}>
            {artist.followers.total}
          </Text>
        </View>
        <Text style={artistScreenStyles.followersText}>Followers</Text>
      </View>
    </View>
  );
};

export default ArtistScreen;
