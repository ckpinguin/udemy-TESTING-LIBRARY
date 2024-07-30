import "./App.css"
import { useState } from "react"

function App() {
  const [buttonColor, setButtonColor] = useState("red")
  const [disabled, setDisabled] = useState(false)
  const newButtonColor = buttonColor === "red" ? "blue" : "red"

  return (
    <div>
      <button
        className={disabled ? "gray" : buttonColor}
        disabled={disabled}
        onClick={() => setButtonColor(newButtonColor)}>
        Change to {newButtonColor}
      </button>
      <input
        class=""
        type="checkbox"
        value="Disable Button"
        id="disable-button-checkbox"
        defaultChecked={false}
        onChange={() => setDisabled(!disabled)}
      />
      <label htmlFor="disable-button-checkbox">Disable Button</label>
    </div>
  )
}

export default App
