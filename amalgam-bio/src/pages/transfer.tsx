// pages/transfer.tsx
import { useState } from "react";
import { transferCkBTC } from "../src/lib/ckbtc";

const TransferPage: React.FC = () => {
    const [toAccount, setToAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("");

    const handleTransfer = async () => {
        try {
            setStatus("Processing...");
            const amountBigInt = BigInt(amount);
            const fee = BigInt(10_000); // Set transaction fee
            const result = await transferCkBTC(
                "your-account-id", // Replace with the sender's account
                toAccount,
                amountBigInt,
                fee
            );
            if ("Ok" in result) {
                setStatus(`Success: Transaction ID ${result.Ok}`);
            } else {
                setStatus(`Error: ${result.Err}`);
            }
        } catch (error) {
            console.error(error);
            setStatus("An error occurred during the transfer.");
        }
    };

    return (
        <div>
            <h1>Transfer ckBTC</h1>
            <input
                type="text"
                placeholder="Recipient Account"
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleTransfer}>Transfer</button>
            <p>{status}</p>
        </div>
    );
};

export default TransferPage;
