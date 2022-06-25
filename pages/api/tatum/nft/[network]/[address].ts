import axios from "axios";
import { getTatumApiKey } from "lib/tatum";
import { NextApiRequest, NextApiResponse } from "next";

// Get api/tatum/nft/:network/:address
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;

    switch (method) {
      case "GET": {
        const { address, network } = req.query;

        const tatumApiKey = getTatumApiKey(network !== "MUMBAI");

        const nfts = await axios.get(
          `${process.env.TATUM_BASE_URL}/nft/address/balance/MATIC/${address}`,
          {
            headers: {
              "x-api-key": tatumApiKey,
            },
          }
        );

        res.send(nfts.data);
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
