"use client"
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProductDetails() {
  const { slug } = useParams(); // Accedemos al parámetro dinámico "slug"
  return (
    <React.Fragment>
      {slug}
    </React.Fragment>
  )
}
