import { Box, Heading, Center, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FlightCard } from "./FlightCard";

interface ReportsProps {}
export const Reports: React.FC<ReportsProps> = () => {
  const [activeFlights, setActiveFlights] = useState<any>(0);
  const [percentageBooking, setPercentageBooking] = useState<any>(0);
  const [confirmedPayments, setConfirmedPayments] = useState<any>(0);
  const [waitListedPassengers, setWaitlistedPassengers] = useState<any>(0);
  const [averageLoad, setAverageLoad] = useState<any>(0);
  const [ticketsCancelled, setTicketsCancelled] = useState<any>(0);
  const [totalSeats, setTotalSeats] = useState<any>(0);
  const [filledSeats, setFilledSeats] = useState<any>(0);

  useEffect(() => {
    const fetchActiveFlights = async () => {
      try {
        let { data } = await supabase.from("flights").select();
        //@ts-ignore

        setActiveFlights(data.length);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchBooking = async () => {
      try {
        let { data: bookedTickets } = await supabase
          .from("ticket")
          .select()
          .eq("waitlist", "approved");

        let { data: unbookedTickets } = await supabase
          .from("ticket")
          .select()
          .eq("waitlist", "unapproved");
        //@ts-ignore

        let percentage =
          //@ts-ignore
          (bookedTickets.length /
            //@ts-ignore

            (unbookedTickets.length + bookedTickets.length)) *
          100;
        if (percentage && unbookedTickets && bookedTickets) {
          setPercentageBooking(percentage);
          setWaitlistedPassengers(unbookedTickets.length);
          setConfirmedPayments(bookedTickets.length);
          setFilledSeats(bookedTickets.length);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const totalTickets = async () => {
      try {
        let { data } = await supabase.from("ticket").select();
        //@ts-ignore
        setTotalSeats(data.length);
      } catch (err) {
        console.log(err);
      }
    };

    const ticketsCancelled = async () => {
      try {
        let { data } = await supabase
          .from("flights")
          .select("cancelledTickets")
          .gt("cancelledTickets", 0);
        //@ts-ignore
        setTicketsCancelled(data[0].cancelledTickets);
      } catch (err) {
        console.log(err);
      }
    };

    fetchActiveFlights();
    fetchBooking();
    totalTickets();
    ticketsCancelled();
    setAverageLoad(
      Math.floor((filledSeats / (totalSeats + filledSeats)) * 100)
    );
  }, [[], averageLoad]);
  return (
    <Box backgroundColor={"gray.100"} minHeight={"100vh"}>
      <Heading pt={10} textAlign={"center"}>
        Report
      </Heading>
      <Center>
        <VStack
          p={10}
          bgColor="white"
          boxShadow="base"
          mt={10}
          borderRadius={10}
          alignItems="flex-start"
        >
          <Text>Current Active Flights: {activeFlights}</Text>
          <Text>Percentage of Booking: {percentageBooking}% </Text>
          <Text>Payments that have been confirmed: {confirmedPayments} </Text>
          <Text>Waitlisted Passengers: {waitListedPassengers} </Text>
          <Text>Average Load Factor: {!averageLoad ? 0 : averageLoad}% </Text>
          <Text>Tickets Cancelled: {ticketsCancelled} </Text>
        </VStack>
      </Center>
    </Box>
  );
};
