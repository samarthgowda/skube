import { Box, Image, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Logo() {
  return (
    <NextLink href="/" passHref>
      <Box display="flex" alignItems="center" cursor="pointer" gap={2}>
        <Image
          src="/images/skube-logo.jpeg"
          w="30px"
          h="30px"
          rounded="full"
          alt="skube-logo"
          transition="ease-in-out 0.35s"
          _hover={{
            shadow: "md",
            transform: "rotate(-15deg) scale(1.025, 1.025)",
            transition: "ease-in-out 0.35s",
          }}
        />
        <Text fontWeight={600} fontSize="3xl" color="gray.800" mb={0}>
          skube
        </Text>
      </Box>
    </NextLink>
  );
}
