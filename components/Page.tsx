import { Ionicons } from "@expo/vector-icons"
import React, { useRef, useState } from "react"
import "react-native-gesture-handler"
import {
  View,
  ScrollView,
  PanResponder,
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native"

interface CardData {
  id: string
  heading: string
  paragraph: string
}

const DragAndDropCard: React.FC<{
  id: string
  heading: string
  paragraph: string
  moveCard: (dragId: string, hoverId: string) => void
  onDelete: (id: string) => void
}> = ({ id, heading, paragraph, moveCard, onDelete }) => {
  const position = useRef(new Animated.ValueXY()).current
  const [dragging, setDragging] = useState(false)

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setDragging(true)
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: position.x,
            dy: position.y,
          },
        ],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: (event, gesture) => {
        moveCard(id, "id")
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start(() => setDragging(false))
      },
    }),
  ).current

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          transform: position.getTranslateTransform(),
          opacity: dragging ? 0.9 : 1,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity
        onPress={() => onDelete(id)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash" size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.cardHeading}>{heading}</Text>
      <Text style={styles.cardParagraph}>{paragraph}</Text>
    </Animated.View>
  )
}

const Page: React.FC<{
  cards: CardData[]
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>
  isNewTodoVisible: boolean
}> = ({ cards, setCards, isNewTodoVisible }) => {
  const moveCard = (dragId: string, hoverId: string) => {
    const newCards = [...cards]
    const dragIndex = cards.findIndex((card) => card.id === dragId)
    const hoverIndex = cards.findIndex((card) => card.id === hoverId)
    const dragCard = newCards.splice(dragIndex, 1)[0]
    newCards.splice(hoverIndex, 0, dragCard)
    setCards(newCards)
  }

  const handleDeleteCard = (id: string) => {
    const updatedCards = cards.filter((card) => card.id !== id)
    setCards(updatedCards)
  }

  return (
    <View style={styles.content}>
      <View>
        <Text style={styles.title}>Drag and drop App</Text>
        <Text style={styles.subtitle}>Try moving the elements</Text>
      </View>
      <View style={styles.titleTodayContainer}>
        <Ionicons name="paw" size={24} color="darkkhaki" />
        <Text style={styles.titleToday}>Today</Text>
      </View>
      {cards.length === 0 && !isNewTodoVisible ? (
        <Text style={styles.emptyList}>
          You don't have any notes yet.{"\n"} Add a new one :)
        </Text>
      ) : (
        <ScrollView contentContainerStyle={styles.cardsWrapper}>
          {cards.map((card, index) => (
            <DragAndDropCard
              id={card.id}
              key={card.id}
              heading={card.heading}
              paragraph={card.paragraph}
              moveCard={moveCard}
              onDelete={handleDeleteCard}
            />
          ))}
        </ScrollView>
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
  title: {
    fontSize: 25,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "600",
  },
  subtitle: {
    fontWeight: "100",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 10,
    fontSize: 18,
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
