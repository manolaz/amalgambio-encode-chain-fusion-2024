'use client';

import ContractInteraction from '@/components/demo/modules/ContractInteraction';
import Divider from '@/components/demo/modules/Divider';
import SendNativeToken from '@/components/demo/modules/SendNativeToken';
import SignMessage from '@/components/demo/modules/SignMessage';
import SignTypedData from '@/components/demo/modules/SignTypedData';
import { ContextProvider } from '@/components/demo/store/useGlobalState';


import styles from './index.module.css';

export default function AmalgamDappOverview() {
  return (
    <ContextProvider>
      <div className={styles.demo}>
        <h1>Amalgam DApp</h1>
        <p>
          Amalgam is a decentralized application (DApp) designed to revolutionize the way healthcare professionals share and manage Electronic Medical Records (EMRs). Our mission is to empower secure data sharing, simplify interactions across multiple blockchains, and enhance user experience.
        </p>
        <SendNativeToken />
        <Divider />
        <SignMessage activeIndex={2} />
        <Divider />
        <SignTypedData />
        <Divider />
        <ContractInteraction />
      </div>
    </ContextProvider>
  );
}
