import axios from "axios";
import { v4 } from "uuid";
import FormData from'form-data'

export const createPayment = async (
  amount,
  name,
  title,
  email,
  phone,
  successUrl,
  failedUrl,
  cancelUrl
) => {
  const env = process.env;
  const form = new FormData();
  form.append("store_id", "aamarpaytest");
  form.append("signature_key", "dbb74894e82415a2f7ff0ec3a97e4183");
  form.append("tran_id", v4());
  form.append("amount",amount);
  form.append("currency","BDT");
  form.append("desc",title);
  form.append("cus_name",name);
  form.append("cus_email",email);
  form.append("cus_phone",phone);
  form.append("success_url",successUrl);
  form.append("fail_url",failedUrl);
  form.append("cancel_url",cancelUrl);
  form.append("type", "json");
  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://sandbox.aamarpay.com",
    
    data: form,
  };
  const { data } = await axios(config);
  return data;
};
