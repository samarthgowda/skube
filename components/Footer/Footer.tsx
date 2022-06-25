import { Center, Text, VStack } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Center as="footer" p={4}>
      <VStack>
        <Text fontSize="md" color="gray.500">
          © {new Date().getFullYear()} Skube Labs. All rights reserved
        </Text>
      </VStack>
    </Center>
  );
}
