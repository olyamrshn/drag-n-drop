import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { View, StyleSheet, TouchableOpacity, Image } from "react-native"
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
  isDraggingOver: boolean
}> = ({ id, heading, paragraph, onDelete, drag, isDraggingOver, imageUri }) => {
  const cardStyle = [
    styles.cardContainer,
    isDraggingOver && styles.draggingOverCard,
  ]
  return (
    <TouchableOpacity onLongPress={drag} style={cardStyle}>
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
  onAdd: (card: CardData) => void
}> = ({ cards, setCards, isNewTodoVisible, onAdd }) => {
  const handleDeleteCard = (id: string) => {
    const updatedCards = cards.filter((card) => card.id !== id)
    setCards(updatedCards)
  }

  return (
    <View style={styles.content}>
      <View style={styles.titleTodayContainer}>
        <Ionicons name="paw" size={24} color="darkkhaki" />
        <Text style={styles.titleToday}>Today</Text>
      </View>
      {isNewTodoVisible && <NewTodo onAdd={onAdd} />}
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
            />
          )}
        />
      )}
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
    marginTop: 20,
    paddingLeft: 20,
    minHeight: 0,
    borderWidth: 1,
    width: 340,
    borderColor: "grey",
    borderRadius: 20,
    margin: "auto",
    padding: 10,
    backgroundColor: "#121212",
  },
  cardLayout: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
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
    alignItems: "center",
    marginTop: 20,
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
    color: "white",
  },
})

export default Page
