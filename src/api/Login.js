import { toast } from "react-toastify";
import { getAdmin } from "../api/AdminStats";

const { ethereum } = window;

export const handleRPCWalletLogin = async () => {

  try {
    if (typeof ethereum !== "undefined") {
      const userAddress = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (ethereum.isMetaMask)
        console.log(
          "Metamask Says: Other EVM Compatible Wallets not detected!"
        );
      else
        console.log(
          "Metamask Says: Other EVM Compatible wallets maybe installed!"
        );

      if (userAddress[0]) {
        return await getAdmin(userAddress[0])
      }
    } else alert("Metamask is not installed!");
  } catch (error) {
    console.error(error);
  }
};
