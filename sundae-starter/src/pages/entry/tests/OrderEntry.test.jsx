import { render, screen } from "../../../test-utils/testing-library-utils"
import { server } from "../../../mocks/server"
import { http, HttpResponse } from "msw"

import OrderEntry from "../OrderEntry"
import { it, expect } from "vitest"

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
