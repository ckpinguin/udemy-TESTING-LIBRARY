import { render } from "@testing-library/react"
import { OrderDetailsProvider } from "../contexts/OrderDetails"

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options })

// Need to re-export everything from the testing-library
// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react"

// override the built-in render with our own
export { renderWithContext as render }
