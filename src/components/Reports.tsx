import { Box, Heading, Center,Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { FlightCard } from "./FlightCard"

interface ReportsProps {}
export const Reports: React.FC<ReportsProps> = () => {
  const [activeFlights, setActiveFlights] = useState<any>()
  const [percentageBooking, setPercentageBooking] = useState<any>()
  const [confirmedPayments, setConfirmedPayments] = useState<any>()
  const [waitListedPassengers, setWaitlistedPassengers] = useState<any>()
  const [averageLoad, setAverageLoad] = useState<any>()
  const [ticketsCancelled, setTicketsCancelled] = useState<any>()
  

  useEffect(() => {
    
    const fetchReport = async () => {
      try {
        let { error, data } = await supabase
          .from("flights")
          .select()
          .order("id")
        console.log(data)
        setActiveFlights(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchReport()
  }, [])
  return (
    <Box backgroundColor={"gray.100"} minHeight={"100vh"}>
      <Heading pt={10} textAlign={"center"}>Report</Heading>
      <Center>
      <VStack p={10} bgColor='white' boxShadow='base' mt={10} borderRadius={10} alignItems='flex-start'>
        <Text>Current Active Flights: </Text>
        <Text>Percentage of Booking:  </Text>
        <Text>Payments that have been confirmed: </Text>
        <Text>Waitlisted Passengers: </Text>
        <Text>Average Load Factor: </Text>
        <Text>Tickets Cancelled: </Text>
        </VStack>
      </Center>
      </Box>
  )
}
