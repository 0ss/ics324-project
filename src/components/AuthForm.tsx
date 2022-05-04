import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

interface AuthFormProps {
  form: "admin-login" | "admin-register" | "user-login" | "user-register";
}
export const AuthForm: React.FC<AuthFormProps> = ({ form }) => {
  const heading = form
    .split("-")
    .map((e) => e.toLocaleLowerCase())
    .join(" ");
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("email: ", email, ", password: ", password);
    //supabase auth
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
      toast({
        title: "Sign In Successfull",
        position: "top",
        description: "Check your email for the magic link :)",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        position: "top",
        description: "Error has occurred, please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center backgroundColor={"gray.100"} h="100vh">
      <Box backgroundColor={"white"} borderRadius={"sm"} p={"12"}>
        <form onSubmit={handleSubmit}>
          <Center py={"10"}>
            <Heading fontSize={"2xl"}>{heading}</Heading>
          </Center>
          <FormControl isRequired>
            <FormLabel htmlFor="email"> email</FormLabel>
            <Input
              borderColor={"black"}
              id="email"
              type={"email"}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password </FormLabel>
            <Input
              borderColor={"black"}
              id="password"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Center py="5">
            <Button type={"submit"}>Submit</Button>
          </Center>
          <Center py="5">
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Button>
          </Center>
        </form>
      </Box>
    </Center>
  );
};
