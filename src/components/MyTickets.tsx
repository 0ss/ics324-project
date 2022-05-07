import { Box, Center, Heading, SimpleGrid, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { FlightCard } from "./FlightCard"
import { MyTicketsCard } from "./MyTicketsCard"

interface MyTicketsProps {}
export const MyTickets: React.FC<MyTicketsProps> = () => {
  const [tickets, setTickets] = useState<any>()
  const toast = useToast()

  const fetchTickets = async () => {
    try {
      let { data } = await supabase
        .from("ticket")
        .select(`
      flight_id,
      flights(
        id,
        arrival,
        departure,
        price,
        from_location,
        to_location,
        seat
      )
  `)
  //@ts-ignore
  .eq('user_id', supabase.auth.user().id)
      setTickets(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])


  return (
    <>
        <Center pt={10}>
        <Heading>My Tickets</Heading>
      </Center>
    <Center pt={10}>
      {tickets && (
        <SimpleGrid columns={{ sm: 1, lg: 3 }}>
          {tickets.map( (e: any) => {
            return (
              <Box m={"10"} key={e.flights.id}>
                <MyTicketsCard
                  aircraft_id={e.flights.aircraft_id}
                  arrival_time={e.flights.arrival}
                  depr_time={e.flights.departure}
                  from_location={e.flights.from_location}
                  id={e.flight_id}
                  to_location={e.flights.to_location}
                  price={e.flights.price}
                  seat={e.flights.seat}
                />{" "}
              </Box>
            )
          })}
        </SimpleGrid>
        
      )}
      </Center>
    </>
  )
}
