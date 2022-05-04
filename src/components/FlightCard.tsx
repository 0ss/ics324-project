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
import { Flight } from "./constants"

interface FlightCardProps extends Flight {}

export const FlightCard: React.FC<FlightCardProps> = ({
  aircraft_id,
  arrival_time,
  depr_time,
  from_location,
  id,
  to_location,
  price,
}) => {
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
          <Text fontSize={"3xl"}>{from_location}</Text>
          <Text fontSize={"3xl"} textAlign="center" fontWeight={"bold"}>
            To
          </Text>
          <Text fontSize={"3xl"}>{to_location}</Text>
        </Box>
        <VStack>
          <HStack>
            <Text>💰 Price:</Text>
            <Spacer />
            <Text fontWeight={"bold"}>{price}</Text>
          </HStack>
          <HStack>
            <Text>📅 Date:</Text>
            <Spacer />
            <Text fontWeight={"bold"} fontSize={"sm"}>
              {new Date(depr_time).toLocaleString()}
            </Text>
          </HStack>
        </VStack>
        <Button>Buy</Button>
      </VStack>
    </Box>
  )
}
