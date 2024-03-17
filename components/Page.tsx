import React, { useRef, useState } from "react"
import {
  View,
  PanResponder,
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
interface CardData {
  id: string
  heading: string
  paragraph: string
}

const DragAndDropCard: React.FC<{
  heading: string
  paragraph: string
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
  onDelete: (index: number) => void
}> = ({ heading, paragraph, index, moveCard, onDelete }) => {
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
        const hoverIndex = index
        moveCard(index, hoverIndex)
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
        onPress={() => onDelete(index)}
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
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragCard = cards[dragIndex]
    const newCards = [...cards]
    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)
    setCards(newCards)
  }

  const handleDeleteCard = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index)
    setCards(updatedCards)
  }

  return (
    <View style={styles.content}>
      <View>
        <Text style={styles.title}>Drag and drop app</Text>
        <Text style={styles.subtitle}>Try moving the elements</Text>
      </View>
      <View style={styles.titleTodayContainer}>
        <Ionicons name="paw" size={24} color="darkkhaki" />
        <Text style={styles.titleToday}>Today</Text>
      </View>
      {cards.length === 0 && !isNewTodoVisible ? (
        <Text style={styles.emptyList}>
          The list is empty.{"\n"}Add a new todo.
        </Text>
      ) : (
        <View style={styles.cardsWrapper}>
          {cards.map((card, index) => (
            <DragAndDropCard
              key={card.id}
              heading={card.heading}
              paragraph={card.paragraph}
              index={index}
              moveCard={moveCard}
              onDelete={handleDeleteCard}
            />
          ))}
        </View>
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
    fontSize: 14,
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
    fontSize: 18,
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
