import { generateGroqQuestion } from "../Services/groqService"

// Generate a unique ID
function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Pre-defined questions
const questions = [
  { optionA: "Be able to fly", optionB: "Be invisible" },
  { optionA: "Be a famous actor", optionB: "Be a famous musician" },
  { optionA: "Live in the mountains", optionB: "Live by the beach" },
  { optionA: "Have super strength", optionB: "Have super intelligence" },
  { optionA: "Travel to the past", optionB: "Travel to the future" },
  { optionA: "Be able to read minds", optionB: "Be able to teleport" },
  { optionA: "Have unlimited money", optionB: "Have unlimited time" },
  { optionA: "Never have to sleep", optionB: "Never have to eat" },
  { optionA: "Be fluent in all languages", optionB: "Be a master of all musical instruments" },
  { optionA: "Have a rewind button for your life", optionB: "Have a pause button for your life" },
  { optionA: "Be the best player at a sport", optionB: "Be the best player at a video game" },
  { optionA: "Have the ability to talk to animals", optionB: "Have the ability to speak any language" },
  { optionA: "Live without internet", optionB: "Live without AC/heating" },
  { optionA: "Always be 10 minutes late", optionB: "Always be 20 minutes early" },
  { optionA: "Have a personal chef", optionB: "Have a personal masseuse" },
]

// Generate random votes for initial display
const generateRandomVotes = () => {
  return Math.floor(Math.random() * 100) + 10
}

// Generate a random question with votes from predefined list
export const generateQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questions.length)
  const { optionA, optionB } = questions[randomIndex]

  const votesA = generateRandomVotes()
  const votesB = generateRandomVotes()

  return {
    id: generateId(),
    optionA: {
      text: optionA,
      votes: votesA,
    },
    optionB: {
      text: optionB,
      votes: votesB,
    },
    isAIGenerated: false,
  }
}

// Generate a question using Groq AI
export const generateAIQuestion = async () => {
  try {
    return await generateGroqQuestion()
  } catch (error) {
    console.error("Error in generateAIQuestion:", error)
    // Fallback to a predefined question if AI generation fails
    return generateQuestion()
  }
}

