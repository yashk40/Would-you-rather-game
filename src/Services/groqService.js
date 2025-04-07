// Groq API service for generating "Would You Rather" questions

const GROQ_API_KEY = "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"
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

/**
 * Generate a "Would You Rather" question using Groq AI
 * @returns {Promise<Object>} The generated question with options
 */
export const generateGroqQuestion = async () => {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are a creative assistant that generates interesting 'Would You Rather' questions. Generate unique, thought-provoking scenarios that make people think.[make sure the questions was not that big]",
          },
          {
            role: "user",
            content:
              'Generate a \'Would You Rather\' question with two interesting options. Return ONLY a JSON object with the format: {"optionA": "first option text", "optionB": "second option text"}. Make sure both options are balanced in appeal and difficulty of choice.',
          },
        ],
        temperature: 0.8,
        max_tokens: 150,
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    // Parse the response to extract the options
    const content = data.choices[0].message.content

    // The content should be a JSON string, so we parse it
    let parsedContent
    try {
      // Try to parse the content directly
      parsedContent = JSON.parse(content)
    } catch (e) {
      // If direct parsing fails, try to extract JSON from the text
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedContent = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("Failed to parse AI response")
      }
    }

    // Generate random votes for initial display
    const generateRandomVotes = () => Math.floor(Math.random() * 100) + 10

    return {
      id: Math.random().toString(36).substring(2, 15),
      optionA: {
        text: parsedContent.optionA,
        votes: generateRandomVotes(),
      },
      optionB: {
        text: parsedContent.optionB,
        votes: generateRandomVotes(),
      },
      isAIGenerated: true,
    }
  } catch (error) {
    console.error("Error generating question with Groq:", error)
    throw error
  }
}

