// Redux
import { Box, ChakraProvider } from "@chakra-ui/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "redux/store";
import Fonts from "styles/fonts";
import Notion from "styles/notion";
// UI
import theme from "styles/theme";
// WAGMI
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import "@rainbow-me/rainbowkit/styles.css";

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.polygon],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Skube",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ThirdwebProvider
      desiredChainId={activeChainId}
      // sdkOptions={{
      //   gasless: {
      //     openzeppelin: {
      //       relayerUrl: "",
      //     },
      //   },
      // }}
    >
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <ReduxProvider store={store}>
            <ChakraProvider resetCSS theme={theme}>
              <Fonts />
              <Notion />
              <Box width="100%" height="100vh" overflow="auto" position="fixed">
                {getLayout(<Component {...pageProps} />)}
              </Box>
            </ChakraProvider>
          </ReduxProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThirdwebProvider>
  );
}

export default MyApp;
