export const GATEWAY_REWRITE = "https://cloudflare-ipfs.com/ipfs/";

export const ipfsLink = (url) => {
  if (!url) return "";
  return url.replace("ipfs://", GATEWAY_REWRITE);
};

export const removeIpfsStart = (url) => {
  if (!url) return "";
  return url.replace("ipfs://", "");
};

export const addIpfsStart = (cid) => {
  if (!cid) return "";
  return `ipfs://${cid}`;
};
