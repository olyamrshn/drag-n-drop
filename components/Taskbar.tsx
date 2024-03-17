import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, View, TouchableOpacity, Text } from "react-native"

const Taskbar: React.FC<{ onAddCard: () => void }> = ({ onAddCard }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onAddCard}>
        <Text style={styles.buttonText}>
        <Ionicons name="pencil" size={24} color="white" />
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 20,
    right: 20,
  },
  button: {
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 70,
    backgroundColor: "black",
  },
  buttonText: {
    color: "white",
    fontSize: 25,
  },
})

export default Taskbar

