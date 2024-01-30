// Importing CSS module styles
import styles from "./keyboard.module.css";

// Array of all keyboard keys
const KEYS = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", 
  "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", 
  "y", "z",
];

// Props interface for the Keyboard component
type KeyboardProps = {
  disabled?: boolean; // Indicates whether the keyboard is disabled
  activeLetters: string[]; // Array of active letters
  inactiveLetters: string[]; // Array of inactive letters
  addGuessedLetter: (letter: string) => void; // Function to add a guessed letter
};

// Keyboard component definition
export function Keyboard({ 
  activeLetters, 
  inactiveLetters, 
  addGuessedLetter, 
  disabled = false 
}: KeyboardProps) {
  return (
    <div 
      style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))", 
        gap: ".5rem" 
      }}
    >
      {/* Mapping through each keyboard key */}
      {KEYS.map(key => {
        // Check if the key is active or inactive
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
          <button 
            // Adding an event listener to add the guessed letter on click
            onClick={() => addGuessedLetter(key)} 
            // Applying CSS classes based on key status
            className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`} 
            // Disabling the button if it's inactive, active, or if the keyboard is disabled
            disabled={isInactive || isActive || disabled} 
            // Setting a unique key for each button
            key={key}
          >
            {key} {/* Displaying the key text */}
          </button>
        );
      })}
    </div>
  );
}
