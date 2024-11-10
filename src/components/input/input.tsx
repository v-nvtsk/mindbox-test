import { useState } from 'react'
import styles from './style.module.css'

interface TextInputWithButtonProps {
  buttonText: string
  onButtonClick: (text: string) => void
}

export function TextInputWithButton({ buttonText, onButtonClick }: TextInputWithButtonProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleButtonClick = () => {
    onButtonClick(inputValue)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleButtonClick()
      setInputValue('')
    }
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
      />
      {inputValue !== '' && (
        <button className={styles.button} onClick={handleButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  )
}
