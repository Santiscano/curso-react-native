import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const options = ["Pomodoro", "Short Break", "Long break"];

const Header = ({ currentTime, setCurrentTime, setTime }) => {

  const handlePress = (index) => {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  };

  return (
    <View style={styles.container}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.itemStyle, currentTime !== index && { borderColor: "transparent"}]}
          onPress={() => handlePress(index)}
        >
          <Text style={{fontWeight: "bold"}}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  itemStyle: {
    width: "33%",
    alignItems:"center",
    borderWidth: 3,
    padding: 5,
    borderRadius: 10,
    borderColor: "white",
    marginVertical: 20
  },
});

export default Header;
