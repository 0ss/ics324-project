import { Box, Heading, SimpleGrid, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { FlightCard } from "./FlightCard"

interface MyTicketsProps {}
export const MyTickets: React.FC<MyTicketsProps> = () => {
  const [tickets, setTickets] = useState<any>()
  const toast = useToast()

  const fetchTickets = async () => {
    try {
      let { error, data } = await supabase.from("ticket").select()
      setTickets(data)
    } catch (err) {
      toast({
        title: "Error has occurred, please try again.",
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      console.log(err)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])
  return (
    <>
      <Heading>My Tickets</Heading>
      {tickets && (
        <SimpleGrid columns={{ sm: 1, lg: 3 }}>
          {tickets.map((e: any) => {
            return (
              <Box m={"10"} key={e.id}>
                <FlightCard
                  aircraft_id={e.aircraft_id}
                  arrival_time={e.arrival}
                  depr_time={e.departure}
                  from_location={e.from_location}
                  id={e.id}
                  to_location={e.to_location}
                  price={e.price}
                />{" "}
              </Box>
            )
          })}
        </SimpleGrid>
      )}
    </>
  )
}
