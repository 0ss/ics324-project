import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./components/Home"
import { AuthForm } from "./components/AuthForm"
import { Flights } from "./components/Flights"
function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="admin-login" element={<AuthForm form="admin-login" />} />
          <Route
            path="admin-register"
            element={<AuthForm form="admin-register" />}
          />
          <Route path="user-login" element={<AuthForm form="user-login" />} />
          <Route
            path="user-register"
            element={<AuthForm form="user-register" />}
          />
          <Route path="flights" element={<Flights />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
