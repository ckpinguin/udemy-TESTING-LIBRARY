import { render, screen, fireEvent, logRoles } from "@testing-library/react"
import App from "./App"
import { it, test, expect } from "vitest"

it("starts with correct button color", () => {
  const { container } = render(<App />)
  logRoles(container)
  const buttonEl = screen.getByRole("button", { name: /blue/i }) // implicit assertion
  expect(buttonEl).toHaveClass("red")
})

it("has the correct button text", () => {})

it("has the correct button color after click", () => {})

it("has the correct button text after click", () => {})

test("button click flow", () => {
  render(<App />)
  // find an element with a role of button and text matching /blue/i
  const buttonElement = screen.getByRole("button", {
    name: /blue/i,
  })

  // expect the class to be red
  expect(buttonElement).toHaveClass("red")

  // click button
  fireEvent.click(buttonElement)

  // expect the class to be blue
  expect(buttonElement).toHaveClass("blue")

  // expect the button text to match /red/i
  expect(buttonElement).toHaveTextContent(/red/i)
})
