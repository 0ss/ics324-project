import {
  Badge,
  Box,
  Button,
  HStack,
  Spacer,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react"
import React, { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import { Flight } from "./constants"

interface MyTicketsCardProps extends Flight {}

export const MyTicketsCard: React.FC<MyTicketsCardProps> = ({
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
  const [status, setStatus] = useState<any>()
  const toast = useToast()


  useEffect(() => {
    const getStatus = async (id:number) =>{
      try {
        const ticketStatus = await supabase
          .from("ticket")
          .select("waitlist")
          .eq("flight_id", id)
        //@ts-ignore
        setStatus(ticketStatus.body[0].waitlist)
      } catch (err) {
        console.log(err)
      }
    }

    getStatus(id)

    
  }, [])


  const deleteTicket = async (id: number) => {
    try {
      console.log(id, seat)
      setIsLoading(true)
      const { error } = await supabase
        .from("ticket")
        .update({ user_id: null, waitlist: 'unapproved' })
        .eq("flight_id", id)
        .eq("seat_number", seat)

        const {data:cancelledFlights} = await supabase
        .from('flights')
        .select("cancelledTickets")
        .eq("id", id)
        
        //@ts-ignore
        let cancelledTicketsUpdate = cancelledFlights[0].cancelledTickets + 1
        await supabase
        .from('flights')
        .update({cancelledTickets: cancelledTicketsUpdate})
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
        <Button
          isLoading={isLoading}
          onClick={() => {
            deleteTicket(id)
          }}
        >
          Delete Ticket
        </Button>
        <Badge>WaitList Status: {status}</Badge>
      </VStack>
    </Box>
  )
}
