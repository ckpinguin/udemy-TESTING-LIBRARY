import { userEvent } from "@testing-library/user-event"
import { test, expect } from "vitest"
import { render, screen } from "../../../test-utils/testing-library-utils"
import ScoopOption from "../ScoopOption"

test("input box turns red when invalid input", async () => {
  const user = userEvent.setup()
  render(<ScoopOption />)

  // input should be invalid with neg. number
  const chocolateInput = screen.getByRole("spinbutton")
  await user.clear(chocolateInput)
  await user.type(chocolateInput, "-1")
  expect(chocolateInput).toHaveClass("is-invalid")

  // replace with decimal input
  await user.clear(chocolateInput)
  await user.type(chocolateInput, "2.5")
  expect(chocolateInput).toHaveClass("is-invalid")

  // replace with valid input
  await user.clear(chocolateInput)
  await user.type(chocolateInput, "2")
  expect(chocolateInput).not.toHaveClass("is-invalid")
})
