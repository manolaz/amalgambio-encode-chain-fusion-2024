import logo from '@/assets/images/AmalgamBio.jpg';
import { ConnectButton } from '@particle-network/connectkit';
import Image from 'next/image';
import Link from 'next/link';

import styles from './index.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles['nav-start']}>
          <div className={styles['nav-start-slogan']}>AmalgamBio: healthcare social network</div>
          <Image src={logo} width={36} height={36} alt='logo'></Image>
        </div>
        <div className={styles['nav-content']}>
          <Link
            href='https://developers.particle.network/guides/wallet-as-a-service/waas/connect/web-quickstart'
            target='_blank'
          >
            <div className={styles['nav-item']}>Docs</div>
          </Link>
        </div>
        <div className={styles['nav-end']}>
          <ConnectButton />
        </div>
      </nav>
    </header>
  );
}
