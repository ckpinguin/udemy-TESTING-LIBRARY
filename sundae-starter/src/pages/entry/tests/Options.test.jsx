import { render, screen } from "../../../test-utils/testing-library-utils"

import { test, expect } from "vitest"

import Options from "../Options"
import userEvent from "@testing-library/user-event"

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />)

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i })
  expect(scoopImages).toHaveLength(2)

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt)

  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"])
})

test("displays image for each topping option from server", async () => {
  render(<Options optionType="toppings" />)

  const toppingImages = await screen.findAllByRole("img", { name: /topping$/i })
  expect(toppingImages).toHaveLength(3)

  const altText = toppingImages.map((element) => element.alt)
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ])
})

test("scoop subtotal does not update when scoop input is invalid", async () => {
  const user = userEvent.setup()
  render(<Options optionType="scoops" />)

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  })

  const scoopSubtotal = screen.getByText("Scoops total: $0.00")

  await user.clear(chocolateInput)
  await user.type(chocolateInput, "2.5")
  expect(scoopSubtotal).toHaveTextContent("$0.00")

  await user.clear(chocolateInput)
  await user.type(chocolateInput, "-1")
  expect(scoopSubtotal).toHaveTextContent("$0.00")

  await user.clear(chocolateInput)
  await user.type(chocolateInput, "100")
  expect(scoopSubtotal).toHaveTextContent("$0.00")

  // Test a valid input too just to be sure
  await user.clear(chocolateInput)
  await user.type(chocolateInput, "3")
  expect(scoopSubtotal).toHaveTextContent("$6.00")
})
