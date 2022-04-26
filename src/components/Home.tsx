import { Box, Center, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { Link } from "wouter"
import { useNavigate } from "react-router-dom"

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate()

  return (
    <Center h="100vh">
      <VStack>
        <Text
          fontSize={"3xl"}
          as={"a"}
          onClick={() => {
            navigate("/admin-login")
          }}
        >
          Admin Login
        </Text>
        <Text
          fontSize={"3xl"}
          as={"a"}
          onClick={() => {
            navigate("/admin-register")
          }}
        >
          Admin Register
        </Text>
        <Text
          fontSize={"3xl"}
          as={"a"}
          onClick={() => {
            navigate("/user-login")
          }}
        >
          User Login
        </Text>
        <Text
          fontSize={"3xl"}
          as={"a"}
          onClick={() => {
            navigate("/user-register")
          }}
        >
          User Register
        </Text>
      </VStack>
    </Center>
  )
}
