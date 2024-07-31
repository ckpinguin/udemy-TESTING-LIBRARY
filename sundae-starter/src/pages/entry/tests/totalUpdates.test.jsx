import { render, screen } from "../../../test-utils/testing-library-utils"
import { userEvent } from "@testing-library/user-event"
import Options from "../Options"
import { expect } from "vitest"

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup()
  render(<Options optionType="scoops" />)

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false })
  expect(scoopsSubtotal).toHaveTextContent("0.00")

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  })
  expect(vanillaInput).toHaveValue(0)

  await user.clear(vanillaInput)
  await user.type(vanillaInput, "1")
  expect(vanillaInput).toHaveValue(1)
  expect(scoopsSubtotal).toHaveTextContent("2.00")

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  })
  await user.clear(chocolateInput)
  await user.type(chocolateInput, "2")
  expect(chocolateInput).toHaveValue(2)
  expect(scoopsSubtotal).toHaveTextContent("6.00")
})

test("toppings subtotal updates properly", async () => {
  const user = userEvent.setup()
  render(<Options optionType="toppings" />)

  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  })
  expect(toppingsSubtotal).toHaveTextContent("0.00")

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  })
  await user.click(cherriesCheckbox)
  expect(cherriesCheckbox).toBeChecked()
  expect(toppingsSubtotal).toHaveTextContent("1.50")

  const mmsCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" })
  await user.click(mmsCheckbox)
  expect(mmsCheckbox).toBeChecked()
  expect(toppingsSubtotal).toHaveTextContent("3.00")

  await user.click(cherriesCheckbox)
  expect(cherriesCheckbox).not.toBeChecked()
  expect(toppingsSubtotal).toHaveTextContent("1.50")
})
