import React, { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
interface CardData {
  id: string
  heading: string
  paragraph: string
}

const NewTodo: React.FC<{ onAdd: (card: CardData) => void }> = ({ onAdd }) => {
  const [heading, setHeading] = useState("")
  const [paragraph, setParagraph] = useState("")

  const handleCreate = () => {
    const newCard: CardData = {
      id: Date.now().toString(),
      heading,
      paragraph,
    }
    onAdd(newCard)
  }

  return (
    <View style={styles.container}>
      <View style={styles.newCard}>
        <TextInput
          style={styles.inputHeading}
          placeholder="todo heading ..."
          value={heading}
          onChangeText={setHeading}
        />
        <TextInput
          style={styles.inputParagraph}
          placeholder="description ..."
          value={paragraph}
          onChangeText={setParagraph}
        />
        <TouchableOpacity
        onPress={handleCreate}
        style={[styles.createbutton, { opacity: !heading || !paragraph ? 0.2 : 1 }]}
        disabled={!heading || !paragraph}
        >
          <Text>
            <Ionicons name="pencil" size={24} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  newCard: {
    marginTop: 20,
    borderWidth: 1,
    width: 320,
    borderColor: "grey",
    margin: "auto",
    padding: 10,
  },
  inputHeading: {
    fontSize: 18,
    color: "black",
    fontWeight: "400",
  },
  inputParagraph: {
    color: "black",
    fontWeight: "300",
    fontSize: 14,
  },
  createbutton: {
    position: "absolute",
    right: 10,
    marginTop: 20,
  },
})

export default NewTodo
