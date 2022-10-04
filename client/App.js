import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const App = () => (
  <View style={styles.container}>
    <ImageBackground
      source={require("./assets/yellow-gloves.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.title}>
        <Text style={styles.titleText}>Chore It Up!</Text>
      </View>
      <View style={styles.loginButton}>
        <Text style={styles.loginText}>Log in</Text>
      </View>
      <View style={styles.registerButton}>
        <Text style={styles.registerText}>Register</Text>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#5efc8d",
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#e18335",
  },
  loginText: {
    color: "white",
    fontSize: 48,
    textAlign: "center",
    justifyContent: "flex-end",
  },
  registerText: {
    color: "white",
    fontSize: 48,
    textAlign: "center",
    justifyContent: "flex-end",
  },
  title: {
    position: "absolute",
    width: "100%",
    height: 70,
    backgroundColor: "#e18335",
    top: 50,
  },
  titleText: {
    fontSize: 48,
    textAlign: "center",
    color: "white",
  },
});

export default App;
