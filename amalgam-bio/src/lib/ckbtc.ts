// src/lib/ckbtc.ts
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./ckbtc_idl"; // Import the ckBTC IDL file
import { Principal } from "@dfinity/principal";

const canisterId = process.env.NEXT_PUBLIC_CKBTC_CANISTER_ID!;
const host = process.env.NEXT_PUBLIC_IC_HOST!;

// Create ckBTC Actor
export const createCkBTCActor = (identity?: any) => {
  const agent = new HttpAgent({ host, identity });
  if (process.env.NODE_ENV !== "production") {
    agent.fetchRootKey(); // Necessary for local development
  }
  return Actor.createActor(idlFactory, { agent, canisterId });
};

// Helper function to get ckBTC balance
export const getCkBTCBalance = async (principal: Principal) => {
  const actor = createCkBTCActor();
  const balance = await actor.account_balance({
    account: principal.toText(),
  });
  return balance;
};

// Helper function to send ckBTC
export const transferCkBTC = async (
  fromAccount: string,
  toAccount: string,
  amount: bigint,
  fee: bigint
) => {
  const actor = createCkBTCActor();
  const result = await actor.transfer({
    from_subaccount: null,
    to: toAccount,
    amount,
    fee,
    memo: 0n,
  });
  return result;
};
