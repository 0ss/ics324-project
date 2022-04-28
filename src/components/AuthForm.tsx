import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

interface AuthFormProps {
  form: "admin-login" | "admin-register" | "user-login" | "user-register"
}
export const AuthForm: React.FC<AuthFormProps> = ({ form }) => {
  const heading = form
    .split("-")
    .map((e) => e.toLocaleLowerCase())
    .join(" ")
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("email: ", email, ", password: ", password)
    //supabase auth
  }
  return (
    <Center backgroundColor={"gray.100"} h="100vh">
      <Box backgroundColor={"white"} borderRadius={"sm"} p={"12"}>
        <form onSubmit={handleSubmit}>
          <Center py={"10"}>
            <Heading fontSize={"2xl"}>{heading}</Heading>
          </Center>
          <FormControl isRequired>
            <FormLabel htmlFor="email"> email</FormLabel>
            <Input
              borderColor={"black"}
              id="email"
              type={"email"}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password </FormLabel>
            <Input
              borderColor={"black"}
              id="password"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Center py="5">
            <Button type={"submit"}>Submit</Button>
          </Center>
          <Center py="5">
            <Button
              onClick={() => {
                navigate("/")
              }}
            >
              Home
            </Button>
          </Center>
        </form>
      </Box>
    </Center>
  )
}
