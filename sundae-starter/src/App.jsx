import SummaryForm from "./pages/summary/SummaryForm"
import Options from "./pages/entry/Options"
import Container from "react-bootstrap/Container"
import OrderEntry from "./pages/entry/OrderEntry"
import { OrderDetailsProvider } from "./contexts/OrderDetails"

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  )
}

export default App
