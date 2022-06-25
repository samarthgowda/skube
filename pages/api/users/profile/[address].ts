import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";

// POST api/profile/:address
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;

    switch (method) {
      case "GET": {
        const { address } = req.query;

        // Initialize the Thirdweb SDK on the serverside using the private key on the mumbai network
        const twsdk = new ThirdwebSDK("mumbai");

        // Load the NFT Collection via it's contract address using the SDK
        const profileCollection = await twsdk.getNFTCollection(
          process.env.PROFILE_COLLECTION_ADDRESS
        );

        const myProfileNft = await profileCollection.getOwned(
          address as string
        );

        res.status(200).json(myProfileNft);
        break;
      }

      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).end(`Error ${error.message}`);
  }
}
