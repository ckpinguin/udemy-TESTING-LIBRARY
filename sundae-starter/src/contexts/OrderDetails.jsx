import { createContext, useContext, useState } from "react"
import { pricePerItem } from "../constants"

const OrderDetails = createContext()

// create custom hook to check whether we're inside a provider
// eslint-disable-next-line react-refresh/only-export-components
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails)

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from within an OrderDetailsProvider"
    )
  }

  return contextValue
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, // i.e. { Vanilla: 2, Chocolate: 1 }
    toppings: {}, // i.e. { "Gummi Bears": 1 }
  })

  function updateItemCount(itemName, newItemCount, optionType) {
    //const newOptionCounts = { ...optionCounts }

    // newOptionCounts[optionType][itemName] = newItemCount

    setOptionCounts((previousOptionCounts) => ({
      ...previousOptionCounts,
      [optionType]: {
        ...previousOptionCounts[optionType],
        [itemName]: newItemCount,
      },
    }))
  }

  function resetOrder() {
    setOptionCounts({
      scoops: {},
      toppings: {},
    })
  }

  function calculateTotal(optionType) {
    const countsArr = Object.values(optionCounts[optionType])
    const totalCount = countsArr.reduce((acc, cur) => acc + cur, 0)

    return totalCount * pricePerItem[optionType]
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  }

  const value = { optionCounts, totals, updateItemCount, resetOrder }
  return <OrderDetails.Provider value={value} {...props} />
}
