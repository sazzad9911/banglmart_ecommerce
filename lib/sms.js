import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export const sendSMS = async (number,message) => {
  const res = await axios.post(
    "https://smsplus.sslwireless.com/api/v3/send-sms",
    {
      api_token: "paf0qhmw-nbtb77cj-zucikefq-ep3r8c8o-n7mok1w6",
      sid: "BANGLAMARTOTP",
      msisdn: `88${number}`,
      sms: message,
      csms_id: uuidv4(),
    }
  );
  if(res.data.status_code===200){
    return true
  }
  return false;
};
