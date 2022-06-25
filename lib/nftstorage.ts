import { NFTStorage } from "nft.storage";

const nftstorage = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFTSTORAGE_KEY,
});

export default nftstorage;
