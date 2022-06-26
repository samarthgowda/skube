import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Input,
  Link,
  Text,
  Textarea,
  Tooltip,
  useToast,
  useToken,
  VStack,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import Layout from "components/Layout";
import format from "date-fns/format";
import * as htmlToImage from "html-to-image";
import { addIpfsStart } from "lib/ipfs";
import nftstorage from "lib/nftstorage";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";
import {
  IoFileTrayFullOutline,
  IoShieldCheckmarkOutline,
  IoTrash,
} from "react-icons/io5";
import { useAccount, useSigner } from "wagmi";
import "@fontsource/mr-de-haviland";

const COLORS = [
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "gray",
];

const Badge = () => {
  const router = useRouter();
  const {
    data: account,
    isError: isErrorAccount,
    isLoading: isLoadingAccount,
  } = useAccount();
  const { data: signer } = useSigner();

  const address = account?.address;

  const [image, setImage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [color1, setColor1] = useState("pink");
  const [color2, setColor2] = useState("orange");
  const issuedDate = format(new Date(), "MMM dd, yyyy");

  const [color1Hex, color2Hex] = useToken("colors", [
    `${color1}.${darkMode ? 600 : 300}`,
    `${color2}.${darkMode ? 600 : 300}`,
  ]);

  const [metadata, setMetadata] = useState({
    address: "",
    name: "",
    description: "",
    category: "",
    receiverName: "",
    attributes: [],
  });

  const onDropImage = (acceptedFiles) => {
    const imageFile = acceptedFiles[0];
    setImage(imageFile);
  };

  const updateAttribute = (index, e) => {
    const newAttributes = [...metadata.attributes];
    newAttributes[index] = {
      ...newAttributes[index],
      [e.target.name]: e.target.value,
    };
    setMetadata({
      ...metadata,
      attributes: newAttributes,
    });
  };

  const handleChangeMetadata = (e) => {
    setMetadata({
      ...metadata,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const handleDeleteAttribute = (index) => {
    let newAttributes = [...metadata.attributes];
    newAttributes = newAttributes.filter((_, i) => i !== index);
    setMetadata({
      ...metadata,
      attributes: newAttributes,
    });
  };

  const printRef = useRef();

  const toast = useToast();
  const [isMinting, setIsMinting] = useState(false);

  const handleCreateProfile = async () => {
    try {
      await setIsMinting(true);

      toast({
        title: `🤗 Creating your badge`,
        description:
          "Do not close this window, your badge is being minted right now. It may take sometime, so please be patient.",
        status: "warning",
        duration: 10000,
      });

      const element = printRef.current;

      let imageUrl = "";
      if (image) {
        const uploadedImageCID = await nftstorage.storeBlob(image);
        imageUrl = addIpfsStart(uploadedImageCID);
      } else {
        const dataUrl = await htmlToImage.toPng(element);
        const generatedImage = dataURLtoBlob(dataUrl);
        const generatedImageCID = await nftstorage.storeBlob(generatedImage);
        imageUrl = addIpfsStart(generatedImageCID);
      }

      const body = {
        to: metadata.address,
        metadata: {
          from: address,
          to: metadata.address,
          receiverName: metadata.receiverName,
          name: metadata.name,
          description: metadata.description,
          category: metadata.category,
          image: imageUrl,
          dark: darkMode,
          colors: [color1Hex, color2Hex],
          attributes: metadata.attributes,
          issuedDate: issuedDate,
        },
      };

      const signedPayloadReq = await fetch(`/api/signature/badges`, {
        method: "POST",
        body: JSON.stringify(body),
      });

      const signedPayload = await signedPayloadReq.json();

      const sdk = new ThirdwebSDK(signer, {
        gasless: {
          openzeppelin: {
            relayerUrl:
              "https://api.defender.openzeppelin.com/autotasks/f7585fd1-1984-43d0-8ad7-4c3b79e081b2/runs/webhook/573fe504-e732-4c12-b04d-4e4152a59b8b/75sNdsE2CWKMXBTzyAFBzC",
          },
        },
      });

      const badgeCollection = sdk.getNFTCollection(
        process.env.NEXT_PUBLIC_BADGES_COLLECTION_ADDRESS
      );

      await badgeCollection?.signature.mint(signedPayload);

      setTimeout(() => {
        toast({
          title: "🧊 Badge issued",
          description: "Successfully minted this badge.",
          status: "success",
        });
        router.push(`/`);
        setIsMinting(false);
      }, 3 * 60);
    } catch (error) {
      setIsMinting(false);
    }
  };

  return (
    <Box py={{ base: 8, md: 12, lg: 16 }} px={2} maxW="7xl" mx="auto">
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          lg: "repeat(2, fr)",
        }}
        gap={8}
      >
        <GridItem w="100%" display="flex" justifyContent="center">
          <Box
            bgGradient={`linear(to-br, ${
              darkMode ? "gray.900" : "white"
            }, gray.${darkMode ? 700 : 50}, ${
              darkMode ? "gray.900" : "white"
            })`}
            ref={printRef}
            rounded="lg"
            w="500px"
            h="350px"
            display="flex"
            borderColor={`gray.${darkMode ? 600 : 100}`}
            borderWidth="4px"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              rounded="lg"
              bgGradient={`linear(to-br, ${color1}.200, ${color2}.200)`}
              p={1}
              boxShadow="md"
              h={275}
              w={425}
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
                h="100%"
              >
                <Flex alignItems="flex-start" justifyContent="space-between">
                  <Box>
                    <Text
                      fontSize="2xl"
                      textTransform="uppercase"
                      fontFamily="mono"
                      color="gray.900"
                      fontWeight={600}
                      mb={3}
                      lineHeight={1.1}
                    >
                      {metadata.name || "Badge Name"}
                    </Text>
                    <Text fontSize="lg" fontFamily="mono" color="gray.500">
                      {metadata.receiverName
                        ? `${metadata.receiverName} • `
                        : ""}
                      {metadata.category || "🧊 Category"}
                    </Text>
                  </Box>
                  <Icon
                    fontSize="5xl"
                    as={IoShieldCheckmarkOutline}
                    color={`${color2}.300`}
                    ml={3}
                  />
                </Flex>

                <Box>
                  <Text
                    fontSize="md"
                    fontFamily="mono"
                    textTransform="uppercase"
                    color="gray.500"
                  >
                    Issued {issuedDate}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </GridItem>
        <GridItem w="100%" display="flex" justifyContent="center">
          <Box
            p={{ base: 6, md: 12, lg: 16 }}
            rounded="lg"
            borderColor="gray.100"
            borderWidth="4px"
            bgColor="white"
          >
            <VStack spacing={6} w="100%">
              <Box mb={4} textAlign="left" w="100%">
                <Heading as="h1" size="2xl" mb={2}>
                  Issue a badge
                </Heading>
                <Text color="gray.500" fontSize="xl" fontWeight={500}>
                  Issue non-transferrable badges to yourself or others
                </Text>
              </Box>
              <FormControl isRequired>
                <FormLabel htmlFor="address">Address</FormLabel>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter recipient wallet address"
                  value={metadata.address}
                  onChange={handleChangeMetadata}
                  borderColor="gray.300"
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="receiverName">Receiver Name</FormLabel>
                <Input
                  id="receiverName"
                  name="receiverName"
                  type="text"
                  placeholder="Enter the name of receiver (optional)"
                  value={metadata.receiverName}
                  onChange={handleChangeMetadata}
                  borderColor="gray.300"
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="name">Title</FormLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter badge title"
                  value={metadata.name}
                  onChange={handleChangeMetadata}
                  borderColor="gray.300"
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter a description of why this badge should be issued"
                  value={metadata.description}
                  onChange={handleChangeMetadata}
                  rows={4}
                  borderColor="gray.300"
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Input
                  id="category"
                  name="category"
                  type="text"
                  placeholder="Enter the category of this badge (i.e. Course, Employment, Membership, Award, etc.)"
                  value={metadata.category}
                  onChange={handleChangeMetadata}
                  borderColor="gray.300"
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="name">Left Color</FormLabel>
                <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
                  {COLORS.map((color) => (
                    <Tooltip key={color} label={`${color}`}>
                      <Box
                        rounded="full"
                        border={color === color1 ? "4px" : "0px"}
                        borderColor={`${color}.900`}
                        h={10}
                        w={10}
                        bgColor={`${color}.${darkMode ? 500 : 300}`}
                        transition="ease-in-out"
                        cursor="pointer"
                        _hover={{
                          bgColor: `${color}.${darkMode ? 600 : 200}`,
                        }}
                        onClick={() => setColor1(color)}
                      />
                    </Tooltip>
                  ))}
                </Box>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="name">Right Color</FormLabel>
                <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
                  {COLORS.map((color) => (
                    <Tooltip key={color} label={`${color}`}>
                      <Box
                        rounded="full"
                        border={color === color2 ? "4px" : "0px"}
                        borderColor={`${color}.900`}
                        h={10}
                        w={10}
                        bgColor={`${color}.${darkMode ? 500 : 300}`}
                        transition="ease-in-out"
                        cursor="pointer"
                        _hover={{
                          bgColor: `${color}.${darkMode ? 600 : 200}`,
                        }}
                        onClick={() => setColor2(color)}
                      />
                    </Tooltip>
                  ))}
                </Box>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="name" mb={2}>
                  Theme
                </FormLabel>
                <Tooltip label={darkMode ? "Toggle light" : "Toggle dark"}>
                  <Button
                    aria-label="Toggle dark mode"
                    onClick={() => setDarkMode(!darkMode)}
                    colorScheme="gray"
                    variant="outline"
                    _focus={{ boxShadow: "none" }}
                    w="fit-content"
                    rounded="lg"
                  >
                    {!darkMode ? <BsMoonStarsFill /> : <BsSun />}
                  </Button>
                </Tooltip>
              </FormControl>

              <FormControl>
                <FormLabel>
                  Custom Image (Overrides generated design above)
                </FormLabel>

                {image ? (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                    w="100%"
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Image
                        src={URL.createObjectURL(image)}
                        alt="image"
                        w="100px"
                        h="100px"
                        rounded="md"
                        objectFit="cover"
                      />
                      <Link
                        href={URL.createObjectURL(image)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Text fontSize="lg" fontWeight={500}>
                          {image.name}
                        </Text>
                      </Link>
                    </Box>
                    <Icon
                      as={IoTrash}
                      cursor="pointer"
                      onClick={handleRemoveImage}
                    />
                  </Box>
                ) : (
                  <Dropzone onDrop={onDropImage} accept="image/*">
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        border={2}
                        borderStyle="dashed"
                        borderColor="gray.600"
                        color="gray.600"
                        rounded="md"
                        py={8}
                        px={2}
                        w="100%"
                        textAlign="center"
                        transition="ease-in-out 0.2s"
                        _hover={{
                          borderColor: "gray.400",
                          color: "gray.400",
                        }}
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <Icon as={IoFileTrayFullOutline} w={10} h={10} />
                        <Text size="sm" fontWeight={500}>
                          Drag your custom image here, or click here to browse.
                        </Text>
                        <Text size="sm">PNG, JPEG, JPG, GIF</Text>
                      </Box>
                    )}
                  </Dropzone>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>
                  Add attributes (i.e. socials, links, contact, etc.)
                </FormLabel>

                {(metadata.attributes || []).map((att, index) => {
                  return (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      gap={2}
                      my={2}
                      w="100%"
                    >
                      <Input
                        id="trait_type"
                        name="trait_type"
                        type="text"
                        placeholder="Attribute name"
                        value={att.trait_type}
                        onChange={(e) => updateAttribute(index, e)}
                        borderColor="gray.300"
                        _placeholder={{
                          color: "gray.500",
                        }}
                      />
                      <Input
                        id="value"
                        name="value"
                        type="text"
                        placeholder="Enter the value"
                        value={att.value}
                        onChange={(e) => updateAttribute(index, e)}
                        borderColor="gray.300"
                        _placeholder={{
                          color: "gray.500",
                        }}
                      />
                      <Icon
                        as={IoTrash}
                        cursor="pointer"
                        onClick={() => handleDeleteAttribute(index)}
                      />
                    </Box>
                  );
                })}

                <Button
                  alignSelf="flex-end"
                  size="sm"
                  colorScheme="black"
                  onClick={() =>
                    setMetadata({
                      ...metadata,
                      attributes: [
                        ...metadata.attributes,
                        { trait_type: "", value: "" },
                      ],
                    })
                  }
                >
                  Add Attributes
                </Button>
              </FormControl>
              <Box pt={4} w="100%">
                {address ? (
                  <Button
                    isLoading={isMinting}
                    colorScheme="black"
                    type="submit"
                    w="100%"
                    py={6}
                    onClick={handleCreateProfile}
                  >
                    Create
                  </Button>
                ) : (
                  <ConnectButton />
                )}
              </Box>
            </VStack>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

Badge.getLayout = (page) => (
  <Layout maxW="full" px={0}>
    {page}
  </Layout>
);

export default Badge;
