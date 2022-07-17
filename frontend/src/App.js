import "./App.css";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import Calendar from "./components/Calendar";
import { useEffect, useState } from "react";

const { chains, provider } = configureChains(
  [chain.rinkeby],
  [
    alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});


function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      // if (!ethereum) {
      //   console.log("Metamask not found");
      //   return;
      // }
      // let chainId = await ethereum.request({ method: 'eth_chainId' });
      // console.log('Connected to chain: ' + chainId);

      // const rinkebyChainId = '0x4';

      // if (chainId !== rinkebyChainId) {
      //   alert('You are not connected to the Rinkeby Testnet!');
      //   setCorrectNetwork(false);
      //   return;
      // } else {
      //   setCorrectNetwork(true);
      // }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      console.log("Found Account", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error connecting to Metamask", error);
    }
  }

  useEffect(() => {
    connectWallet();
  })
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ConnectButton showBalance={false} />
        <div className="main">

        </div>
      </RainbowKitProvider>
    </WagmiConfig>
   
  );
}

export default App;
