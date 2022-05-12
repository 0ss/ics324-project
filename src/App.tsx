import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./components/Home"
import { AuthForm } from "./components/AuthForm"
import { Flights } from "./components/Flights"
import { useState, useEffect } from "react"
import { supabase } from "./supabaseClient"
import { MyTickets } from "./components/MyTickets"
import { Navbar } from "./components/Navbar"

//@ts-ignore
const PrivateRoute = ({ session, children }) => {
  if (!session) return <Home />
  return children
}
function App() {
  const [session, setSession] = useState<any>()
  const [privilige, setPrivilige] = useState<any>()
  const [isAuthenticated, setIsAuthenticated] = useState<any>()

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    const getPrivilege = async () =>{
      const userId = supabase.auth.user()?.id
      try {
        let { error, data } = await supabase
          .from("profile")
          .select()
          .eq("id", userId)
        //@ts-ignore
        setPrivilige(data[0].privilege)
      } catch (err) {
        console.log(err)
      }
    }
    getPrivilege()
  }, [])

  return (
    <ChakraProvider>
      <BrowserRouter>
        {(session && privilige) && <Navbar privilige ={privilige} />}
        <Routes>
          <Route path="/" element={!session ? <Home /> : <Flights privilige = {privilige}/>} />
          <Route
            path="admin-login"
            element={!session ? <AuthForm form="admin-login" /> : <Flights privilige = {privilige}/>}
          />
          <Route
            path="user-login"
            element={!session ? <AuthForm form="user-login" /> : <Flights privilige = {privilige}/>}
          />
          <Route
            path="flights"
            element={
              <PrivateRoute session={session}>
                <Flights privilige = {privilige} />
              </PrivateRoute>
            }
          />
          <Route
            path="my-tickets"
            element={
              <PrivateRoute session={session}>
                <MyTickets  />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
