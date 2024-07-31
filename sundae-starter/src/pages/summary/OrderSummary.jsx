import { useOrderDetails } from "../../contexts/OrderDetails"
import SummaryForm from "./SummaryForm"
import { formatCurrency } from "../../utilities"

export default function OrderSummary() {
  const { totals, optionCounts } = useOrderDetails()

  const scoopArr = Object.entries(optionCounts.scoops)
  const scoopList = scoopArr.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ))
  const toppingArr = Object.entries(optionCounts.toppings)
  const toppingList = toppingArr.map((topping) => (
    <li key={topping}>{topping}</li>
  ))

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm />
    </div>
  )
}
