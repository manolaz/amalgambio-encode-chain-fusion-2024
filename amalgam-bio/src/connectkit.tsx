'use client';

import React from 'react';

import { ConnectKitProvider, createConfig } from '@particle-network/connectkit';
import { authWalletConnectors } from '@particle-network/connectkit/auth';
import type { Chain } from '@particle-network/connectkit/chains';
// embedded wallet start
import { EntryPosition, wallet } from '@particle-network/connectkit/wallet';
// embedded wallet end
// aa start
import { aa } from '@particle-network/connectkit/aa';
// aa end
// evm start
import { solana, arbitrum, base, lineaSepolia, mainnet, polygon, sepolia, baseSepolia, arbitrumSepolia, avalancheFuji, bscTestnet, optimismSepolia, polygonAmoy, arbitrumNova } from '@particle-network/connectkit/chains';
import { evmWalletConnectors } from '@particle-network/connectkit/evm';
// evm end

import { injected as solaInjected, solanaWalletConnectors } from '@particle-network/connectkit/solana';


const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY as string;
const appId = process.env.NEXT_PUBLIC_APP_ID as string;
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

if (!projectId || !clientKey || !appId) {
  throw new Error('Please configure the Particle project in .env first!');
}

const supportChains: Chain[] = [];
// evm start
supportChains.push(mainnet, base, arbitrum, polygon, lineaSepolia);
// evm end


const config = createConfig({
  projectId,
  clientKey,
  appId,
  appearance: {
    recommendedWallets: [
      { walletId: 'metaMask', label: 'Recommended' },
      { walletId: 'coinbaseWallet', label: 'Popular' },
    ],
    logo: 'https://amalgamenergy.com/Amalgam_energy_2.png',
    language: 'en-US',
    mode: 'dark'
  },
  walletConnectors: [
    authWalletConnectors(),
    // evm start
    evmWalletConnectors({
      // TODO: replace it with your app metadata.
      metadata: {
        name: 'Amalgam Bio',
        icon: typeof window !== 'undefined' ? `${window.location.origin}/favicon.ico` : '',
        description: 'Secure sharing of Electronic Medical Records (EMR) on the blockchain.',
        url: typeof window !== 'undefined' ? window.location.origin : '',
      },
      walletConnectProjectId: walletConnectProjectId,
    }),
    // evm end
    solanaWalletConnectors({
      connectorFns: [solaInjected({ target: "phantom" })],
    }),

  ],
  plugins: [
    // embedded wallet start
    wallet({
      visible: true,
      entryPosition: EntryPosition.BR,
    }),
    // embedded wallet end

    // aa config start
    aa({
      name: 'BICONOMY',
      version: '2.0.0',
    }),
    // aa config end

  ],
  chains: [mainnet, solana, arbitrum, base, lineaSepolia, polygon, sepolia, baseSepolia, arbitrumSepolia, avalancheFuji, bscTestnet, optimismSepolia, polygonAmoy, arbitrumNova],
});

// Wrap your application with this component.
export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
