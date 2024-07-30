import { render, screen, fireEvent } from "@testing-library/react"
import App from "./App"
import { test, expect, it } from "vitest"
import { kebabCaseToTitleCase } from "./helpers"

// Prefer function setup() over beforeEach() for better maintainability and scoping
// cf. https://kentcdodds.com/blog/avoid-nesting-when-youre-testing
function setup() {
  render(<App />)
}

test("button click flow", () => {
  setup()
  const buttonEl = screen.getByRole("button", { name: /blue/i }) // implicit assertion
  expect(buttonEl).toHaveClass("medium-violet-red")
  //expect(buttonEl).toHaveTextContent(/blue/i) // already implicitly tested by the getByRole()
  fireEvent.click(buttonEl)
  expect(buttonEl).toHaveClass("midnight-blue")
  expect(buttonEl).toHaveTextContent(/red/i)
})

test("button click flow", () => {
  setup()
  // find an element with a role of button and text matching /blue/i
  const buttonElement = screen.getByRole("button", {
    name: /blue/i,
  })

  // expect the class to be red
  expect(buttonElement).toHaveClass("medium-violet-red")

  // click button
  fireEvent.click(buttonElement)

  // expect the class to be blue
  expect(buttonElement).toHaveClass("midnight-blue")

  // expect the button text to match /red/i
  expect(buttonElement).toHaveTextContent(/red/i)
})

test("checkbox flow", () => {
  setup()
  // find elements
  const buttonEl = screen.getByRole("button", { name: /blue/i })
  const checkboxEl = screen.getByRole("checkbox", { name: /disable button/i })

  // check initial conditions
  expect(buttonEl).toBeEnabled()
  expect(checkboxEl).not.toBeChecked()

  // Interact
  fireEvent.click(checkboxEl)

  // check conditions after first interaction
  expect(checkboxEl).toBeChecked()
  expect(buttonEl).toBeDisabled()
  expect(buttonEl).toHaveClass("gray")

  // Interact
  fireEvent.click(checkboxEl)

  // check conditions after second interaction
  expect(checkboxEl).not.toBeChecked()
  expect(buttonEl).toBeEnabled()
  expect(buttonEl).toHaveClass("medium-violet-red")

  // click button
  fireEvent.click(buttonEl)

  // expect the class to be blue
  expect(buttonEl).toHaveClass("midnight-blue")

  // expect the button text to match /red/i
  expect(buttonEl).toHaveTextContent(/red/i)

  // Interact
  fireEvent.click(checkboxEl)

  expect(checkboxEl).toBeChecked()
  expect(buttonEl).toBeDisabled()
  expect(buttonEl).toHaveClass("gray")
})

describe("kebabCaseToTitleCase", () => {
  it("works for no hyphens", () => {
    expect(kebabCaseToTitleCase("red")).toBe("Red")
  })
  it("works for one hyphens", () => {
    expect(kebabCaseToTitleCase("midnight-blue")).toBe("Midnight Blue")
  })
  it("works for multiple hyphens", () => {
    expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red")
  })
})
