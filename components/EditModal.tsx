import React, { useState, useEffect } from "react"
import {
  Modal,
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
  imageUri?: string
}

interface EditModalProps {
  isVisible: boolean
  onClose: () => void
  card: CardData
  onUpdate: (card: CardData) => void
}

const EditModal: React.FC<EditModalProps> = ({
  isVisible,
  onClose,
  card,
  onUpdate,
}) => {
  const [heading, setHeading] = useState(card.heading)
  const [paragraph, setParagraph] = useState(card.paragraph)

  const handleUpdate = () => {
    onUpdate({ ...card, heading, paragraph })
    onClose()
  }

  useEffect(() => {
    setHeading(card.heading)
    setParagraph(card.paragraph)
  }, [card])

  console.log(isVisible)
  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalView}>
        <TextInput
          style={styles.modalInput}
          value={heading}
          onChangeText={setHeading}
          placeholder="Heading"
        />
        <TextInput
          style={styles.modalInput}
          value={paragraph}
          onChangeText={setParagraph}
          placeholder="Paragraph"
        />
        <TouchableOpacity style={styles.modalButton} onPress={handleUpdate}>
          <Text>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "black",
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalInput: {
    width: "100%",
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
    marginTop: 10,
  },
})

export default EditModal
