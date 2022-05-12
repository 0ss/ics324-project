import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
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
  seat,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ccNumber, setCCNumber] = useState<string>()
  const [ccDate, setCCDate] = useState<string>()
  const [ccSecret, setCCSecret] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>()
  const [ticketUser, setTicketUser] = useState<string>()
  const toast = useToast()

  const BuyTicket = async () => {
    try {
      setIsLoading(true)
      //@ts-ignore
      await supabase
        .from("ticket")
        .update({ user_id: supabase.auth.user()?.id })
        .eq("flight_id", id)
        .eq("seat_number", seat)
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
  const getTicketUserId = async () => {
    try {
      //@ts-ignore
      const uid = await supabase
        .from("ticket")
        .select("user_id")
        .eq("flight_id", id)
        .eq("seat_number", seat)
      // toast({
      //   title: "Ticket purchased!",
      //   position: "top",
      //   status: "success",
      //   duration: 5000,
      //   isClosable: true,
      // })
      console.log("body: ", uid.body?.[0])
      setTicketUser(uid.body?.[0].user_id)
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
      console.log(id, seat)
      setIsLoading(true)
      const { error } = await supabase
        .from("ticket")
        .delete()
        .eq("flight_id", id)
      await supabase
        .from("flights")
        .delete()
        .eq("id", id)
      if (error) throw error
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
  useEffect(() => {
    async function fetchData() {
      await getTicketUserId()
      console.log("ticket user: ", ticketUser)
    }
    fetchData()
  }, [])
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
            <Text fontWeight={"bold"} fontSize={"xs"}>
              {new Date(depr_time).toLocaleString()}
            </Text>
          </HStack>
          <HStack>
            <Text>📅 Arrival:</Text>
            <Spacer />
            <Text fontWeight={"bold"} fontSize={"xs"}>
              {new Date(arrival_time).toLocaleString()}
            </Text>
          </HStack>
        </VStack>
        <Button w={"full"} onClick={ticketUser ? () => null : onOpen}>
          {" "}
          {ticketUser ? `Promote this ticket holder` : "Buy Ticket"}
        </Button>

        <Button
          isLoading={isLoading}
          onClick={() => {
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
                      required
                      onChange={(e) => setCCNumber(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="date">Expiration Date</FormLabel>
                    <Input
                      id="date"
                      type="text"
                      required
                      onChange={(e) => setCCDate(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="cvv">CVV</FormLabel>
                    <Input
                      id="cvv"
                      type="password"
                      required
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
