import axios from "axios";
import { StatusCodes } from "http-status-codes";
const url =
  "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant";
const config = process.env;
const bkash_username = "sandboxTokenizedUser02";
const bkash_password = "sandboxTokenizedUser02@12345";
const bkash_api_key = "4f6o0cjiki2rfm34kfdadl1eqq";
const bkash_secret_key = "2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b";

const bkashMiddleware = async (req, res, next) => {
  try {
    const { data } = await axios.post(
      url,
      {
        app_key: bkash_api_key,
        app_secret: bkash_secret_key,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: bkash_username,
          password: bkash_password,
        },
      }
    );

    if (data.statusCode == "0000") {
      req.bkashToken = data.id_token;
      return next();
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: data.statusMessage });
    }
  } catch (e) {
    res.status(StatusCodes.BAD_GATEWAY).json({ message: e.message });
  }
};
export default bkashMiddleware;
