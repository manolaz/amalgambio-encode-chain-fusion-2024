// src/lib/ckbtc_idl.ts
export const idlFactory = ({ IDL }: any) => {
    return IDL.Service({
      account_balance: IDL.Func(
        [{ account: IDL.Text }],
        [IDL.Nat],
        ["query"]
      ),
      transfer: IDL.Func(
        [
          IDL.Record({
            from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
            to: IDL.Text,
            amount: IDL.Nat,
            fee: IDL.Nat,
            memo: IDL.Nat,
          }),
        ],
        [IDL.Variant({ Ok: IDL.Nat, Err: IDL.Text })],
        []
      ),
    });
  };
  