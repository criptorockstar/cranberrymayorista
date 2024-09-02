import React from "react";
import { Navbar, Footer } from "@/components";

function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Navbar />
      {children}
      <Footer />
    </React.Fragment>
  );
}

export default ProductLayout;
