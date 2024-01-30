// Component props definition
type HangmanWordProps = {
  guessedLetters: string[] // Array of guessed letters
  wordToGuess: string // Word to be guessed
  reveal?: boolean // Flag to reveal the entire word
}

// HangmanWord component definition
export function HangmanWord({ guessedLetters, wordToGuess, reveal = false }: HangmanWordProps) {
  return (
    <div 
      style={{ 
        display: "flex", 
        gap: ".25em", 
        fontSize: "6rem", 
        fontWeight: "bold", 
        textTransform: "uppercase", 
        fontFamily: "monospace"
      }}
    >
      {/* Render each letter of the word */}
      {wordToGuess.split("").map((letter, index) => (
        <span style={{ borderBottom: ".1em solid black" }} key={index}>
          {/* Render each letter with appropriate styling */}
          <span style={{
            // Set visibility based on whether the letter is guessed or revealed
            visibility: guessedLetters.includes(letter) || reveal ? "visible" : "hidden",
            // Set color based on whether the letter is not guessed and revealed
            color: !guessedLetters.includes(letter) && reveal ? "red" : "black"
          }}>
            {/* Render the letter */}
            {letter}
          </span>
        </span>
      ))}
    </div>
  )
}
