import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Arcane Treasury',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'your-wallet-connect-project-id',
  chains: [sepolia],
  ssr: false,
});

export const chainId = import.meta.env.VITE_CHAIN_ID ? parseInt(import.meta.env.VITE_CHAIN_ID) : 11155111;
export const rpcUrl = import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/your-infura-key';