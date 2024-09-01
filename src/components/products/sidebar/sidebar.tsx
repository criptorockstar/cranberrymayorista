import React from "react"
import Categories from "./categories"
import Prices from "./prices"
import Colors from "./colors"
import Sizes from "./sizes"

function Sidebar() {
  return (
    <React.Fragment>
      <Categories />
      <Prices />
      <Colors />
      <Sizes />
    </React.Fragment>
  )
}

export default Sidebar
