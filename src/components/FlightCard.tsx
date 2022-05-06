import {
  Box,
  Button,
  Heading,
  VStack,
  Text,
  HStack,
  Spacer,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Center,
  FormHelperText,
  FormLabel,
  Input,
  FormControl,
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [seat, setSeat] = useState<string>("")
  const [ccNumber, setCCNumber] = useState<string>()
  const [ccDate, setCCDate] = useState<string>()
  const [ccSecret, setCCSecret] = useState<string>()

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
        <Button onClick={onOpen}>Buy</Button>
        <Button
          onClick={() => {
            // delete ticket with id {id}
          }}
        >
          Delete Ticket
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              from {from_location} to {to_location}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Center>
                <form>
                  <Heading fontSize={"2xl"}>Enter Seat 🪑:</Heading>
                  <Text fontSize={"x-small"}>
                    Seat should be a letter and a number.
                  </Text>
                  <select onChange={(e) => setSeat(e.target.value)}>
                    {Array(26)
                      .fill(null)
                      .map((e, i) => (
                        <option key={e} value={e}>
                          {`${String.fromCharCode(97 + i)} ${(
                            Math.random() * 10 +
                            1
                          ).toFixed()}`}
                        </option>
                      ))}
                  </select>
                  <Heading fontSize={"2xl"}>
                    {" "}
                    Enter Credit Cards Details 💳:
                  </Heading>
                  <Center>
                    <HStack p={3}>
                      <Text>💰 Price:</Text>
                      <Text fontWeight={"bold"}>{price}</Text>
                    </HStack>
                  </Center>
                  <FormControl>
                    <FormLabel htmlFor="number">Serial Number</FormLabel>
                    <Input
                      id="number"
                      type="text"
                      onChange={(e) => setCCNumber(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="date">Expiration Date</FormLabel>
                    <Input
                      id="date"
                      type="text"
                      onChange={(e) => setCCDate(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="cvv">CVV</FormLabel>
                    <Input
                      id="cvv"
                      type="password"
                      onChange={(e) => setCCSecret(e.target.value)}
                    />
                  </FormControl>{" "}
                </form>
              </Center>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Buy Ticket</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  )
}
