import SummaryForm from "./pages/summary/SummaryForm"
import Options from "./pages/entry/Options"
import Container from "react-bootstrap/Container"
import OrderEntry from "./pages/entry/OrderEntry"
import { OrderDetailsProvider } from "./contexts/OrderDetails"
import { useState } from "react"

function App() {
  const [orderPhase, setOrderPhase] = useState()

  return (
    <OrderDetailsProvider>
      <Container>
        <OrderEntry />
      </Container>
    </OrderDetailsProvider>
  )
}

export default App
