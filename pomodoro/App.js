import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
// import { Audio } from 'expo-av';

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setisActive] = useState(false);

  const handleStartStop = () => {
    // palySound();
    setisActive(!isActive)
  }

  // async function palySound(){
  //   const { sound } = await Audio.Sound.createAsync(
  //     require("./assets/click.mp3")
  //   );
  //   await sound.playAsync();
  // }

  useEffect(() => {
    let interval = null;

    if(isActive){
      // correr timer
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000)
    } else {
      // clear interval
      clearInterval(interval);
    }

    if(time === 0){
      setisActive(false);
      setIsWorking(prev => !prev);
      setTime(isWorking ? 300 : 1500);
    }

    return () => clearInterval(interval);
  },[isActive, time]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === "android" && 30,
          borderWidth: 3,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  }
});
