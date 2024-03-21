import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native"
// import useEditorBridge from "react-native-text-editor"
interface CardData {
  id: string
  heading: string
  paragraph: string
}

// export const Basic = () => {
//   const editor = (useEditorBridge as any)({
//     autofocus: true,
//     avoidIosKeyboard: true,
//   })
// }

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
          multiline
        />
        <TextInput
          style={styles.inputParagraph}
          placeholder="description ..."
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={paragraph}
          onChangeText={setParagraph}
          multiline
          scrollEnabled={false}
        />
        <TouchableOpacity
          onPress={handleCreate}
          style={[
            { opacity: !heading || !paragraph ? 0.3 : 1 },
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
    borderWidth: 1.5,
    width: 340,
    borderColor: "white",
    borderRadius: 20,
    margin: "auto",
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#FFF",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
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
