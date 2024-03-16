import React from "react"
import { StyleSheet, View, TouchableOpacity, Text } from "react-native"

const Taskbar: React.FC<{ onAddCard: () => void }> = ({ onAddCard }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onAddCard}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>✕</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#101010",
    paddingVertical: 25,
    paddingHorizontal: 25,
    position: "absolute",
    alignSelf: "flex-end",
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: "white",
  },
  buttonText: {
    color: "#101010",
    fontSize: 18,
  },
})

export default Taskbar
