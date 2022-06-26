// Redux
import { Box, ChakraProvider } from "@chakra-ui/react";
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { providers } from "ethers";
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
import "styles/base.css";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Skube",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  // provider,
  provider(config) {
    return new providers.InfuraProvider(
      config.chainId,
      "96cdc33b3ce4495e9b3eb062eb43d7e2"
    );
  },
});
const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        coolMode
        theme={lightTheme({
          borderRadius: "large",
          accentColor: "#b002a6",
        })}
      >
        <ThirdwebProvider
          desiredChainId={activeChainId}
          sdkOptions={{
            gasless: {
              openzeppelin: {
                relayerUrl:
                  "https://api.defender.openzeppelin.com/autotasks/f7585fd1-1984-43d0-8ad7-4c3b79e081b2/runs/webhook/573fe504-e732-4c12-b04d-4e4152a59b8b/75sNdsE2CWKMXBTzyAFBzC",
              },
            },
          }}
        >
          <ReduxProvider store={store}>
            <ChakraProvider resetCSS theme={theme}>
              <Fonts />
              <Notion />
              <Box width="100%" height="100vh" overflow="auto" position="fixed">
                {getLayout(<Component {...pageProps} />)}
              </Box>
            </ChakraProvider>
          </ReduxProvider>
        </ThirdwebProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
