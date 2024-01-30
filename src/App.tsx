import { useCallback, useEffect, useState } from "react"; // Importing necessary hooks from React
import { HangmanDrawing } from "./HangmanDrawing"; // Importing HangmanDrawing component
import { HangmanWord } from "./HangmanWord"; // Importing HangmanWord component
import { Keyboard } from "./Keyboard"; // Importing Keyboard component
import words from "./wordList.json"; // Importing list of words for the game

// Function to randomly select a word from the word list
function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Main App component
function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord); // State for the word to guess
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]); // State for guessed letters

  // Filter incorrect guessed letters
  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  );

  // Check if the player has lost
  const isLoser = incorrectLetters.length >= 6;

  // Check if the player has won
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter));

  // Function to add a guessed letter
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters(currentLetters => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  // Effect to handle keypress events for guessing letters
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  // Effect to handle keypress events for starting a new game
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  // Rendering the game components
  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Nice Try - Refresh to try again"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App; // Exporting the App component as default
