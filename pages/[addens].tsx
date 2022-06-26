import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Layout from "components/Layout";
import Logo from "components/Logo";
import NFTCard from "components/NFTCard";
import { ipfsLink } from "lib/ipfs";
import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import { ReactElement } from "react";
import { IoArrowBack, IoQrCode } from "react-icons/io5";
import { useGetNFTsQuery } from "redux/services/tatum";
import { useFetchProfileNftQuery } from "redux/services/users";
import { useEnsAddress } from "wagmi";

const UserProfile = () => {
  const network = "MUMBAI";
  const router = useRouter();
  const { addens: addressOrENS } = router.query;

  const {
    isLoading: isLoadingEns,
    data: ensData,
    isError: isErrorEns,
  } = useEnsAddress({
    name: addressOrENS as string,
  });

  const address = ensData || addressOrENS;

  const {
    isOpen: isOpenQR,
    onOpen: onOpenQR,
    onClose: onCloseQR,
  } = useDisclosure();

  const {
    isLoading: isLoadingProfileNft,
    data: profileNft,
    error: errorProfileNft,
  } = useFetchProfileNftQuery(address, {
    skip: isLoadingEns || !addressOrENS,
    refetchOnMountOrArgChange: true,
  });

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

  if (errorProfileNft) {
    return (
      <Box
        w="100%"
        h="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <iframe
          title="lost-doge"
          src="https://giphy.com/embed/oBQZIgNobc7ewVWvCd"
          width="400"
          height="400"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        ></iframe>

        <Text fontSize="4xl" fontWeight={600} mt={4}>
          Uhhh, where are you going?
        </Text>
        <Text fontSize="lg" fontWeight={500} color="gray.500">
          This profile does not exist.
        </Text>
        <Button
          onClick={() => router.back()}
          mt={2}
          mb={12}
          size="sm"
          colorScheme="black"
          leftIcon={<IoArrowBack />}
        >
          Go back
        </Button>
        <Logo />
      </Box>
    );
  }

  if (
    isLoadingEns ||
    isLoadingProfileNft ||
    (!isLoadingProfileNft && !profileNft)
  ) {
    return (
      <Box
        w="100%"
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner />
      </Box>
    );
  }

  const currentProfile =
    profileNft && profileNft.length > 0 && profileNft[0]?.metadata;

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
        boxShadow="2xl"
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
                value={`https://skube.xyz/${router.asPath}`}
                size={300}
                style={{ borderRadius: 10 }}
              />
            </Box>
            <Logo />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box
        w="100%"
        h="200px"
        bgGradient={`linear(to-br, ${currentProfile.colors[0]}, ${currentProfile.colors[1]})`}
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
              bgGradient={`linear(to-br, ${currentProfile.colors[0]}, ${currentProfile.colors[1]})`}
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
                  name={currentProfile.name}
                  src={ipfsLink(currentProfile.avatar)}
                  size="2xl"
                  objectFit="cover"
                  bgColor={currentProfile.colors[0]}
                  display="inline-block"
                />
              </Box>
            </Box>
            <Heading as="h1" size="xl">
              {currentProfile.name}
            </Heading>

            <Text
              fontSize="xl"
              fontWeight={500}
              bgGradient={`linear(to-l, ${currentProfile.colors[1]}, ${currentProfile.colors[0]})`}
              bgClip="text"
              lineHeight={1}
            >
              {currentProfile.description}
            </Text>
            <Grid
              pt={6}
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={4}
            >
              {currentProfile.attributes.map((att, index) => {
                return (
                  <GridItem key={index} as={LinkBox}>
                    <LinkBox
                      as="div"
                      fontWeight={500}
                      color="gray.500"
                      fontSize="md"
                      p={4}
                      borderColor="gray.200"
                      borderWidth="1.5px"
                      rounded="lg"
                      transition="ease-in-out 0.1s"
                      _hover={{
                        shadow: "md",
                        transition: "ease-in-out 0.1s",
                      }}
                    >
                      <Box>
                        <Text
                          fontWeight={600}
                          bgGradient={`linear(to-l, ${currentProfile.colors[1]}, ${currentProfile.colors[0]})`}
                          bgClip="text"
                        >
                          {att.trait_type}
                        </Text>

                        <LinkOverlay
                          href={att.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="gray.500"
                          fontWeight={400}
                          mb={1}
                        >
                          {att.value}
                        </LinkOverlay>
                      </Box>
                    </LinkBox>
                  </GridItem>
                );
              })}
              {currentProfile.resume && (
                <GridItem as={LinkBox}>
                  <LinkBox
                    as="div"
                    fontWeight={500}
                    color="gray.500"
                    fontSize="md"
                    p={4}
                    borderColor="gray.200"
                    borderWidth="1.5px"
                    rounded="lg"
                    transition="ease-in-out 0.1s"
                    _hover={{
                      shadow: "md",
                      transition: "ease-in-out 0.1s",
                    }}
                  >
                    <Box textOverflow="clip">
                      <Text
                        fontWeight={600}
                        bgGradient={`linear(to-l, ${currentProfile.colors[1]}, ${currentProfile.colors[0]})`}
                        bgClip="text"
                      >
                        Resume
                      </Text>
                      <LinkOverlay
                        href={currentProfile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="gray.500"
                        fontWeight={400}
                        mb={1}
                      >
                        Click here to view
                      </LinkOverlay>
                    </Box>
                  </LinkBox>
                </GridItem>
              )}
            </Grid>
          </VStack>

          {/* Other NFTs and Badges */}
          {isLoadingOtherNFTs ? (
            <Spinner />
          ) : (
            otherNFTs &&
            otherNFTs.length > 0 && (
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
                    View all the other NFTs and badges that{" "}
                    {currentProfile.name} owns
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
                        !nftData ||
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
            )
          )}
        </VStack>
      </Container>
    </>
  );
};

UserProfile.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout bare maxW="full" px={0}>
      {page}
    </Layout>
  );
};

export default UserProfile;
