import { it, expect } from "vitest"
import { render, screen } from "../../../test-utils/testing-library-utils"
import { server } from "../../../mocks/server"
import { http, HttpResponse } from "msw"
import OrderConfirmation from "../OrderConfirmation"

it("shows an error banner when server returns an error", async () => {
  server.resetHandlers(
    http.post("http://localhost:3030/order", () => {
      return new HttpResponse(null, { status: 500 })
    })
  )

  render(<OrderConfirmation setOrderPhase={vi.fn} />)

  const alert = await screen.findByRole("alert")
  expect(alert).toHaveTextContent(
    "An unexpected error occurred. Please try again later."
  )
})
