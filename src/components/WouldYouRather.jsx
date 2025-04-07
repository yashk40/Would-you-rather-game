"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { generateQuestion, generateAIQuestion } from "../utils/questions"
import AIIntegration from "./AIIntegration"

function WouldYouRather() {
  const [question, setQuestion] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [fadeIn, setFadeIn] = useState(false)
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadNewQuestion()
  }, [])

  const loadNewQuestion = async (useAI = false) => {
    setIsLoading(true)
    setSelectedOption(null)
    setFadeIn(false)
    setError(null)

    // Fade out effect
    setTimeout(
      async () => {
        try {
          let newQuestion

          if (useAI) {
            setIsGeneratingAI(true)
            newQuestion = await generateAIQuestion()
            setIsGeneratingAI(false)
          } else {
            newQuestion = generateQuestion()
          }

          setQuestion(newQuestion)
          setIsLoading(false)

          // Fade in effect
          setTimeout(() => {
            setFadeIn(true)
          }, 100)
        } catch (err) {
          setError("Failed to generate question. Please try again.")
          setIsLoading(false)
          setIsGeneratingAI(false)
        }
      },
      fadeIn ? 500 : 0,
    )
  }

  const handleAIGenerate = async () => {
    if (!isGeneratingAI) {
      await loadNewQuestion(true)
    }
  }

  const handleOptionSelect = (option) => {
    if (selectedOption) return

    setSelectedOption(option)

    // Update the votes in the question
    if (question) {
      const updatedQuestion = { ...question }
      if (option === "A") {
        updatedQuestion.optionA.votes += 1
      } else {
        updatedQuestion.optionB.votes += 1
      }
      setQuestion(updatedQuestion)
    }
  }

  const getTotalVotes = () => {
    if (!question) return 0
    return question.optionA.votes + question.optionB.votes
  }

  const getPercentage = (votes) => {
    const total = getTotalVotes()
    if (total === 0) return 0
    return Math.round((votes / total) * 100)
  }

  if (isLoading) {
    return (
      <div className="loading-container">
<svg viewBox="0 0 16 16" height="48" width="48" class="windows-loading-spinner">
  <circle r="7px" cy="8px" cx="8px"></circle>
</svg>

      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={() => loadNewQuestion()}>
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="would-you-rather-container">
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        WOULD YOU RATHER
      </motion.h1>

      {question.isAIGenerated && (
        // <div className="ai-badge">
        //   <span>AI Generated</span>
        // </div>
        <div/>
      )}

      <div className={`options-container ${fadeIn ? "fade-in" : "opacity-0"}`}>
        {/* Option A */}
        <motion.div
          className={`option-card option-blue ${selectedOption && selectedOption !== "A" ? "disabled" : ""} ${selectedOption === "A" ? "selected" : ""}`}
          onClick={() => handleOptionSelect("A")}
          whileHover={!selectedOption ? { scale: 1.03 } : {}}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="option-text">{question?.optionA.text}</h2>
          <div className={`percentage ${selectedOption ? "show" : ""}`}>
            {getPercentage(question?.optionA.votes || 0)}%
          </div>
        </motion.div>

        {/* OR Circle */}
        {/* <div className="or-circle">OR</div> */}

        {/* Option B */}
        <motion.div
          className={`option-card option-red ${selectedOption && selectedOption !== "B" ? "disabled" : ""} ${selectedOption === "B" ? "selected" : ""}`}
          onClick={() => handleOptionSelect("B")}
          whileHover={!selectedOption ? { scale: 1.03 } : {}}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="option-text">{question?.optionB.text}</h2>
          <div className={`percentage ${selectedOption ? "show" : ""}`}>
            {getPercentage(question?.optionB.votes || 0)}%
          </div>
        </motion.div>
      </div>

      <div className="buttons-container">
        {/* <motion.button
          className="next-button"
          onClick={() => loadNewQuestion()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="button-icon" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          Next Question
        </motion.button> */}

        <AIIntegration onGenerateQuestion={handleAIGenerate} isGenerating={isGeneratingAI} />
      </div>
    </div>
  )
}

export default WouldYouRather

