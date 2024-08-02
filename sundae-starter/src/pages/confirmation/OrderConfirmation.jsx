import { Button } from "react-bootstrap"
import { useOrderDetails } from "../../contexts/OrderDetails"
import AlertBanner from "../common/AlertBanner"
import { useEffect, useState } from "react"
import axios from "axios"

export default function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails()
  const [orderNum, setOrderNum] = useState(null)
  const [error, setError] = useState(false)
  if (error) console.error(error)

  function handleClick() {
    resetOrder()
    setOrderPhase("initial")
  }

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((res) => {
        setOrderNum(res.data.orderNumber)
      })
      .catch(() => setError(true))
  }, [setOrderPhase])

  if (error) {
    return <AlertBanner />
  }

  if (orderNum) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You!</h1>
        <p>Your order was received with number: {orderNum}</p>
        <p style={{ fontSize: "25%" }}>
          as pre our terms and conditions, nothing will happen now
        </p>
        <Button variant="primary" onClick={handleClick} type="button">
          Make a new order
        </Button>
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}
