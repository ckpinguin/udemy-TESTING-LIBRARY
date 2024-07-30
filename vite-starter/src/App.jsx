import "./App.css"
import { useState } from "react"
import { kebabCaseToTitleCase } from "./helpers"

function App() {
  const [buttonColor, setButtonColor] = useState("medium-violet-red")
  const [disabled, setDisabled] = useState(false)
  const newButtonColor =
    buttonColor === "medium-violet-red" ? "midnight-blue" : "medium-violet-red"

  return (
    <div>
      <button
        className={disabled ? "gray" : buttonColor}
        disabled={disabled}
        onClick={() => setButtonColor(newButtonColor)}>
        Change to {kebabCaseToTitleCase(newButtonColor)}
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
