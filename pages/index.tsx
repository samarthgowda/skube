import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalContent,
  ModalOverlay,
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
  IoCheckmarkDone,
  IoImages,
  IoPlayCircle,
  IoShareSocial,
  IoShieldCheckmark,
  IoShieldCheckmarkOutline,
  IoTrophy,
} from "react-icons/io5";
import ReactTypingEffect from "react-typing-effect";

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
    issuedDate: "05/15/2022",
    color1: "pink",
    color2: "blue",
  },
  {
    title: "Best Design, Hacktoberfest 2022",
    name: "Jim Kim",
    type: "🏆 Award",
    issuedDate: "06/20/2022",
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
    issuedDate: "06/02/2022",
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
    issuedDate: "06/29/2022",
    color1: "pink",
    color2: "orange",
  },
  {
    title: "1st Place, PHL Tennis Championships",
    name: "Greta Lam",
    type: "🏆 Award",
    issuedDate: "06/10/2022",
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
        <Box py={[8, 14, 20]} p={4} maxW="container.xl" mx="auto">
          <motion.div
            initial={{ y: "75px", opacity: 0, scale: 0.95 }}
            animate={{ y: "0", opacity: 1, scale: 1 }}
            transition={{
              duration: "0.8",
              bounce: "1",
            }}
          >
            <Box maxW="container.lg" textAlign="left" pb={[8, 14, 20]}>
              <Heading
                variant="h1"
                fontSize={{ base: "6xl", md: "7xl", lg: "8xl", xl: "9xl" }}
                fontWeight={500}
                lineHeight={1}
              >
                Simple way to issue blockchain badges for <br />
                <ReactTypingEffect
                  text={[
                    "certificates",
                    "trophies",
                    "memberships",
                    "diplomas",
                    "awards",
                    "conferences",
                    "employment",
                    "competitions",
                    "teams",
                    "events",
                  ]}
                  speed={100}
                  eraseSpeed={50}
                  eraseDelay={1000}
                  typingDelay={200}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  displayTextRenderer={(text: any) => (
                    <Box
                      as="span"
                      bgGradient="linear(to-br, orange.400, primary.400)"
                      bgClip="text"
                    >
                      {text}
                    </Box>
                  )}
                />
              </Heading>
              <Flex
                alignItems="center"
                justifyContent="flex-start"
                gap={4}
                mt={[8, 12]}
              >
                <NextLink href="/waitlist" passHref>
                  <Button
                    colorScheme="black"
                    size="lg"
                    px={[6, 10]}
                    py={[4, 8]}
                  >
                    Join Waitlist
                  </Button>
                </NextLink>
                <Button
                  colorScheme="blackAlpha"
                  variant="ghost"
                  size="lg"
                  px={[6, 10]}
                  py={[4, 8]}
                  leftIcon={<Icon as={IoPlayCircle} w={6} h={6} />}
                  onClick={onOpen}
                >
                  Watch Video
                </Button>
              </Flex>
            </Box>
          </motion.div>
          <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent>
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                }}
              >
                <iframe
                  title="skube-demo-video"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  src="https://www.tella.tv/video/cl3nszqi1002y09k01j6n6gpq/embed"
                  allowFullScreen
                  allowTransparency
                ></iframe>
              </div>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
      <Box color="gray.100" bgColor="black" py={[8, 14, 20]}>
        <Container maxW="container.xl" textAlign="center" py={[8, 14, 20]}>
          <Heading
            variant="h1"
            fontSize={["4xl", "5xl", "6xl"]}
            fontWeight={500}
            lineHeight={1}
          >
            Why Skube badges
          </Heading>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={[4, 8]}
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
            <GridItem
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
                <Icon as={IoTrophy} fontSize="4xl" color="orange.200" />
                <Text fontWeight={500} fontSize="2xl" mt={3}>
                  Commemorate and reward
                </Text>
                <Text
                  color="gray.400"
                  fontWeight={500}
                  fontSize={["md", "lg"]}
                  mt={2}
                >
                  Issue badges for recognition, completion, and membership
                  allowing your organization to commemorate and reward people
                  with ease.
                </Text>
              </Box>
            </GridItem>
            <GridItem
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
                  as={IoShieldCheckmark}
                  fontSize="4xl"
                  color="primary.100"
                />
                <Text fontWeight={500} fontSize="2xl" mt={3}>
                  Impossible to forge
                </Text>
                <Text
                  color="gray.400"
                  fontWeight={500}
                  fontSize={["md", "lg"]}
                  mt={2}
                >
                  Badges on the blockchain are decentralized meaning that there
                  is no one entity that controls the badge. This also means that
                  it is impossible to forge allowing simple verification.
                </Text>
              </Box>
            </GridItem>
            <GridItem
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
                <Icon as={IoShareSocial} fontSize="4xl" color="blue.200" />
                <Text fontWeight={500} fontSize="2xl" mt={3}>
                  Easy to share and verify
                </Text>
                <Text
                  color="gray.400"
                  fontWeight={500}
                  fontSize={["md", "lg"]}
                  mt={2}
                >
                  Display your badges for the world to view. Someone wants to
                  verify your badge? No problem, just share the link with them.
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Container>
        <Container maxW="container.xl" textAlign="center" py={[8, 14, 20]}>
          <Heading
            variant="h1"
            fontSize={["4xl", "5xl", "6xl"]}
            fontWeight={500}
            lineHeight={1}
          >
            How it works
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
                      Upload designs & csv files
                    </Text>
                    <Text
                      color="gray.400"
                      fontWeight={500}
                      fontSize={["md", "lg"]}
                      mt={2}
                    >
                      Easy to use interface to add your badges. No need to worry
                      about wallets, crypto, security, etc.
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
                      Sign in with email
                    </Text>
                    <Text
                      color="gray.400"
                      fontWeight={500}
                      fontSize={["md", "lg"]}
                      mt={2}
                    >
                      Instantly make your badges accessible to anyone with an
                      email address. More methods to claim badges are coming
                      soon.
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
                      Click a button to claim
                    </Text>
                    <Text
                      color="gray.400"
                      fontWeight={500}
                      fontSize={["md", "lg"]}
                      mt={2}
                    >
                      Yup, all someone needs to do to claim their badge is click
                      a button. Skube takes care of everything else.
                    </Text>
                  </Box>
                </Box>
              </VStack>
            </GridItem>
            <GridItem>
              <Box
                bgGradient="linear(to-br, orange.400, primary.400)"
                rounded="xl"
                pt={[4, 8, 16]}
                pl={[4, 8, 16]}
              >
                <Image
                  src="/images/ABC-Summer-2022.gif"
                  alt="ABC Summer 2022 badge Design"
                  borderTopLeftRadius="xl"
                />
              </Box>
            </GridItem>
          </Grid>
          <Text
            fontWeight={500}
            color="gray.400"
            fontSize={["lg", "xl"]}
            mt={[6, 10, 14]}
          >
            No external wallet setup required. No transaction fees. Easy and
            simple to use.
          </Text>
        </Container>
      </Box>
      <Box pt={[8, 14, 20]}>
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
      <Box pb={[8, 14, 20]}>
        <Container maxW="container.lg" py={[8, 14, 20]}>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            alignItems="center"
            gap={8}
          >
            <GridItem>
              <Box textAlign={{ base: "center", md: "left" }}>
                <Heading
                  variant="h1"
                  fontSize={["4xl", "5xl", "6xl"]}
                  fontWeight={500}
                  lineHeight={1}
                >
                  Issue.
                </Heading>
                <Heading
                  variant="h1"
                  fontSize={["4xl", "5xl", "6xl"]}
                  fontWeight={500}
                  lineHeight={1}
                >
                  Claim.
                </Heading>
                <Heading
                  variant="h1"
                  fontSize={["4xl", "5xl", "6xl"]}
                  fontWeight={500}
                  lineHeight={1}
                >
                  Verify.
                </Heading>
                <Heading
                  variant="h1"
                  fontSize={["4xl", "5xl", "6xl"]}
                  fontWeight={500}
                  lineHeight={1}
                >
                  All for free.
                </Heading>
                <Text
                  fontWeight={500}
                  color="gray.500"
                  fontSize={["lg", "xl"]}
                  mt={[2, 4, 6]}
                >
                  Stay tuned for a premium package that includes custom
                  branding, custom domains, advanced templates, and much more.
                </Text>
              </Box>
            </GridItem>
            <GridItem>
              <Box
                w="100%"
                h="100%"
                bgGradient="linear(to-br, orange.100, primary.100)"
                rounded="lg"
                p={1}
              >
                <Box bgColor="white" rounded="md" p={[8, 12]}>
                  <Heading
                    variant="h1"
                    fontSize={["4xl", "5xl", "6xl", "7xl"]}
                    fontWeight={500}
                    lineHeight={1}
                  >
                    Free
                  </Heading>
                  <List spacing={3} mt={[2, 4, 6]}>
                    <ListItem fontWeight={500}>
                      <ListIcon as={IoCheckmarkDone} color="green.500" />
                      Upload designs and issue badges to anyone
                    </ListItem>
                    <ListItem fontWeight={500}>
                      <ListIcon as={IoCheckmarkDone} color="green.500" />
                      Basic customization and branding options
                    </ListItem>
                    <ListItem fontWeight={500}>
                      <ListIcon as={IoCheckmarkDone} color="green.500" />
                      Showcase badges for anyone to view and verify
                    </ListItem>
                    <ListItem fontWeight={500}>
                      <ListIcon as={IoCheckmarkDone} color="green.500" />
                      Zero transaction fees for creating collections
                    </ListItem>
                    <ListItem fontWeight={500}>
                      <ListIcon as={IoCheckmarkDone} color="green.500" />
                      Zero transaction fees for claiming badges
                    </ListItem>
                    <ListItem fontWeight={500}>
                      <ListIcon as={IoCheckmarkDone} color="green.500" />
                      Zero gas fees on all transactions
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Box py={[6, 10]} bgGradient="linear(to-br, orange.50, primary.50)">
        <Container maxW="container.lg" textAlign="center" py={[8, 14, 20]}>
          <Box maxW="container.sm" mx="auto">
            <Badge
              px={4}
              py={2}
              rounded="full"
              variant="outline"
              mb={6}
              fontSize="md"
            >
              COMING SOON
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
              Skube Protocol allows you to own your decentralized professional
              profile. With our tools, developers can build apps to issue
              badges, verify skills, apply to jobs, display profiles, and more
              all while letting everyone own their data.
            </Text>
            <NextLink href="/waitlist" passHref>
              <Button colorScheme="black" size="lg">
                Join waitlist
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
      <Box pt={[8, 14, 20]}>
        <Container maxW="container.xl" textAlign="center" py={[8, 14, 20]}>
          <Heading
            variant="h1"
            fontSize={["4xl", "5xl", "6xl"]}
            fontWeight={500}
            lineHeight={1}
          >
            Frequently asked questions
          </Heading>
          <Accordion maxW="container.md" mx="auto" pt={[8, 14, 20]} allowToggle>
            <AccordionItem>
              <Heading variant="h3">
                <AccordionButton py={[3, 6]}>
                  <Box flex="1" textAlign="left" fontWeight={500}>
                    Which blockchain will the badges be minted?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} textAlign="left" color="gray.500">
                We use Polygon to create the collections and mint the badges as
                NFTs. Polygon is an Ethereum compatible network that makes
                creating NFTs cheaper and more sustainable.{" "}
                <Link
                  href="https://polygon.technology/sustainability/"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="green.400"
                >
                  Learn more about #PolygonGoesGreen.
                </Link>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <Heading variant="h3">
                <AccordionButton py={[3, 6]}>
                  <Box flex="1" textAlign="left" fontWeight={500}>
                    Do I have to pay for transaction fees?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} textAlign="left" color="gray.500">
                Skube covers all of the transaction fees for creating
                collections and minting badges to those collections. While fees
                for blockchain transactions vary based on the network, it costs
                us around ~$0.20 for each collection and $0.01 for each badges
                minted.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <Heading variant="h3">
                <AccordionButton py={[3, 6]}>
                  <Box flex="1" textAlign="left" fontWeight={500}>
                    Is Skube really free to use?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} textAlign="left" color="gray.500">
                Yes, there is no joke here. We are not charging you for using
                our platform to create collections and mint badges. We do have
                plans to roll out a pro plan where you will have access to even
                more advanced branding, custom domains, more minting methods,
                and much more. For you developers out there, we are cooking up
                something for you too. Stay tuned!
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <Heading variant="h3">
                <AccordionButton py={[3, 6]}>
                  <Box flex="1" textAlign="left" fontWeight={500}>
                    How do I add individuals that can claim badges in my
                    collection?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} textAlign="left" color="gray.500">
                Adding individuals to claim your collection is easy. You need
                two things: your designs and a csv file. For more instructions
                on how to format everything,{" "}
                <Link
                  href="https://skubelabs.notion.site/How-to-add-NFTs-into-your-collection-bd11ccd61f664eebb78cab04a8375e18"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary.300"
                >
                  read our guide
                </Link>
                .
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <Heading variant="h3">
                <AccordionButton py={[3, 6]}>
                  <Box flex="1" textAlign="left" fontWeight={500}>
                    How do I claim my badges?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} textAlign="left" color="gray.500">
                When you come to Skube to claim your badge, you will sign in
                with your email address. Once you have signed in, you will be
                able to see the badges that you can claim. Then click on the
                Mint button to claim your badge. That is it!
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <Heading variant="h3">
                <AccordionButton py={[3, 6]}>
                  <Box flex="1" textAlign="left" fontWeight={500}>
                    How do I display my badges?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} textAlign="left" color="gray.500">
                We follow OpenSea standards for creating your badges as NFTs.
                What this means for everyone is that your badges that are
                claimed on Skube are available to view and share on OpenSea if
                you would like.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Container>
      </Box>
      <Box pb={[8, 14, 20]}>
        <Container maxW="container.xl" textAlign="center" py={[8, 14, 20]}>
          <Text
            fontWeight={500}
            color="gray.500"
            fontSize={["lg", "xl"]}
            mb={2}
          >
            Join the community
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
            <NextLink href="/waitlist" passHref>
              <Button colorScheme="primary" size="lg">
                Join Waitlist
              </Button>
            </NextLink>
            <NextLink href="mailto:samarth@skube.xyz" passHref>
              <Button
                variant="ghost"
                colorScheme="blackAlpha"
                color="blackAlpha.900"
                size="lg"
              >
                Questions? Talk to us
              </Button>
            </NextLink>
          </Flex>
        </Container>
      </Box>
      {/* TODO: Alternating sections */}
      {/*     TODO: 1. Advanced customizability and branding */}
      {/*     TODO: 2. Send email notifying users of claiming  */}
      {/*     TODO: 3. Section on minting and mint page */}
      {/* TODO: Testimonials */}
      {/* TODO: Section on security, privacy, and sustainability (Grid) */}
      {/* TODO: Section telling users they can experience claiming a special badge on skube right now to experience the UX */}
      {/* TODO: Links to articles from blog */}
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
