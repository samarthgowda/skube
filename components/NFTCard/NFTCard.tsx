import {
  Box,
  Button,
  Image,
  Link,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { ipfsLink } from "lib/ipfs";
// Redux
// import { useMetadataQuery } from "redux/services/ipfs";

export default function NFTCard({ metadata, contractAddress, tokenId }) {
  // const { isLoading: isLoadingMetadata, data: metadata } =
  //   useMetadataQuery(uri);

  return (
    <Box>
      <Image
        src={ipfsLink(metadata?.image)}
        alt={metadata?.name || "Claim image"}
        fit="contain"
        align="center"
        rounded="sm"
        w="100%"
        h="auto"
      />
      <Text mt={4} fontSize="2xl" fontWeight="semibold" lineHeight="short">
        {metadata?.name}
      </Text>
      <Text
        fontSize="sm"
        fontWeight={500}
        lineHeight={1.2}
        color="gray.500"
        mt={2}
        noOfLines={3}
      >
        {metadata?.description}
      </Text>
      {metadata?.attributes && metadata.attributes.length > 0 && (
        <Box mt={4}>
          <Wrap>
            {metadata.attributes.map((att) => (
              <WrapItem key={att.trait_type}>
                <Box
                  bg="gray.100"
                  p={2}
                  rounded="md"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Text
                    fontSize="sm"
                    bgGradient="linear(to-l, blue.500, primary.500)"
                    bgClip="text"
                    fontWeight={600}
                  >
                    {att.trait_type}:
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    {att.value}
                  </Text>
                </Box>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      )}

      <Button
        as={Link}
        href={`https://testnets.opensea.io/assets/mumbai/${contractAddress}/${tokenId}`}
        // Make it possible to also have mainnet
        isExternal
        mt={6}
        isFullWidth
        colorScheme="blue"
        _hover={{ textDecoration: "none" }}
      >
        View on OpenSea
      </Button>
    </Box>
  );
}
