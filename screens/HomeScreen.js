import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/header";
import { AntDesign } from "@expo/vector-icons";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>Escolha um estacionamento:</Text>
      <View style={styles.parkingButtom}>
        <Text style={styles.buttomText}>Veja a lista de estacionamentos </Text>
        <AntDesign name="right" size={24} color="white" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    margin: 10,
    fontSize: 17,
    color: "white",
    left: -55,
  },
  parkingButtom: {
    flexDirection: "row",
    backgroundColor: "#bb86fc",
    margin: 10,
    height: 60,
    width: "85%",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 10,
  },
  buttomText: {
    margin: 10,
    fontSize: 17,
    color: "white",
  },
});
export default HomeScreen;
