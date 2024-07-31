import { render, screen } from "../../../test-utils/testing-library-utils"
import { userEvent } from "@testing-library/user-event"
import Options from "../Options"
import { describe, expect, test } from "vitest"
import OrderEntry from "../OrderEntry"

test.only("update scoop subtotal when scoops change", async () => {
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

describe("grand total", () => {
  test("grand total starts at $0.00", async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/i })
    expect(grandTotal).toHaveTextContent("0.00")
  })

  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />)
    const user = userEvent.setup()
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/i })

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    })
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "2")
    expect(grandTotal).toHaveTextContent("$4.00")

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    })
    await user.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent("5.50")
  })

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />)
    const user = userEvent.setup()
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/i })

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    })
    await user.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent("1.50")

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    })
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "2")
    expect(grandTotal).toHaveTextContent("5.50")
  })

  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />)
    const user = userEvent.setup()
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/i })

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    })
    await user.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent("1.50")

    await user.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent("0.00")

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    })
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "2")
    expect(grandTotal).toHaveTextContent("4.00")

    await user.clear(vanillaInput)
    await user.type(vanillaInput, "1")
    expect(grandTotal).toHaveTextContent("2.00")
  })
})
