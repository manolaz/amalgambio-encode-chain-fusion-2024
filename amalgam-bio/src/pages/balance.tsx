// pages/balance.tsx
import { useEffect, useState } from "react";
import { getCkBTCBalance } from "../src/lib/ckbtc";
import { Principal } from "@dfinity/principal";

const BalancePage: React.FC = () => {
    const [balance, setBalance] = useState<bigint | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            const principal = Principal.fromText("your-principal-id"); // Replace with the actual principal ID
            const balance = await getCkBTCBalance(principal);
            setBalance(balance);
        };
        fetchBalance();
    }, []);

    return (
        <div>
            <h1>Your ckBTC Balance</h1>
            {balance !== null ? <p>{balance.toString()} ckBTC</p> : <p>Loading...</p>}
        </div>
    );
};

export default BalancePage;
