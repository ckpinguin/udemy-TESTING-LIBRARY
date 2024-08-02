import { useOrderDetails } from "../../contexts/OrderDetails"
import SummaryForm from "./SummaryForm"
import { formatCurrency } from "../../utilities"

export default function OrderSummary({ setOrderPhase }) {
  const { totals, optionCounts } = useOrderDetails()

  const scoopArr = Object.entries(optionCounts.scoops)
  const scoopList = scoopArr.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ))

  const hasToppings = totals.toppings > 0
  let toppingsDisplay = null

  if (hasToppings) {
    const toppingArr = Object.entries(optionCounts.toppings)
    const toppingList = toppingArr.map((topping) => (
      <li key={topping}>{topping[0]}</li>
    ))

    toppingsDisplay = (
      <>
        <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
        <ul>{toppingList}</ul>
      </>
    )
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  )
}
