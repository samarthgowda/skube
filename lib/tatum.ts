export const getTatumApiKey = (mainnet = false) =>
  mainnet ? process.env.TATUM_MAINNET_KEY : process.env.TATUM_TESTNET_KEY;

export const getTatumApiConfig = (mainnet = false) => {
  const config = {
    headers: {
      "x-api-key": getTatumApiKey(mainnet),
    },
  };
  return config;
};
