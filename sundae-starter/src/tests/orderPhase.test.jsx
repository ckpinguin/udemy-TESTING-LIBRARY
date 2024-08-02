import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { expect, test } from "vitest"

import App from "../App"

test("order phases for happy path", async () => {
  const user = userEvent.setup()
  render(<App />)

  // add ice cream scoops and toppings
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  })
  await user.clear(chocolateInput)
  await user.type(chocolateInput, "2")

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  })
  await user.click(cherriesCheckbox)

  // find and click order button
  const orderBtn = screen.getByRole("button", { name: /order now/i })
  await user.click(orderBtn)

  // check summary information based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" })
  expect(summaryHeading).toBeInTheDocument()

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" }) // implicit assertion
  expect(scoopsHeading).toBeInTheDocument()

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  }) // implicit assertion
  expect(toppingsHeading).toBeInTheDocument()

  expect(screen.getByText("2 Chocolate")).toBeInTheDocument()
  expect(screen.getByText("Cherries")).toBeInTheDocument()

  // accept terms & conditions and click button to confirm order
  const confirmBtn = screen.getByRole("button", { name: /confirm order/i })
  const agreeBtn = screen.getByRole("checkbox", { name: /agree/i })
  await user.click(agreeBtn)
  expect(confirmBtn).toBeEnabled()
  await user.click(confirmBtn)

  // confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  })
  expect(thankYouHeader).toBeInTheDocument()

  // loading screen should have disappeared
  const loading = screen.queryByText("loading")
  expect(loading).not.toBeInTheDocument()

  // async because it depends on (mock) server response!
  const orderNumber = await screen.findByText(
    /Your order was received with number:/i
  )
  expect(orderNumber).toHaveTextContent("123456789")

  // click new order button on confirmation page
  const newOrderBtn = screen.getByRole("button", { name: /new order/i })
  await user.click(newOrderBtn)

  // check that scoops and toppings subtotals have been reset
  const scoopsSubtotal = await screen.findByText("Scoops total: $", {
    exact: false,
  })
  expect(scoopsSubtotal).toHaveTextContent("0.00")
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  })
  expect(toppingsSubtotal).toHaveTextContent("0.00")
})

test("no toppings header showed on summary page when no toppings are selected", async () => {
  const user = userEvent.setup()
  render(<App />)

  // add ice cream scoops and toppings
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  })
  await user.clear(chocolateInput)
  await user.type(chocolateInput, "2")

  // No toppings!
  // find and click order button
  const orderBtn = screen.getByRole("button", { name: /order now/i })
  await user.click(orderBtn)

  // check summary information based on order
  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" }) // implicit assertion
  expect(scoopsHeading).toBeInTheDocument()

  const toppingsHeading = screen.queryByRole("heading", { name: /Toppings:/i })
  expect(toppingsHeading).not.toBeInTheDocument()
})

test("toppings header is not on summary page if toppings ordered, then removed", async () => {
  const user = userEvent.setup()
  render(<App />)

  // add ice cream scoops and toppings
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  })
  await user.clear(chocolateInput)
  await user.type(chocolateInput, "2")

  // Add and remove topping
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  })
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false })

  await user.click(cherriesCheckbox)
  expect(toppingsTotal).toHaveTextContent("1.50")

  await user.click(cherriesCheckbox)
  expect(toppingsTotal).toHaveTextContent("0.00")

  // find and click order button
  const orderBtn = screen.getByRole("button", { name: /order now/i })
  await user.click(orderBtn)

  // check summary information based on order
  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" }) // implicit assertion
  expect(scoopsHeading).toBeInTheDocument()

  const toppingsHeading = screen.queryByRole("heading", { name: /Toppings:/i })
  expect(toppingsHeading).not.toBeInTheDocument()
})
