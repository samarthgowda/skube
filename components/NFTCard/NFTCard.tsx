import { Box, Image, Link, Text } from "@chakra-ui/react";
import Web3Address from "components/Web3Address";
import { ipfsLink } from "lib/ipfs";
import NextLink from "next/link";
// Redux
// import { useMetadataQuery } from "redux/services/ipfs";

export default function NFTCard({
  metadata,
  contractAddress,
  tokenId,
  from = null,
}) {
  // const { isLoading: isLoadingMetadata, data: metadata } =
  //   useMetadataQuery(uri);

  return (
    <Box display="flex" alignItems="flex-start" gap={8}>
      <Image
        src={ipfsLink(metadata?.image)}
        alt={metadata?.name || "Claim image"}
        fit="contain"
        align="center"
        rounded="sm"
        w="100%"
        maxW={200}
        h="auto"
      />
      <Box>
        <Text fontSize="xl" fontWeight={600} lineHeight={1.1}>
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
        {/* {metadata?.attributes && metadata.attributes.length > 0 && (
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
        )} */}
        <Box>
          {from && (
            <Text
              mt={4}
              color="gray.500"
              fontWeight={500}
              fontSize="md"
              lineHeight="short"
            >
              Issued by{" "}
              <NextLink href={`/${from}`} passHref>
                <Link target="_blank" rel="noopener noreferrer">
                  <Web3Address address={from} />
                </Link>
              </NextLink>
            </Text>
          )}
          <Text
            mt={2}
            color="gray.500"
            fontWeight={500}
            fontSize="sm"
            lineHeight={1.1}
          >
            <NextLink
              href={`https://testnets.opensea.io/assets/mumbai/${contractAddress}/${tokenId}`}
              passHref
            >
              <Link target="_blank" rel="noopener noreferrer">
                OpenSea
              </Link>
            </NextLink>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
