import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Link,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Layout from "components/Layout";
import Seo from "components/Seo";
import { motion } from "framer-motion";
import NextLink from "next/link";
import {
  IoArrowUpCircle,
  IoAtCircle,
  IoImages,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

const BADGE_EXAMPLES = [
  {
    title: "SWE Internship 2022, ABC.XYZ",
    name: "Sid Patel",
    type: "💼 Employment",
    issuedDate: "08/08/2022",
    color1: "orange",
    color2: "pink",
  },
  {
    title: "B.S. Computer Science, University of Toronto",
    name: "Akuchi Ladipo",
    type: "📜 Diploma",
    issuedDate: "07/15/2022",
    color1: "pink",
    color2: "blue",
  },
  {
    title: "Best Design, Hacktoberfest 2022",
    name: "Jim Kim",
    type: "🏆 Award",
    issuedDate: "09/21/2022",
    color1: "purple",
    color2: "red",
  },
  {
    title: "Web3 Miami",
    name: "Sam Gouda",
    type: "🎟️ Conference",
    issuedDate: "07/03/2022",
    color1: "cyan",
    color2: "purple",
  },
  {
    title: "President, CMU Trading Club",
    name: "Alexis Zon",
    type: "🙋 Membership",
    issuedDate: "08/02/2022",
    color1: "red",
    color2: "purple",
  },
  {
    title: "Digital Marketing, Edu Mellon",
    name: "Sheetal Sharma",
    type: "🏛️ Certificate",
    issuedDate: "07/17/2022",
    color1: "pink",
    color2: "cyan",
  },
  {
    title: "Best Actress, Institute Awards",
    name: "Jessica Sony",
    type: "🎥 Film",
    issuedDate: "09/12/2022",
    color1: "purple",
    color2: "teal",
  },
  {
    title: "Infrastructure Team, Lotion",
    name: "Che Makonaha",
    type: "💼 Employment",
    issuedDate: "07/29/2022",
    color1: "pink",
    color2: "orange",
  },
  {
    title: "1st Place, PHL Tennis Championships",
    name: "Greta Lam",
    type: "🏆 Award",
    issuedDate: "08/10/2022",
    color1: "purple",
    color2: "red",
  },
];

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Seo />
      <Box
        backgroundSize="auto auto"
        backgroundRepeat="repeat, no-repeat"
        backgroundPosition="0px 0px, 0% 100%"
        backgroundImage="linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.3)), url(https://images.unsplash.com/photo-1638742385167-96fc60e12f59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format)"
      >
        <motion.div
          initial={{ y: "75px", opacity: 0, scale: 0.95 }}
          animate={{ y: "0", opacity: 1, scale: 1 }}
          transition={{
            duration: "0.8",
            bounce: "1",
          }}
        >
          <Box
            py={[8, 14, 20, 28]}
            p={4}
            maxW="container.md"
            mx="auto"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Box mb={8}>
              <Heading
                variant="h1"
                fontSize={{ base: "6xl", lg: "7xl", xl: "8xl" }}
                fontWeight={700}
                mb={4}
                px={4}
                lineHeight={1.1}
              >
                Build your{" "}
                <Box
                  as="span"
                  fontWeight={800}
                  fontStyle="italic"
                  fontFamily="Playfair Display"
                  bgGradient="linear(to-br, orange.600, primary.600)"
                  bgClip="text"
                >
                  on-chain
                </Box>{" "}
                professional profile
              </Heading>
              <Text
                fontWeight={500}
                color="gray.500"
                fontSize={{ base: "lg", sm: "xl", lg: "2xl" }}
              >
                Mint your own profile, issue badges to yourself and others, and
                showcase it to the world, entirely on-chain. Follow us on
                Twitter to be notified!
              </Text>
            </Box>

            <NextLink href="/profile" passHref>
              <Button colorScheme="black" size="lg" px={[6, 10]} py={[4, 8]}>
                Mint Profile
              </Button>
            </NextLink>
          </Box>
        </motion.div>
      </Box>
      <Box color="gray.100" bgColor="black">
        <Container maxW="container.xl" textAlign="center" py={[8, 14, 20, 28]}>
          <Heading
            variant="h1"
            fontSize={["4xl", "5xl", "6xl"]}
            fontWeight={500}
            lineHeight={1.1}
            maxW="container.md"
            mx="auto"
          >
            A sleek web3 professional profile crafted for you.
          </Heading>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              lg: "repeat(2, 1fr)",
            }}
            alignItems="center"
            gap={16}
            pt={[8, 14, 20]}
          >
            <GridItem>
              <VStack
                spacing={[4, 8]}
                flexDir="column"
                as={motion.div}
                variants={{
                  hidden: { opacity: 1 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delayChildren: 1,
                      staggerChildren: 0.3,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                <Box
                  w="100%"
                  bgColor="black"
                  border="1px"
                  borderColor="gray.700"
                  rounded="xl"
                  boxShadow="xl"
                  as={motion.div}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                    },
                  }}
                >
                  <Box
                    p={[8, 12]}
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    textAlign="left"
                  >
                    <Icon as={IoImages} fontSize="4xl" color="primary.100" />
                    <Text fontWeight={500} fontSize="2xl" mt={3}>
                      Design & customize your profile
                    </Text>
                    <Text
                      color="gray.400"
                      fontWeight={500}
                      fontSize={["md", "lg"]}
                      mt={2}
                    >
                      Easy to use interface to customize your profile. Enter
                      your links, avatar, custom colors, and much more.
                    </Text>
                  </Box>
                </Box>
                <Box
                  w="100%"
                  bgColor="black"
                  border="1px"
                  borderColor="gray.700"
                  rounded="xl"
                  boxShadow="xl"
                  as={motion.div}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                    },
                  }}
                >
                  <Box
                    p={[8, 12]}
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    textAlign="left"
                  >
                    <Icon as={IoAtCircle} fontSize="4xl" color="orange.200" />
                    <Text fontWeight={500} fontSize="2xl" mt={3}>
                      Unique profile page
                    </Text>
                    <Text
                      color="gray.400"
                      fontWeight={500}
                      fontSize={["md", "lg"]}
                      mt={2}
                    >
                      Quickly share your profile with others using a QR Code. If
                      you have an ENS, your profile will instantly be available
                      at your ENS.
                    </Text>
                  </Box>
                </Box>
                <Box
                  w="100%"
                  bgColor="black"
                  border="1px"
                  borderColor="gray.700"
                  rounded="xl"
                  boxShadow="xl"
                  as={motion.div}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                    },
                  }}
                >
                  <Box
                    p={[8, 12]}
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    textAlign="left"
                  >
                    <Icon
                      as={IoArrowUpCircle}
                      fontSize="4xl"
                      color="blue.200"
                    />
                    <Text fontWeight={500} fontSize="2xl" mt={3}>
                      Build your resume
                    </Text>
                    <Text
                      color="gray.400"
                      fontWeight={500}
                      fontSize={["md", "lg"]}
                      mt={2}
                    >
                      Attach your profile with the badges you collect into your
                      wallet and build your on-chain resume.
                    </Text>
                  </Box>
                </Box>
              </VStack>
            </GridItem>
            <GridItem>
              <Image
                src="https://cloudflare-ipfs.com/ipfs/bafybeiaxdo7pic4udd5ng5b5a3ff4n7fhwazchhhpsdagw7adwivgabmha"
                alt="ABC Summer 2022 badge Design"
              />
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Box py={[8, 14, 20]}>
        <Container maxW="7xl" textAlign="center" py={[8, 14, 20]}>
          <Box maxW="container.sm" mx="auto">
            <Heading
              variant="h1"
              fontSize={["4xl", "5xl", "6xl"]}
              fontWeight={500}
              lineHeight={1}
            >
              Badges for everything
            </Heading>
            <Text
              fontWeight={500}
              color="gray.500"
              fontSize={["lg", "xl"]}
              mt={[2, 4, 6]}
            >
              Issue blockchain badges to recognize, reward, commemorate, verify,
              and much more. Don&apos;t think twice, just Skube it.
            </Text>
          </Box>

          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={[4, 6]}
            pt={[8, 14, 20]}
            as={motion.div}
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 1,
                  staggerChildren: 0.3,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {BADGE_EXAMPLES.map((badge, index) => {
              return (
                <GridItem
                  key={index}
                  rounded="lg"
                  bgGradient={`linear(to-br, ${badge.color1}.200, ${badge.color2}.200)`}
                  p={1}
                  boxShadow="md"
                  as={motion.div}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                    },
                  }}
                >
                  <Box
                    rounded="md"
                    borderWidth={1}
                    borderColor="white"
                    bgColor="rgba(255,255,255,.5)"
                    backdropFilter="blur( 4px )"
                    p={6}
                    textAlign="left"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    height={200}
                  >
                    <Flex alignItems="center" justifyContent="space-between">
                      <Box>
                        <Text
                          fontSize="lg"
                          textTransform="uppercase"
                          fontFamily="mono"
                          color="gray.900"
                          fontWeight={600}
                          mb={1}
                          lineHeight={1.1}
                        >
                          {badge.title}
                        </Text>
                        <Text fontSize="md" fontFamily="mono" color="gray.500">
                          {badge.name} &#x2022; {badge.type}
                        </Text>
                      </Box>
                      <Icon
                        fontSize="5xl"
                        as={IoShieldCheckmarkOutline}
                        color={`${badge.color2}.300`}
                        ml={1}
                      />
                    </Flex>

                    <Box>
                      <Text
                        fontSize="md"
                        fontFamily="mono"
                        textTransform="uppercase"
                        color="gray.500"
                      >
                        Issued {badge.issuedDate}
                      </Text>
                    </Box>
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        </Container>
      </Box>
      <Box py={[6, 10]} w="100%">
        <Box
          textAlign="center"
          bgGradient="linear(to-br, orange.50, primary.50)"
          py={[6, 10, 20, 28]}
        >
          <Container>
            <Badge
              px={4}
              py={2}
              rounded="full"
              variant="outline"
              mb={6}
              fontSize="md"
              fontStyle="italic"
            >
              THE FUTURE
            </Badge>
            <Heading
              variant="h1"
              fontSize={["4xl", "5xl", "6xl"]}
              fontWeight={500}
              lineHeight={1}
            >
              Skube Protocol
            </Heading>
            <Text
              fontWeight={500}
              color="gray.500"
              fontSize={["lg", "xl"]}
              my={[2, 4, 6]}
            >
              Skube Protocol allows you to own your web3 professional profile.
              With our tools, developers can build apps to issue badges, verify
              skills, apply to jobs, display profiles, and more all while
              letting everyone own their data.
            </Text>
          </Container>
        </Box>
        <Box
          textAlign="center"
          bgColor="black"
          color="gray.100"
          py={[6, 10, 20, 28]}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Container>
            <Text
              fontWeight={500}
              color="gray.500"
              fontSize={["lg", "xl"]}
              mb={2}
            >
              Join us
            </Text>
            <Heading
              variant="h1"
              fontSize={["4xl", "5xl", "6xl"]}
              fontWeight={500}
              lineHeight={1}
            >
              Stay up to date!
            </Heading>
            <Flex alignItems="center" justifyContent="center" gap={3} mt={8}>
              <Button
                as={Link}
                href="/twitter"
                target="_blank"
                rel="noopener noreferrer"
                colorScheme="twitter"
                size="lg"
                _hover={{ textDecoration: "none" }}
              >
                Follow @skubelabs on Twitter
              </Button>
            </Flex>
          </Container>
        </Box>
      </Box>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout maxW="full" px={0}>
      {page}
    </Layout>
  );
};
