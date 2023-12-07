import { StyleSheet } from "react-native";
const artistScreenStyles = StyleSheet.create({
  container: {
    heigth: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: "70%",
  },
  artistName: {
    position: "absolute",
    bottom: "31%",
    alignSelf: "center",
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
  },
  followersSpacing: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginTop: 0,
  },
  followersContainer: {
    backgroundColor: "#444C56",
    padding: 10,
    borderRadius: 20,
    width: "auto",
    height: 90,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, heighrt: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3.84,
  },
  followersText: {
    color: "#293237",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  followersNumber: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default artistScreenStyles;
