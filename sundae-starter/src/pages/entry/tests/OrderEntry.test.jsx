import { render, screen } from "../../../test-utils/testing-library-utils"
import { server } from "../../../mocks/server"
import { http, HttpResponse } from "msw"

import OrderEntry from "../OrderEntry"
import { vi, it, expect } from "vitest"
import userEvent from "@testing-library/user-event"

it("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, { status: 500 })
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 })
    })
  )

  render(<OrderEntry />)

  const alerts = await screen.findAllByRole("alert")
  //  name: "An unexpected error occurred. Please try again later.",
  //})
  /*   const alerts = await screen.findAllByText(
    "An unexpected error occurred. Please try again later."
  ) */
  // logRoles(container)
  expect(alerts).toHaveLength(2)
})

it("disables order button if no scoops selected", async () => {
  const user = userEvent.setup()
  render(<OrderEntry setOrderPhase={vi.fn} />)

  // find order button
  const orderBtn = screen.getByRole("button", { name: /order now/i })
  expect(orderBtn).toBeDisabled()

  // add ice cream scoops
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  })
  await user.clear(chocolateInput)
  await user.type(chocolateInput, "2")
  expect(orderBtn).toBeEnabled()

  await user.clear(chocolateInput)
  expect(orderBtn).toBeDisabled()
})
