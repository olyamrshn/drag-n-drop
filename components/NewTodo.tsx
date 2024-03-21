import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native"

interface CardData {
  id: string
  heading: string
  paragraph: string
  imageUri?: string
}

const NewTodo: React.FC<{ onAdd: (card: CardData) => void }> = ({ onAdd }) => {
  const [heading, setHeading] = useState("")
  const [paragraph, setParagraph] = useState("")
  const [imageUri, setImageUri] = useState<string | undefined>(undefined)

  const handleCreate = () => {
    const newCard: CardData = {
      id: Date.now().toString(),
      heading,
      paragraph,
      imageUri,
    }
    onAdd(newCard)
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setImageUri(result.assets[0].uri)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.newCard}>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        <TextInput
          style={styles.inputHeading}
          placeholder="todo heading"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={heading}
          onChangeText={setHeading}
          multiline
        />
        <TextInput
          style={styles.inputParagraph}
          placeholder="description"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={paragraph}
          onChangeText={setParagraph}
          multiline
          scrollEnabled={false}
        />
        <TouchableOpacity onPress={pickImage} style={styles.pickImageButton}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {imageUri ? (
              <></>
            ) : (
              <Ionicons
                name="image"
                style={styles.pickIcon}
                size={15}
                color="white"
              />
            )}
            {imageUri ? (
              <></>
            ) : (
              <Text style={styles.pickImageButtonText}>pick an image</Text>
            )}
          </View>
        </TouchableOpacity>
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
    paddingLeft: 20,
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  pickImageButton: {
    width: 100,
  },
  pickImageButtonText: {
    color: "white",
    textAlign: "left",
    width: 150,
    paddingTop: 10,
    paddingLeft: 5,
  },
  pickIcon: {
    marginTop: 10,
  },
})

export default NewTodo
