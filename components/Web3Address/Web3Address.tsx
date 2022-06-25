import { Box } from "@chakra-ui/react";

export default function Web3Address({
  address,
  startLength = 6,
  endLength = 4,
  full = false,
}) {
  if (!address) return null;

  return (
    <Box as="span">
      {full
        ? address
        : `${address.slice(0, startLength)}...${address.slice(-endLength)}`}
    </Box>
  );
}
