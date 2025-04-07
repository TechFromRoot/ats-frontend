import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// Define the types for the initial response and modified response
type TokenDetails = {
  tokenName: string;
  tokenSymbol: string;
  totalSupply: string;
  decimals: string;
  exchangeName: string;
  pairLabel: string;
  price: number;
  marketCap: number;
  isHoneyPot: string;
};

type InitialResponse = {
  AIresponse: string;
  tokenDetails: TokenDetails;
  error?: string;
};

type SocialsData = {
  website?: string;
  dex?: string;
  pump?: string;
  socials?: [
    {
      type: string;
      url: string;
    }
  ];
  imageUrl?: string;
};

export type ModifiedResponse = InitialResponse & {
  socialsData?: SocialsData;
};

export const getTokenInfo = async (
  contract: string
): Promise<ModifiedResponse> => {
  try {
    // Fetch token information from your API
    // const response = await fetch("https://ats-agent.onrender.com/scanner", {
    const response = await fetch("https://ats-backend-pink.vercel.app/scanner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contract }),
    });

    // Check if the response is ok
    if (!response.ok) {
      return {
        AIresponse: "Error fetching token info Not Found",
        tokenDetails: {
          tokenName: "",
          tokenSymbol: "",
          totalSupply: "",
          decimals: "",
          exchangeName: "",
          pairLabel: "",
          usdPrice: 0,
          marketCap: 0,
          isHoneyPot: "",
        },
        socialsData: {
          website: undefined,
          socials: undefined,
          imageUrl: undefined,
        },
      };
    }

    const initialData: InitialResponse = await response.json();

    // Fetch additional data from Dexscreener or another API
    const dexResponse = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${contract}`
    );

    const dexData = await dexResponse.json();

    console.log("dex", initialData, dexData);

    // Extract relevant data (modify based on actual Dexscreener API response)
    const socialsData: SocialsData = {
      pump: `https://pump.fun/coin/${contract}`,
      dex: `https://dexscreener.com/${dexData?.pairs[0]?.chainId}/${contract}`,
      website: dexData?.pairs[0]?.info?.websites[0]?.url || undefined,
      socials: dexData?.pairs[0]?.info?.socials || undefined,
      imageUrl: dexData?.pairs[0]?.info?.imageUrl || undefined,
    };

    // Combine initial response with additional data
    const modifiedResponse: ModifiedResponse = {
      ...initialData,
      socialsData,
    };

    return modifiedResponse;
  } catch (error) {
    console.error("Error fetching token info or additional data:", error);

    // Return a default structure with error details
    return {
      AIresponse: "",
      tokenDetails: {
        tokenName: "",
        tokenSymbol: "",
        totalSupply: "",
        decimals: "",
        exchangeName: "",
        pairLabel: "",
        usdPrice: 0,
        marketCap: 0,
        isHoneyPot: "",
      },
      socialsData: {
        website: undefined,
        socials: undefined,
        imageUrl: undefined,
      },
    };
  }
};
