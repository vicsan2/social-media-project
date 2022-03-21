import * as React from "react"
import { Routes as ReactRouter, Route } from "react-router-dom"
import Index from "./pages/Index"

function Routes() {
  return (
    <ReactRouter>
      <Route path="/" element={<Index />} />
    </ReactRouter>
  )
}

export default Routes
