import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { randomFlights } from "./constants"
import { FlightCard } from "./FlightCard"

interface FlightProps {}

export const Flights: React.FC<FlightProps> = ({}) => {
  const [search, setSearch] = useState<string>("")
  console.log(search)
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
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
          <SimpleGrid columns={{ sm: 1, lg: 3 }}>
            {randomFlights.map((e) => {
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
                        arrival_time={e.arrival_time}
                        depr_time={e.depr_time}
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
        </Center>
      </Box>
    </Box>
  )
}
