import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"

interface AuthForm{
  type : 'Signup' | 'Login'
}
export const AuthForm: React.FC<AuthForm> = ({type}) => {

  const navigate = useNavigate()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>('')
  const [loading, setIsLoading] = useState<boolean>()
  const toast = useToast()

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //supabase auth
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signUp({ email,password })
      if (error) throw error
      setIsLoading(false)
    }catch(err){
      toast({
        title: 'An error has occurred.',
        description: "Please check credentials",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //supabase auth
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signIn({ email,password })
      if (error) throw error
      setIsLoading(false)
    }catch(err){
      toast({
        title: 'An error has occurred.',
        description: "Please check credentials",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Center backgroundColor={"gray.100"} h="100vh">
      <Box
        backgroundColor={"white"}
        borderRadius={"sm"}
        p={"12"}
        boxShadow="base"
      >
        <form onSubmit={type == 'Signup' ? handleSignup : handleLogin}>
          <Center py={"10"}>
            <Heading fontSize={"2xl"}>{type}</Heading>
          </Center>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              borderColor={"black"}
              id="email"
              type={"email"}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Password</FormLabel>
            <Input
              borderColor={"black"}
              id="password"
              type={"password"}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Center py="5">
            <Button type={"submit"} isLoading={loading}>
              Continue
            </Button>
          </Center>
        </form>
        <Center py="5">
            <Button type={"submit"} onClick={()=>navigate(type == 'Login' ? '/signup': '/login')}>
              {type == 'Login' ? 'Not Registered?' : 'Already have an account?'}
            </Button>
          </Center>
              </Box>
    </Center>
  )
}
