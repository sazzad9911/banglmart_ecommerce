import axios from "axios";
import { v4 } from "uuid";
const bkash_username = "sandboxTokenizedUser02";
const bkash_password = "sandboxTokenizedUser02@12345";
const bkash_api_key = "4f6o0cjiki2rfm34kfdadl1eqq";
const bkash_secret_key = "2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b";

const bkash={}
const createPayment = async (token, amount, ref, url) => {
  const urls ="https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token,
    "X-App-Key": bkash_api_key,
  };
  const { data } = await axios.post(
    urls,
    {
      mode: "0011",
      payerReference: ref,
      callbackURL: url,
      amount: amount,
      currency: "BDT",
      intent: "sale",
      merchantInvoiceNumber: "Inv" + v4().substring(0, 5),
    },
    {
      headers: headers,
    }
  );
  return data;
};
const executePayment = async (token, paymentID) => {
	const urls ="https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/execute";
	const headers = {
	  Accept: "application/json",
	  Authorization: token,
	  "x-app-key": bkash_api_key,
	};
	const { data } = await axios.post(
	  urls,
	  {
		paymentID:paymentID
	  },
	  {
		headers: headers,
	  }
	);
	return data;
  };
bkash.createPayment=createPayment;
bkash.executePayment=executePayment;
export default bkash;