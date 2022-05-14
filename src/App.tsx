import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./components/Home"
import { AuthForm } from "./components/AuthForm"
import { Flights } from "./components/Flights"
import { useState, useEffect } from "react"
import { supabase } from "./supabaseClient"
import { MyTickets } from "./components/MyTickets"
import { Navbar } from "./components/Navbar"
import { Reports } from "./components/Reports"

//@ts-ignore
const PrivateRoute = ({ session, children }) => {
  if (!session) return <AuthForm type="Login" />
  return children
}
function App() {
  const [session, setSession] = useState<any>()

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <ChakraProvider>
      <BrowserRouter>
        {session && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={!session ? <AuthForm type="Login" /> : <Flights />}
          />
          <Route
            path="login"
            element={!session ? <AuthForm type="Login" /> : <Flights />}
          />
          <Route
            path="signup"
            element={!session ? <AuthForm type="Signup" /> : <Flights />}
          />
          <Route
            path="flights"
            element={
              <PrivateRoute session={session}>
                <Flights />
              </PrivateRoute>
            }
          />
          <Route
            path="my-tickets"
            element={
              <PrivateRoute session={session}>
                <MyTickets />
              </PrivateRoute>
            }
          />
          <Route
            path="reports"
            element={
              <PrivateRoute session={session}>
                <Reports />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
