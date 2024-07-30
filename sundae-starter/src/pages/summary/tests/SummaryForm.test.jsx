import { expect, test } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import SummaryForm from "../SummaryForm"

test("checking the checkbox enables the button", () => {
  render(<SummaryForm />)
  const checkboxEl = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  })
  const buttonEl = screen.getByRole("button", { name: /confirm order/i })

  expect(buttonEl).toBeDisabled()
  expect(checkboxEl).not.toBeChecked()

  fireEvent.click(checkboxEl)

  expect(buttonEl).toBeEnabled()

  fireEvent.click(checkboxEl)

  expect(buttonEl).toBeDisabled()
})
