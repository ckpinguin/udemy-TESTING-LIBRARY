import { useState } from "react"
import Container from "react-bootstrap/Container"
import { OrderDetailsProvider } from "./contexts/OrderDetails"
import OrderSummary from "./pages/summary/OrderSummary"
import OrderEntry from "./pages/entry/OrderEntry"
import OrderConfirmation from "./pages/confirmation/OrderConfirmation"

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress")
  // use states "inProgress", "review" and "completed"

  let Component = OrderEntry
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry
      break
    case "review":
      Component = OrderSummary
      break
    case "completed":
      Component = OrderConfirmation
      break
    default:
  }
  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  )
}

export default App
