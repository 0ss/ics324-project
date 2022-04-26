import React from "react"
import logo from "./logo.svg"
import { ChakraProvider } from "@chakra-ui/react"
import { Link, Route } from "wouter"
import { Home } from "./components/Home"
function App() {
  return (
    <ChakraProvider>
      <Route path="/" component={Home} />
    </ChakraProvider>
  )
}

export default App
