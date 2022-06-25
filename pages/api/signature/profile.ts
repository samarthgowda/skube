import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";

// POST api/signature/profile
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;

    const body = JSON.parse(req.body);

    switch (method) {
      case "POST": {
        // Initialize the Thirdweb SDK on the serverside using the private key on the mumbai network
        const twsdk = ThirdwebSDK.fromPrivateKey(
          process.env.PRIVATE_KEY,
          "mumbai"
        );

        // Load the NFT Collection via it's contract address using the SDK
        const profileCollection = twsdk.getNFTCollection(
          process.env.PROFILE_COLLECTION_ADDRESS
        );

        // Generate the signature for the NFT mint transaction
        const signedPayload = await profileCollection.signature.generate({
          to: body.to,
          metadata: body.metadata,
        });

        // Return back the signedPayload (mint signature) to the client.
        res.status(200).json(signedPayload);
        break;
      }

      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).end(`Error ${error.message}`);
  }
}
