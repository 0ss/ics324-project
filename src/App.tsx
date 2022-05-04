import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { AuthForm } from "./components/AuthForm";
import { Flights } from "./components/Flights";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [session, setSession] = useState<any>();

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!session ? <Home /> : <Flights />} />
          <Route
            path="admin-login"
            element={!session ? <AuthForm form="admin-login" /> : <Flights />}
          />
          <Route
            path="user-login"
            element={!session ? <AuthForm form="user-login" /> : <Flights />}
          />
          <Route path="flights" element={session ? <Flights /> : <Flights />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
