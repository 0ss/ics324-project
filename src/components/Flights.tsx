import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { FlightCard } from "./FlightCard"

interface FlightProps {}

export const Flights: React.FC<FlightProps> = ({}) => {
  const [search, setSearch] = useState<string>("")
  return (
    <Box backgroundColor={"gray.100"} h="100%" w={"100%"}>
      <Heading py={"10"} textAlign={"center"}>
        Search Flights 🕊
      </Heading>
      <Box>
        <Box w={"40%"} mx={"auto"} alignItems="center">
          <form>
            <FormControl isRequired>
              <FormLabel htmlFor="email"> email</FormLabel>
              <Input
                borderColor={"black"}
                id="seatch"
                type={"text"}
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </FormControl>
          </form>
        </Box>
        <Flex flexWrap={"wrap"}>
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <Box m={"10"}>
                <FlightCard />
              </Box>
            ))}
        </Flex>
      </Box>
    </Box>
  )
}
