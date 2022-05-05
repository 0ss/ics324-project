import { HStack, Text, Button } from "@chakra-ui/react";
import { supabase } from "../supabaseClient";
export const Navbar: React.FC = () => {
  return (
    <HStack w="full" justifyContent="space-between" p={8}>
      <Text>{supabase.auth.user()?.email}</Text>
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
  );
};
