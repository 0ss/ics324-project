import { Box, Heading, SimpleGrid } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { FlightCard } from "./FlightCard"

interface ReportsProps {}
export const Reports: React.FC<ReportsProps> = () => {
  const [activeFlights, setActiveFlights] = useState<any>()
  const fetchActiveFlights = async () => {
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

  useEffect(() => {
    fetchActiveFlights()
  }, [])
  return (
    <Box backgroundColor={"gray.100"} minHeight={"100vh"}>
      <Heading textAlign={"center"}>Currect Active Flights:</Heading>
      {activeFlights && (
        <SimpleGrid columns={{ sm: 1, lg: 3 }}>
          {activeFlights.map((e: any) => {
            {
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
                    seat={e.seat}
                  />
                </Box>
              )
            }
          })}
        </SimpleGrid>
      )}
    </Box>
  )
}
