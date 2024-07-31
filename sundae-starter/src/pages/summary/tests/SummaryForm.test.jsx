import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import SummaryForm from "../SummaryForm"

test("checking the checkbox enables the button", async () => {
  render(<SummaryForm />)
  const user = userEvent.setup()

  const checkboxEl = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  })
  const buttonEl = screen.getByRole("button", { name: /confirm order/i })

  expect(buttonEl).toBeDisabled()
  expect(checkboxEl).not.toBeChecked()

  await user.click(checkboxEl)

  expect(buttonEl).toBeEnabled()

  await user.click(checkboxEl)

  expect(buttonEl).toBeDisabled()
})

test("popover response to hover", async () => {
  render(<SummaryForm />)
  const user = userEvent.setup()

  // popover starts hidden
  // query...() instead of get...() because it's not in the DOM
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  )
  expect(nullPopover).not.toBeInTheDocument()

  // popover appears on mouseover of checkbox label
  // Here we can use get...() because it should be in the DOM now
  const termsAndConditions = screen.getByText(/terms and conditions/i)
  await user.hover(termsAndConditions)
  const popover = screen.getByText(/no ice cream will actually be delivered/i)
  expect(popover).toBeInTheDocument()

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions)
  expect(popover).not.toBeInTheDocument()
})
