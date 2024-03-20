import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
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
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={heading}
          onChangeText={setHeading}
        />
        <TextInput
          style={styles.inputParagraph}
          placeholder="description ..."
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={paragraph}
          onChangeText={setParagraph}
        />
        <TouchableOpacity
          onPress={handleCreate}
          style={[
            { opacity: !heading || !paragraph ? 0.6 : 1 },
            styles.createbutton,
          ]}
          disabled={!heading || !paragraph}
        >
          <Text>
            <Ionicons name="pencil" size={24} color="white" />
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
    color: "white",
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
    color: "white",
    fontWeight: "400",
  },
  inputParagraph: {
    marginTop: 3,
    fontWeight: "300",
    fontSize: 14,
    color: "white",
  },
  createbutton: {
    position: "absolute",
    right: 10,
    marginTop: 20,
  },
})

export default NewTodo
