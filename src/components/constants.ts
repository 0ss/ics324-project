export interface Flight {
  id: number
  aircraft_id: number
  to_location: string
  from_location: string
  depr_time: string
  arrival_time: string
  price: string
}

export const randomFlights: Array<Flight> = [
  {
    id: 1,
    aircraft_id: 1,
    arrival_time: "2020-01-01T15:00:00.000Z",
    depr_time: "2020-01-01T12:00:00.000Z",
    from_location: "New York",
    to_location: "San Francisco",
    price: "100$",
  },
  {
    id: 2,
    aircraft_id: 2,
    arrival_time: "2020-01-01T15:00:00.000Z",
    depr_time: "2020-01-01T12:00:00.000Z",
    from_location: "Paris",
    to_location: "London",
    price: "100$",
  },
  {
    id: 3,
    aircraft_id: 3,
    arrival_time: "2020-01-01T15:00:00.000Z",
    depr_time: "2020-01-01T12:00:00.000Z",
    from_location: "Riyadh",
    to_location: "Khoramabad",
    price: "100$",
  },
  {
    id: 4,
    aircraft_id: 4,
    arrival_time: "2020-01-01T15:00:00.000Z",
    depr_time: "2020-01-01T12:00:00.000Z",
    from_location: "South Korea",
    to_location: "New York",
    price: "100$",
  },
  {
    id: 5,
    aircraft_id: 5,
    arrival_time: "2020-01-01T15:00:00.000Z",
    depr_time: "2020-01-01T12:00:00.000Z",
    from_location: "Berlin",
    to_location: "Jeddah",
    price: "100$",
  },
  {
    id: 6,
    aircraft_id: 6,
    arrival_time: "2020-01-01T15:00:00.000Z",
    depr_time: "2020-01-01T12:00:00.000Z",
    from_location: "Boston",
    to_location: "Texas",
    price: "100$",
  },
  {
    id: 7,
    aircraft_id: 7,
    arrival_time: "2021-01-01T15:00:00.000Z",
    depr_time: "2021-01-01T12:00:00.000Z",
    from_location: "New York",
    to_location: "San Francisco",
    price: "100$",
  },
]
