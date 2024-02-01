import axios from "axios";
import { StatusCodes } from "http-status-codes";

export const getGameList = async (req, res) => {
  try {
    const list = await axios.post(
      "https://stage.game-program.com/api/seamless/provider",
      {
        api_password: "3XKBmgmYXAKpcuVyQv",
        api_login: "40xbet_mc_s",
        method: "getGameList",
        show_additional: true,
        show_systems: 1,
        currency: "USD",
      }
    );
    //console.log(list.data);
    res.status(StatusCodes.OK).json(list.data);
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getGameListOffline = async (req, res) => {
  try {
    const list = await axios.post(
      "https://stage.game-program.com/api/seamless/provider",
      {
        api_password: "3XKBmgmYXAKpcuVyQv",
        api_login: "40xbet_mc_s",
        method: "getGameList",
        show_additional: true,
        show_systems: 1,
        currency: "USD",
      }
    );
    //console.log(list.data);
    res.status(StatusCodes.OK).json(list.data);
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
export const getGame = async (req, res) => {
  const {id}=req.params
  try {
    const list = await axios.post(
      "https://stage.game-program.com/api/seamless/provider",
      {
        api_password: "3XKBmgmYXAKpcuVyQv",
        api_login: "40xbet_mc_s",
        method: "getGame",
        lang: "EN",
        user_username: "sazzad",
        user_password: "sazzad#991",
        gameid: id,
        play_for_fun: 0,
        currency: "EUR",
      }
    );
    //console.log(list.data);
    res.status(StatusCodes.OK).json(list.data);
  } catch (e) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
  }
};
