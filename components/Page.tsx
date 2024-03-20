import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import DraggableFlatList from "react-native-draggable-flatlist"

import NewTodo from "./NewTodo"
interface CardData {
  id: string
  heading: string
  paragraph: string
}

const DragAndDropCard: React.FC<{
  id: string
  heading: string
  paragraph: string
  onDelete: (id: string) => void
  drag: () => void
}> = ({ id, heading, paragraph, onDelete, drag }) => {
  return (
    <TouchableOpacity onLongPress={drag} style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => onDelete(id)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash" size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.cardHeading}>{heading}</Text>
      <Text style={styles.cardParagraph}>{paragraph}</Text>
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
          renderItem={({ item, drag }) => (
            <DragAndDropCard
              id={item.id}
              heading={item.heading}
              paragraph={item.paragraph}
              onDelete={handleDeleteCard}
              drag={drag}
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
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    marginTop: 20,
    minHeight: 0,
    borderWidth: 1,
    width: 320,
    borderColor: "grey",
    margin: "auto",
    padding: 10,
    backgroundColor: "white",
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
    color: "gray",
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
    color: "gray",
  },
  editButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 20,
    right: 15,
  },
})

export default Page
