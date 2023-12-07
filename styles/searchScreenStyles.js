import { StyleSheet } from "react-native";

const searchScreenStyles = StyleSheet.create({
  searchText: {
    color: "#fff",
    fontSize: 16,
  },

  container: {
    flex: 1,
    paddingTop: 30,
    padding: 16,
    backgroundColor: "#f8fbff",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "center",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    marginRight: 20,
    paddingLeft: 10,
    borderRadius: 10,
    width: 250,
    backgroundColor: "#fff",
  },
  searchButton: {
    marginBottom: 10,
    backgroundColor: "#444C56",
    padding: 10,
    borderRadius: 9,
    width: 70,
    height: 40,
    alignItems: "center",
  },
  artistsContainer: {
    marginTop: 100,
  },
  artistItemContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  artistImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 20,
  },
  imageShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, heighrt: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4.84,
  },
  artistName: {
    textAlign: "center",
    color: "#293237",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default searchScreenStyles;
