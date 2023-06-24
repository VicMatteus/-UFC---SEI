import * as React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";

function BookButtom() {
  return (
    <View style={styles.bookButtom}>
      <AntDesign name="plus" size={18} color="white" />
    </View>
  );
}
function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View>
          <Entypo name="menu" size={38} color="white" />
        </View>
        <Text style={styles.headerText}> SEI </Text>
      </View>
      <View style={styles.headerRight}>
        <Text style={{ marginEnd: 10, color: "white" }}> Reservar Vaga</Text>
        <BookButtom />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    top: 0,
    height: 90,
    backgroundColor: "#121212",
    alignContent: "space-between",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    width: '100%',
  },
  headerText: {
    fontFamily: "monospace",
    fontSize: 32,
    color: "white",
  },
  headerLeft: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  headerRight: {
    marginHorizontal: 15,
    flexDirection: "row",
    alignContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  bookButtom: {
    backgroundColor: "#1fd1a4",
    height: 40,
    width: 40,
    borderRadius: 7,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
export default Header;
