import {
  getWalletConnectConnector
} from "./chunk-3EC5YRTY.js";
import {
  isAndroid
} from "./chunk-KHDDZZDB.js";

// src/wallets/walletConnectors/omniWallet/omniWallet.ts
var omniWallet = ({ chains }) => ({
  id: "omni",
  name: "Omni",
  iconUrl: async () => (await import("./omniWallet-VZCGVXJE.js")).default,
  iconBackground: "#000",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=fi.steakwallet.app",
    ios: "https://itunes.apple.com/us/app/id1569375204",
    qrCode: "https://omniwallet.app.link"
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ chains });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return isAndroid() ? uri : `https://links.steakwallet.fi/wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: "https://omni.app/support",
          steps: [
            {
              description: "Add Omni to your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the Omni app"
            },
            {
              description: "Create a new wallet or import an existing one.",
              step: "create",
              title: "Create or Import a Wallet"
            },
            {
              description: "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect.",
              step: "scan",
              title: "Tap the QR icon and scan"
            }
          ]
        }
      }
    };
  }
});

export {
  omniWallet
};
