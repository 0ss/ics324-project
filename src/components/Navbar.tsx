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
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"
export const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [seat, setSeat] = useState<string>("")
  const [locationFrom, setLocationFrom] = useState<string>()
  const [locationTo, setLocationTo] = useState<string>()
  const [date, setDate] = useState<string>()
  const [price, setPrice] = useState<string>()
  const navigate = useNavigate()

  return (
    <HStack w="full" justifyContent="space-between" p={8}>
      <Text>{supabase.auth.user()?.email}</Text>
      <Button onClick={() => navigate("my-tickets")}>My tickets</Button>
      <Button onClick={() => navigate("")}>Buy tickets</Button>
      <Button onClick={onOpen}>Add tickets</Button>
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
                <select onChange={(e) => setSeat(e.target.value)}>
                  {Array(26)
                    .fill(null)
                    .map((e, i) => (
                      <option key={e} value={e}>
                        {`${String.fromCharCode(97 + i)} ${(
                          Math.random() * 10 +
                          1
                        ).toFixed()}`}
                      </option>
                    ))}
                </select>
                <Heading fontSize={"2xl"}> Enter Ticket price 💰 :</Heading>
                <Input
                  id="price"
                  type="text"
                  onChange={(e) => setPrice(e.target.value)}
                />
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
                <Heading fontSize={"2xl"}> Enter date 💰 :</Heading>
                <Input
                  id="date"
                  type="text"
                  onChange={(e) => setDate(e.target.value)}
                />
              </form>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Add Ticket</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button
        bg="#00CC4A"
        color="white"
        borderRadius="full"
        boxShadow="base"
        onClick={() => supabase.auth.signOut()}
      >
        Logout
      </Button>
    </HStack>
  )
}
