import {
  Avatar,
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import Layout from "components/Layout";
import Logo from "components/Logo";
import NFTCard from "components/NFTCard";
import { ipfsLink } from "lib/ipfs";
import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import { ReactElement } from "react";
import { IoQrCode } from "react-icons/io5";
import { useGetNFTsQuery } from "redux/services/tatum";

const SAMPLE_DATA = {
  name: "Samarth Gowda",
  description: "Founder @ Skube Labs",
  image: "ipfs://bafybeiaxdo7pic4udd5ng5b5a3ff4n7fhwazchhhpsdagw7adwivgabmha",
  attributes: [
    {
      trait_type: "Twitter",
      value: "https://twitter.com/iamsamarthgowda",
    },
    {
      trait_type: "Website",
      value: "https://samarthgowda.com",
    },
    {
      trait_type: "ENS",
      value: "samarthgowda.eth",
    },
    {
      trait_type: "LinkedIn",
      value: "https://linkedin.com/in/gowdasamarth",
    },
    {
      trait_type: "GitHub",
      value: "https://github.com/samarthgowda",
    },
    {
      trait_type: "Telegram",
      value: "https://t.me/iamsamarthgowda",
    },
  ],
  resume: "ipfs://bafkreiba7ojn2ktkkujfy4m3lay7z76dte5zexxrek3nzybo22jzb2aafq",
  avatar: "ipfs://bafkreiapmcddgg7yowxkbxiyoctdmhdcdya7n5lwntzj3iw4fjtledww3m",
  dark: true,
  colors: ["#B83280", "#C05621"],
};

// Todo: In the future this page should be filtered by wallet and by token type in the future

const UserProfile = () => {
  const network = "MUMBAI"; // TODO: Configure this
  const router = useRouter();
  const { address } = router.query;

  const {
    isOpen: isOpenQR,
    onOpen: onOpenQR,
    onClose: onCloseQR,
  } = useDisclosure();

  // TODO: Call wagmi to get address if it is a ENS
  const {
    isLoading: isLoadingOtherNFTs,
    data: otherNFTs,
    error: errorOtherNFTs,
  } = useGetNFTsQuery(
    { network, address },
    {
      skip: !address,
    }
  );

  return (
    <>
      <IconButton
        aria-label="qr code"
        icon={<IoQrCode />}
        rounded="full"
        colorScheme="black"
        position="fixed"
        top={5}
        right={5}
        zIndex="99999"
        boxShadow="dark-lg"
        onClick={onOpenQR}
      />
      <Modal isOpen={isOpenQR} onClose={onCloseQR}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            p={8}
          >
            <Box my={4}>
              <QRCodeSVG
                value={`https://skube.xyz/u/${router.asPath}`}
                size={300}
              />
            </Box>
            <Logo />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box
        w="100%"
        h="200px"
        bgGradient={`linear(to-br, ${SAMPLE_DATA.colors[0]}, ${SAMPLE_DATA.colors[1]})`}
        shadow="sm"
      >
        <Box
          bgGradient="linear(to-br, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.3))"
          h="full"
          w="full"
        />
      </Box>
      <Container maxW="4xl" transform="translateY(-70px)">
        <VStack spacing={12}>
          {/* Profile */}
          <VStack>
            <Box
              rounded="full"
              bgGradient={`linear(to-br, ${SAMPLE_DATA.colors[0]}, ${SAMPLE_DATA.colors[1]})`}
              display="inline-block"
            >
              <Box
                rounded="full"
                bgColor="rgba(255, 255, 255, 0.9)"
                h="full"
                w="full"
                p={1}
                shadow="xl"
              >
                <Avatar
                  name={SAMPLE_DATA.name}
                  src={ipfsLink(SAMPLE_DATA.avatar)}
                  size="2xl"
                  objectFit="cover"
                  display="inline-block"
                />
              </Box>
            </Box>
            <Heading as="h1" size="xl">
              {SAMPLE_DATA.name}
            </Heading>

            <Text
              fontSize="xl"
              fontWeight={500}
              color="gray.500"
              lineHeight={1}
            >
              {SAMPLE_DATA.description}
            </Text>
            <HStack
              spacing={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
            >
              {SAMPLE_DATA.attributes.map((att, index) => {
                return (
                  <Link
                    key={index}
                    href={att.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    fontWeight={500}
                    color="gray.500"
                    fontSize="md"
                  >
                    {att.trait_type}
                  </Link>
                );
              })}
            </HStack>
          </VStack>
          {/* Other NFTs and Badges */}
          <Box w="100%">
            <Box mb={8} w="100%">
              <Heading as="h3" size="lg" mb={2}>
                Other NFTs & Badges
              </Heading>
              <Text
                fontSize="lg"
                fontWeight={500}
                color="gray.500"
                lineHeight={1}
              >
                View all the other NFTs and badges that {SAMPLE_DATA.name} owns
              </Text>
            </Box>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={8}
            >
              {(otherNFTs || []).map((collection, index) => {
                return (collection.metadata || []).map((nftData, j) => {
                  if (
                    !nftData.metadata ||
                    !nftData.metadata.image ||
                    !nftData.metadata.name
                  ) {
                    return null;
                  }
                  return (
                    <GridItem key={`${index}-${j}`} w="100%">
                      <NFTCard
                        metadata={nftData.metadata}
                        contractAddress={collection.contractAddress}
                        tokenId={nftData.tokenId}
                      />
                    </GridItem>
                  );
                });
              })}
            </Grid>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default UserProfile;

UserProfile.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout bare maxW="full" px={0}>
      {page}
    </Layout>
  );
};
