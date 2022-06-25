import { Box, Button } from "@chakra-ui/react";

// TODO: Move to another component
function Connect() {
  const address = "0xe3E967b7e395cd678494829b436B014A1BB51612";
  // const address = useAddress(); // Grab the current user's address
  // const connectWithMetamask = useMetamask(); // Connect with metamask
  // const disconnectWallet = useDisconnect(); // Disconnect from metamask
  // const isOnWrongNetwork = useNetworkMismatch();
  // const [, switchNetwork] = useNetwork();
  return (
    <Box>
      {address ? (
        <Button
          size="lg"
          colorScheme="white"
          bgColor="gray.100"
          color="gray.500"
          borderWidth="2px"
          borderColor="white"
          _hover={{ borderColor: "gray.100" }}
          // onClick={disconnectWallet}
        >
          Disconnect Wallet
        </Button>
      ) : (
        <Button
          size="lg"
          colorScheme="white"
          bgColor="pink.100"
          color="pink.500"
          borderWidth="2px"
          borderColor="white"
          _hover={{ borderColor: "pink.100" }}
          //   onClick={connectWithMetamask}
        >
          Connect Wallet
        </Button>
      )}
    </Box>
  );
}

export default Connect;
