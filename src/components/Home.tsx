import { Box, Center, Text } from "@chakra-ui/react"
import React from "react"
import { Link } from "wouter"

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  return (
    <Center>
      <Box>
        <Link to={"/admin-login"}>
          <Text fontSize={"3xl"}>Admin Login</Text>
        </Link>
      </Box>
    </Center>
  )
}
