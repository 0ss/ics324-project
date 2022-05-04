import { Box, Center, Text, VStack, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "wouter";
import { useNavigate } from "react-router-dom";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate();

  return (
    <Center h="100vh" backgroundColor={"gray.100"}>
      <VStack spacing={10}>
        <Button
          fontSize={"3xl"}
          fontWeight={"medium"}
          onClick={() => {
            navigate("/admin-login");
          }}
          bgColor="white"
          py={8}
          px={6}
          boxShadow="base"
        >
          Admin Login
        </Button>
        <Button
          fontSize={"3xl"}
          fontWeight={"medium"}
          onClick={() => {
            navigate("/user-login");
          }}
          bgColor="white"
          py={8}
          px={9}
          boxShadow="base"
        >
          User Login
        </Button>
      </VStack>
    </Center>
  );
};
