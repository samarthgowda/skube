import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Input,
  Link,
  Spinner,
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
import Web3Address from "components/Web3Address";
import * as htmlToImage from "html-to-image";
import { addIpfsStart } from "lib/ipfs";
import nftstorage from "lib/nftstorage";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";
import {
  IoDocumentText,
  IoFileTrayFullOutline,
  IoTrash,
} from "react-icons/io5";
import { useFetchProfileNftQuery } from "redux/services/users";
import { useAccount, useNetwork, useSigner } from "wagmi";
import { useEnsName } from "wagmi";
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

const Profile = () => {
  const router = useRouter();
  const {
    data: account,
    isError: isErrorAccount,
    isLoading: isLoadingAccount,
  } = useAccount();
  const { data: signer } = useSigner();

  const { activeChain } = useNetwork();

  const address = account?.address;

  const [resume, setResume] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [color1, setColor1] = useState("pink");
  const [color2, setColor2] = useState("orange");

  const [color1Hex, color2Hex] = useToken("colors", [
    `${color1}.${darkMode ? 600 : 300}`,
    `${color2}.${darkMode ? 600 : 300}`,
  ]);

  const [metadata, setMetadata] = useState({
    name: "",
    description: "",
    bottom: "",
    attributes: [],
  });

  const onDropResume = (acceptedFiles) => {
    const resumeFile = acceptedFiles[0];
    setResume(resumeFile);
  };

  const onDropAvatar = (acceptedFiles) => {
    const avatarFile = acceptedFiles[0];
    setAvatar(avatarFile);
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

  const handleRemoveResume = () => {
    setResume(null);
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
  };

  const handleBurnProfile = async (tokenId) => {
    setIsBurning(true);
    const sdk = new ThirdwebSDK(signer, {
      gasless: {
        openzeppelin: {
          relayerUrl:
            "https://api.defender.openzeppelin.com/autotasks/f7585fd1-1984-43d0-8ad7-4c3b79e081b2/runs/webhook/573fe504-e732-4c12-b04d-4e4152a59b8b/75sNdsE2CWKMXBTzyAFBzC",
        },
      },
    });

    const profileCollection = sdk.getNFTCollection(
      process.env.NEXT_PUBLIC_PROFILE_COLLECTION_ADDRESS
    );

    await profileCollection.burn(tokenId);

    setTimeout(() => {
      setIsBurning(false);
      toast({
        title: "Burned Profile 🔥",
        description: "Successfully burned your profile.",
        status: "success",
      });
      router.push("/");
    }, 4 * 60);
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
  const [isBurning, setIsBurning] = useState(false);

  const handleCreateProfile = async () => {
    try {
      await setIsMinting(true);

      toast({
        title: `🤗 Creating your profile`,
        description:
          "Do not close this window, your profile is being minted right now. It may take sometime, so please be patient.",
        status: "warning",
        duration: 10000,
      });

      const element = printRef.current;

      const dataUrl = await htmlToImage.toPng(element);

      const image = dataURLtoBlob(dataUrl);
      const imageCID = await nftstorage.storeBlob(image);
      const imageUrl = addIpfsStart(imageCID);

      let resumeUrl = "";
      if (resume) {
        const resumeCID = await nftstorage.storeBlob(resume);
        resumeUrl = addIpfsStart(resumeCID);
      }

      let avatarUrl = "";
      if (avatar) {
        const avatarCID = await nftstorage.storeBlob(avatar);
        avatarUrl = addIpfsStart(avatarCID);
      }

      const body = {
        to: address,
        metadata: {
          name: metadata.name,
          description: metadata.description,
          image: imageUrl,
          resume: resumeUrl,
          avatar: avatarUrl,
          dark: darkMode,
          colors: [color1Hex, color2Hex],
          attributes: metadata.attributes,
        },
      };

      const signedPayloadReq = await fetch(`/api/signature/profile`, {
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

      const profileCollection = sdk.getNFTCollection(
        process.env.NEXT_PUBLIC_PROFILE_COLLECTION_ADDRESS
      );

      const tx = await profileCollection?.signature.mint(signedPayload);

      setTimeout(() => {
        setIsMinting(false);
        toast({
          title: "🚀 Welcome to Skube!",
          description: "Successfully created your profile.",
          status: "success",
        });
        router.push(`/${ens || address}`);
      }, 4 * 60);
    } catch (error) {
      setIsMinting(false);
    }
  };

  const {
    isLoading: isLoadingProfileNft,
    data: profileNft,
    error: errorProfileNft,
  } = useFetchProfileNftQuery(address, {
    skip: !address,
    refetchOnMountOrArgChange: true,
  });

  const {
    isLoading: isLoadingEns,
    data: ens,
    isError: isErrorEns,
  } = useEnsName({ address: address, chainId: 1 });

  if (isLoadingProfileNft) {
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
  } else if (profileNft && profileNft.length > 0) {
    // console.log(profileNft[0].metadata.id.hex);
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        py={8}
        maxW="md"
        mx="auto"
      >
        <Heading as="h3" size="xl">
          Minted
        </Heading>
        <Text fontWeight={500} color="gray.500" mb={4} textAlign="center">
          Your wallet (<Web3Address address={address} />) has already minted a
          profile on {activeChain?.name}.
        </Text>
        <Image
          src={profileNft[0].metadata?.image}
          alt={metadata?.name || "Claim image"}
          fit="contain"
          align="center"
          h="auto"
          maxW="100%"
          mb={4}
        />
        <NextLink passHref href={`/${ens || profileNft[0].owner}`}>
          <Button colorScheme="black">View profile</Button>
        </NextLink>
        <Button
          colorScheme="black"
          onClick={() => {
            handleBurnProfile(profileNft[0].metadata.id.hex);
          }}
          isLoading={isBurning}
        >
          Burn Profile 🔥
        </Button>
      </Box>
    );
  }

  return (
    <Box py={{ base: 8, md: 12, lg: 16 }} px={2} maxW="7xl" mx="auto">
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        gap={4}
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
            w="600px"
            h="600px"
            display="flex"
            borderColor={`gray.${darkMode ? 600 : 100}`}
            borderWidth="4px"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              bgGradient={`linear(to-br, ${color1}.${
                darkMode ? 600 : 300
              }, gray.${darkMode ? 700 : 200}, ${color2}.${
                darkMode ? 600 : 300
              })`}
              rounded="3xl"
              boxShadow={darkMode ? "dark-lg" : "xl"}
              color={`gray.${darkMode ? 100 : 900}`}
              w="400px"
              h="500px"
              p={2}
              ml={8}
              transform="perspective(800px) rotateY(15deg)"
            >
              <Box
                background={
                  darkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)"
                }
                rounded="3xl"
                backdropFilter="blur(50px)"
                border={`1px solid ${
                  darkMode ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.5)"
                }`}
                textAlign="left"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                h="100%"
                w="100%"
                p={6}
              >
                <Box>
                  <Heading
                    as="h2"
                    size="lg"
                    textTransform="uppercase"
                    fontWeight={500}
                    mb={0.5}
                  >
                    {metadata.name || "Name"}
                  </Heading>
                  <Text color={`gray.${darkMode ? 400 : 500}`} fontSize="lg">
                    {metadata.description || "Your headline"}
                  </Text>
                </Box>
                <Box>
                  <Text
                    color={`${
                      darkMode
                        ? "rgba(255, 255, 255, 0.5)"
                        : "rgba(0, 0, 0, 0.25)"
                    }`}
                    textAlign="center"
                    fontSize="5xl"
                    fontFamily="'Mr De Haviland', cursive"
                    transform="rotate(-20deg)"
                    lineHeight={1}
                  >
                    {metadata.name}
                  </Text>
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text color={`gray.${darkMode ? 400 : 500}`} fontSize="md">
                    {metadata.bottom || "Bottom left text"}
                  </Text>
                  {avatar ? (
                    <Image
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      w="35px"
                      h="35px"
                      rounded="full"
                      objectFit="cover"
                    />
                  ) : (
                    <Image
                      src="/images/skube-logo.jpeg"
                      w="35px"
                      h="35px"
                      rounded="full"
                      alt="skube-logo"
                      objectFit="cover"
                    />
                  )}
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
                  Create your profile
                </Heading>
                <Text color="gray.500" fontSize="xl" fontWeight={500}>
                  Mint your professional profile as a non-transferrable token
                </Text>
              </Box>
              <FormControl isRequired>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  value={metadata.name}
                  onChange={handleChangeMetadata}
                  borderColor="gray.300"
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="description">Headline</FormLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter a quick headline"
                  value={metadata.description}
                  onChange={handleChangeMetadata}
                  rows={2}
                  borderColor="gray.300"
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="name">Bottom Text</FormLabel>
                <Input
                  id="bottom"
                  name="bottom"
                  type="text"
                  placeholder="Enter text to display on the bottom"
                  value={metadata.bottom}
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
                <FormLabel htmlFor="resume">Resume</FormLabel>

                {resume ? (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                    w="100%"
                  >
                    <Link
                      href={URL.createObjectURL(resume)}
                      target="_blank"
                      rel="noopener noreferrer"
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >
                      <IoDocumentText />
                      <Text fontSize="lg" fontWeight={500}>
                        {resume.name}
                      </Text>
                    </Link>
                    <Icon
                      as={IoTrash}
                      cursor="pointer"
                      onClick={handleRemoveResume}
                    />
                  </Box>
                ) : (
                  <Dropzone
                    onDrop={onDropResume}
                    accept="image/*,application/pdf"
                  >
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
                          Drag your resume here, or click here to browse.
                        </Text>
                        <Text size="sm">PDF (Preferred), PNG, JPEG, JPG</Text>
                      </Box>
                    )}
                  </Dropzone>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Avatar Image</FormLabel>

                {avatar ? (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                    w="100%"
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Image
                        src={URL.createObjectURL(avatar)}
                        alt="avatar"
                        w="50px"
                        h="50px"
                        rounded="full"
                        objectFit="cover"
                      />
                      <Link
                        href={URL.createObjectURL(avatar)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Text fontSize="lg" fontWeight={500}>
                          {avatar.name}
                        </Text>
                      </Link>
                    </Box>
                    <Icon
                      as={IoTrash}
                      cursor="pointer"
                      onClick={handleRemoveAvatar}
                    />
                  </Box>
                ) : (
                  <Dropzone onDrop={onDropAvatar} accept="image/*">
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
                          Drag your avatar here, or click here to browse.
                        </Text>
                        <Text size="sm">PNG, JPEG, JPG</Text>
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
              <Box pt={10} w="100%">
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

Profile.getLayout = (page) => (
  <Layout maxW="full" px={0}>
    {page}
  </Layout>
);

export default Profile;
