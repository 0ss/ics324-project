import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
} from "@chakra-ui/react"
import React, { useState, useEffect } from "react"
import { FlightCard } from "./FlightCard"
import {supabase} from '../supabaseClient'

interface FlightProps {}

export const Flights: React.FC<FlightProps> = ({}) => {
  const [search, setSearch] = useState<string>("")
  const [flights, setFlights] = useState<any>()
  console.log(search)
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  const fetchFlights = async () =>{
    try{
      let {error, data} = await supabase.from('flights').select().order('id')
      setFlights(data)
      console.log(flights)
    }catch(err){
      console.log(err)
    }
    
  }

  useEffect(()=>{
    fetchFlights()
  },[])


  return (
    <Box backgroundColor={"gray.100"} minHeight={"100vh"}>
      <Heading py={"10"} textAlign={"center"}>
        Search Flights 🕊
      </Heading>
      <Box>
        <Box w={"40%"} mx={"auto"} alignItems="center">
          <form onSubmit={handleSearch}>
            <FormControl isRequired>
              <FormLabel htmlFor="email"> email</FormLabel>
              <Input
                borderColor={"black"}
                id="seatch"
                type={"text"}
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </FormControl>
          </form>
        </Box>
        <Center>
         {flights && (
            <SimpleGrid columns={{ sm: 1, lg: 3 }}>
            {flights.map((e:any) => {
              if (search?.length > 0) {
                if (
                  (e.from_location as string)
                    .toLocaleLowerCase()
                    .includes(search) ||
                  (e.to_location as string).toLocaleLowerCase().includes(search)
                ) {
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
                }
                return null
              }
              return (
                <Box m={"10"}>
                  <FlightCard
                    aircraft_id={e.aircraft_id}
                    arrival_time={e.arrival_time}
                    depr_time={e.depr_time}
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
        </Center>
      </Box>
    </Box>
  )
}
