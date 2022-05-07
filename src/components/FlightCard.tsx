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
  useToast,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { supabase } from "../supabaseClient"
import { Flight } from "./constants"

interface FlightCardProps extends Flight {

}

export const FlightCard: React.FC<FlightCardProps> = ({
  aircraft_id,
  arrival_time,
  depr_time,
  from_location,
  id,
  to_location,
  price,
  seat
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ccNumber, setCCNumber] = useState<string>()
  const [ccDate, setCCDate] = useState<string>()
  const [ccSecret, setCCSecret] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>()
  const toast = useToast()

  const BuyTicket = async () => {
    try {
      setIsLoading(true)
      //@ts-ignore
      const { data } = await supabase.from("ticket").insert({
        flight_id: id,
        seat_number: seat,
        user_id: supabase.auth.user()?.id,
      })
      toast({
        title: "Ticket purchased!",
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    } catch (err) {
      toast({
        title: "Error has occurred, please try again.",
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTicket = async (id: number) => {
    try {
      setIsLoading(true)
      //@ts-ignore
      const { data } = await supabase
        .from("ticket")
        .delete()
        .match({ id })

      toast({
        title: "Ticket deleted!",
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    } catch (err) {
      toast({
        title: "Error has occurred, please try again.",
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Box
      py={8}
      px={4}
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
        <Box>Seat: {seat}</Box>
        <VStack>
          <HStack>
            <Text>💰 Price:</Text>
            <Spacer />
            <Text fontWeight={"bold"}>{price}</Text>
          </HStack>
          <HStack>
            <Text>📅 Departue:</Text>
            <Spacer />
            <Text fontWeight={"bold"} fontSize={"sm"}>
              {new Date(depr_time).toLocaleString()}
            </Text>
          </HStack>
          <HStack>
            <Text>📅 Arrival:</Text>
            <Spacer />
            <Text fontWeight={"bold"} fontSize={"sm"}>
              {new Date(arrival_time).toLocaleString()}
            </Text>
          </HStack>
        </VStack>
        <Button onClick={onOpen}>Buy</Button>
        <Button
          onClick={() => {
            // delete ticket with id {id}
            deleteTicket(id)
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
                  <Heading fontSize={"2xl"}>Seat 🪑: {seat}</Heading>
                  <Text fontSize={"x-small"}></Text>
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
              <Button
                variant="ghost"
                onClick={() => BuyTicket()}
                isLoading={isLoading}
              >
                Buy Ticket
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  )
}
