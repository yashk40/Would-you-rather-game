"use client"
import { motion } from "framer-motion"

function AIIntegration({ onGenerateQuestion, isGenerating }) {
  const handleGenerateAIQuestion = () => {
    if (onGenerateQuestion && !isGenerating) {
      onGenerateQuestion()
    }
  }

  return (
    <div className="ai-integration">
      <motion.button
        className="ai-button"
        onClick={handleGenerateAIQuestion}
        disabled={isGenerating}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isGenerating ? "Generating AI question..." : "Generate AI question"}
      >
        {isGenerating ? (
          <>
            <svg className="spinner" viewBox="0 0 24 24">
              <circle
                className="spinner-circle"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              ></circle>
              <path
                className="spinner-path"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating AI Question...
          </>
        ) : (
          <>
           
            Next Question
          </>
        )}
      </motion.button>
    </div>
  )
}

export default AIIntegration

