import {
  Box,
  Button,
  Heading,
  VStack,
  Text,
  HStack,
  Spacer,
  Flex,
} from "@chakra-ui/react"
import React, { useState } from "react"

interface FlightCardProps {}

export const FlightCard: React.FC<FlightCardProps> = ({}) => {
  const [search, setSearch] = useState<string>("")
  return (
    <Box
      p={"8"}
      w={"72"}
      backgroundColor={"whatsapp.100"}
      shadow={"lg"}
      borderRadius={"lg"}
    >
      <VStack spacing={10}>
        <Box>
          <Text fontSize={"3xl"}>Riyadh</Text>
          <Text fontSize={"3xl"} textAlign="center" fontWeight={"bold"}>
            To
          </Text>
          <Text fontSize={"3xl"}>Bahrain</Text>
        </Box>
        <VStack>
          <HStack>
            <Text>💰 Price:</Text>
            <Spacer />
            <Text fontWeight={"bold"}>1100$</Text>
          </HStack>
          <HStack>
            <Text>📅 Date:</Text>
            <Spacer />

            <Text fontWeight={"bold"}>13 May 1:00PM</Text>
          </HStack>
        </VStack>
        <Button>Buy</Button>
      </VStack>
    </Box>
  )
}
