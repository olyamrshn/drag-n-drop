import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"

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
    // paddingHorizontal: 20,
    borderRadius: 90,
    backgroundColor: "black",
  },
})

export default Taskbar
