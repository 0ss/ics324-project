import {
  HStack,
  Text,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  toast,
  useToast,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"

export const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [seat, setSeat] = useState<string>("")
  const [locationFrom, setLocationFrom] = useState<string>()
  const [locationTo, setLocationTo] = useState<string>()
  const [dep, setDep] = useState<string>()
  const [arrival, setArrival] = useState<string>()
  const [price, setPrice] = useState<string>()
  const [privilige, setPrivilige] = useState<string>()
  const navigate = useNavigate()
  const toast = useToast()
  const checkIfEmpty = (obj: Record<string, string | undefined>) => {
    for (const i in obj) {
      if (!obj[i]) {
        toast({
          title: `${i} should not be empty`,
          position: "top",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
        return true
      }
    }
  }
  const addTicket = async () => {
    let id = Math.floor(Math.random() * 100010)
    if (checkIfEmpty({ seat, locationFrom, locationTo, dep, arrival, price }))
      return
    try {
      await supabase
        .from("flights")
        .insert({
          id,
          from_location: locationFrom,
          to_location: locationTo,
          departure: dep,
          arrival,
          price,
          seat,
        })
        .single()

      await supabase
        .from("ticket")
        .insert({
          flight_id: id,
          seat_number: seat,
          user_id: null,
          waitlist: "unapproved",
        })
        .single()

      toast({
        title: "Ticket added!",
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
    }
  }

  const logOut = () => {
    supabase.auth.signOut()
    navigate('/')
  }

  useEffect(() => {
    const getPrivilege = async () => {
      const userId = supabase.auth.user()?.id
      try {
        let { error, data } = await supabase
          .from("profile")
          .select()
          .eq("id", userId)
        //@ts-ignore
        setPrivilige(data[0].privilege)
      } catch (err) {
        console.log(err)
      }
    }
    getPrivilege()
  })

  return (
    <HStack w="full" justifyContent="space-between" p={8}>
      <Text>{supabase.auth.user()?.email}</Text>
      <Button onClick={() => navigate("my-tickets")}>My tickets</Button>
      <Button onClick={() => navigate("")}>Buy tickets</Button>
      {privilige == "admin" ? (
        <>
          <Button onClick={onOpen}>Add tickets</Button>
          <Button onClick={() => navigate("reports")}>Reports </Button>
        </>
      ) : (
        ""
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <form>
                <Heading fontSize={"2xl"}>Enter Seat 🪑:</Heading>
                <Text fontSize={"x-small"}>
                  Seat should be a letter and a number.
                </Text>
                <Input
                  id="seat"
                  type="text"
                  value={seat}
                  onChange={(e) => setSeat(e.target.value)}
                />
                <Heading fontSize={"2xl"}> Enter Ticket price 💰 :</Heading>
                <FormControl isRequired>
                  <Input
                    id="price"
                    type="text"
                    value={price}
                    isRequired
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormControl>

                <Heading fontSize={"2xl"}> Enter location from :</Heading>
                <Input
                  id="from"
                  type="text"
                  onChange={(e) => setLocationFrom(e.target.value)}
                />
                <Heading fontSize={"2xl"}> Enter location to :</Heading>
                <Input
                  id="to"
                  type="text"
                  onChange={(e) => setLocationTo(e.target.value)}
                />
                <Heading fontSize={"2xl"}> Enter departure date :</Heading>
                <Input
                  id="dep"
                  type="datetime-local"
                  onChange={(e) => setDep(e.target.value)}
                />
                <Heading fontSize={"2xl"}> Enter arrival date :</Heading>
                <Input
                  id="arrival"
                  type="datetime-local"
                  onChange={(e) => setArrival(e.target.value)}
                />
              </form>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={addTicket}>
              Add Ticket
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button
        bg="#00CC4A"
        color="white"
        borderRadius="full"
        boxShadow="base"
        onClick={() => logOut()}
      >
        Logout
      </Button>
    </HStack>
  )
}
