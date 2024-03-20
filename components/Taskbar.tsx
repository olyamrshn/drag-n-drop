import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

const Taskbar: React.FC<{
  onAddCard: () => void
  isAddingTodo: boolean
  onCancel: () => void
}> = ({ onAddCard, isAddingTodo, onCancel }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => (isAddingTodo ? onCancel() : onAddCard())}
      >
        {isAddingTodo ? (
          <Ionicons name="close" size={24} color="white" />
        ) : (
          <Ionicons name="add" size={24} color="white" />
        )}
      </TouchableOpacity>
      <View style={styles.bottomBar}>
        <Ionicons name="home-outline" size={24} color="white" />
        <Ionicons name="search-outline" size={24} color="white" />
        <Ionicons name="map-outline" size={24} color="white" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    bottom: 80,
    right: 20,
    padding: 15,
    borderRadius: 90,
    backgroundColor: "#0074D9",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: width,
    opacity: 0.5,
    backgroundColor: "rgba(295, 295, 255, 0.1)",
    paddingVertical: 20,
  },
})

export default Taskbar
