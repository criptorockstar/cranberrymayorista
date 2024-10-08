import React from "react"
import { Navbar, Footer, Sidebar, Products } from "@/components"

function ProductsPage() {
  return (
    <React.Fragment>
      <Navbar />

      <div className="flex justify-center pt-4">
        <div className="w-full max-w-[1200px] flex">
          {/* Sidebar */}
          <div className="w-[225px] p-4 hidden lg:block">
            <Sidebar />
          </div>

          {/* Body */}
          <div className="flex-1 bg-white mx-2">
            <Products />
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  )
}

export default ProductsPage
