import { Ionicons } from "@expo/vector-icons"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import React, { useState, useRef } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
} from "react-native"
import DraggableFlatList from "react-native-draggable-flatlist"

import NewTodo from "./NewTodo"
import Text from "./TextColor"

interface CardData {
  id: string
  heading: string
  paragraph: string
  imageUri?: string
}

const DragAndDropCard: React.FC<{
  id: string
  heading: string
  paragraph: string
  imageUri?: string
  onDelete: (id: string) => void
  drag: () => void
  onPress: () => void
  isDraggingOver: boolean
}> = ({
  id,
  heading,
  paragraph,
  onDelete,
  drag,
  isDraggingOver,
  imageUri,
  onPress,
}) => {
  const cardStyle = [
    styles.cardContainer,
    isDraggingOver && styles.draggingOverCard,
  ]
  return (
    <TouchableOpacity onPress={onPress} onLongPress={drag} style={cardStyle}>
      <View style={styles.cardLayout}>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.cardImage} />
        )}
        <TouchableOpacity
          onPress={() => onDelete(id)}
          style={styles.deleteButton}
        >
          <Ionicons name="trash" size={20} color="white" />
        </TouchableOpacity>
        <View style={styles.cardTextContent}>
          <Text style={styles.cardHeading}>{heading}</Text>
          <Text style={styles.cardParagraph}>{paragraph}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Page: React.FC<{
  cards: CardData[]
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>
  isNewTodoVisible: boolean
  onUpdate: (card: CardData) => void
}> = ({ cards, setCards, isNewTodoVisible, onUpdate }) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false)
  const [activeCard, setActiveCard] = useState<CardData | null>(null)
  const bottomSheetRef = useRef(null)

  const handleDeleteCard = (id: string) => {
    const updatedCards = cards.filter((card) => card.id !== id)
    setCards(updatedCards)
  }

  const handleCardPress = (card: CardData) => {
    setActiveCard(card)
    setBottomSheetVisible(true)
  }

  const handleSave = () => {
    if (activeCard) {
      const updatedCards = cards.map((card) =>
        card.id === activeCard.id ? { ...activeCard } : card,
      )
      setCards(updatedCards)
      setBottomSheetVisible(false)
    }
  }

  return (
    <View style={styles.content}>
      <View style={styles.titleTodayContainer}>
        <Ionicons name="paw" size={24} color="white" />
        <Text style={styles.titleToday}>Today</Text>
      </View>
      {isNewTodoVisible && <NewTodo onAdd={onUpdate} />}
      {!isNewTodoVisible && cards.length === 0 ? (
        <Text style={styles.emptyList}>
          You don't have any notes yet.{"\n"}Add a new one
        </Text>
      ) : (
        <DraggableFlatList
          data={cards}
          onDragEnd={({ data }) => setCards(data)}
          keyExtractor={(item) => item.id}
          renderItem={({ item, drag, isActive }) => (
            <DragAndDropCard
              id={item.id}
              heading={item.heading}
              paragraph={item.paragraph}
              imageUri={item.imageUri}
              onDelete={handleDeleteCard}
              drag={drag}
              isDraggingOver={isActive}
              onPress={() => handleCardPress(item)}
            />
          )}
        />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={isBottomSheetVisible ? 0 : -1}
        snapPoints={["95%"]}
        backgroundStyle={{ backgroundColor: "black" }}
      >
        <BottomSheetView
          style={{
            backgroundColor: "black",
            alignItems: "center",
          }}
        >
          {activeCard && (
            <View>
              <TextInput
                style={styles.sheetHeading}
                value={activeCard.heading}
                onChangeText={(text) =>
                  setActiveCard({ ...activeCard, heading: text })
                }
              />
              <TextInput
                style={styles.sheetParagraph}
                value={activeCard.paragraph}
                onChangeText={(text) =>
                  setActiveCard({ ...activeCard, paragraph: text })
                }
              />
              {activeCard.imageUri && (
                <Image
                  source={{ uri: activeCard.imageUri }}
                  style={styles.sheetImage}
                />
              )}
              <Button title="save" onPress={handleSave} />
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    marginTop: 50,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  draggingOverCard: {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  cardContainer: {
    paddingLeft: 0,
    minHeight: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 1,
    width: 340,
    borderColor: "grey",
    margin: "auto",
    padding: 10,
    backgroundColor: "black",
  },
  cardLayout: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 110,
    height: 90,
    borderRadius: 20,
    marginRight: 10,
  },
  cardTextContent: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center",
  },
  cardsWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: "400",
  },
  cardParagraph: {
    fontWeight: "300",
    fontSize: 16,
    marginTop: 6,
  },
  titleTodayContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  titleToday: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 10,
  },
  emptyList: {
    marginTop: 100,
    textAlign: "center",
    margin: "auto",
    fontSize: 18,
    fontWeight: "100",
  },
  editButton: {
    position: "absolute",
    top: 10,
    right: 10,
    color: "white",
  },
  deleteButton: {
    position: "absolute",
    top: 20,
    right: 15,
    color: "#fff",
  },
  sheetHeading: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    color: "#fff",
    textAlign: "center",
  },
  sheetParagraph: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    color: "#fff",
    textAlign: "center",
  },
  sheetImage: {
    width: 200,
    height: 200,
    margin: "auto",
  },
})

export default Page
