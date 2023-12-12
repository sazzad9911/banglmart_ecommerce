import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Box,
  Textarea,
  Avatar,
} from "@chakra-ui/react";
import { url } from "api/authApi";
import { putApi } from "api/api";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "reducers/isLoading";
import { setChange } from "reducers/change";
import { useAlert } from "react-alert";

export default function CommentsCard({ replied, data }) {
  //console.log(data);
  const [message, setMessage] = useState();
  const user=useSelector(state=>state.user)
  const dispatch=useDispatch()
  const alert=useAlert()
  return (
    <div className="my-4 rounded-md border px-4 py-2 dark:text-white">
      <div className="sm:grid-col-1 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <div>
          <p className="mediumText mb-2">About Product</p>
          <div className="flex items-center">
            <img
              crossOrigin={"anonymous"}
              className="h-16 w-16 rounded-md"
              src={`${url}${data.product.thumbnail}`}
              alt={"product"}
            />
            <div className="line-3 ml-2">{data.product.title}</div>
          </div>
        </div>
        <div>
          <p className="mediumText mb-2">About Buyer</p>
          <div className="flex items-center">
            <Avatar
              className="h-16 w-16 rounded-full"
              src={`${url}${data.user.image}`}
              alt={"product"}
            />
            <div className="ml-2 ">
              <p className="line-2">{data.user.name}</p>
              <p className="text-gray-500">
                {data.user?.phone || data?.user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="my-2 flex items-center justify-between">
          <p className="mediumText">Customer FeedBack</p>
          <p className=" text-[12px] text-blue-500">
            {new Date(data.date).toDateString()}
          </p>
        </div>
        <div>
          <div className="flex items-center">
            {data.image && (
              <img
                crossOrigin={"anonymous"}
                className="h-16 w-16 rounded-md"
                src={`${url}${data.image}`}
                alt={"product"}
              />
            )}
            <div className="line-3 ml-2">{data.message}</div>
          </div>
        </div>
      </div>
      {data.replay ? (
        <div>
          <p className="font-bold">Replay</p>
          <div className="mt-1 rounded-md bg-gray-200 px-2 py-1 dark:bg-gray-900">
            {data.replay}
          </div>
        </div>
      ) : (
        <Accordion
          allowToggle
          style={{
            marginTop: 5,
          }}
          reduceMotion={false}
        >
          <AccordionItem isFocusable={false}>
            <h2>
              <AccordionButton>
                <Box flex={"1"}>Replay</Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={2}>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write here"
              />
              <Button
                onClick={() => {
                  dispatch(setLoading(true))
                  putApi(
                    "/comment/replay",
                    {
                      message: message,
                      commentId: data.id,
                    },
                    user.token
                  ).then(res=>{
                    dispatch(setChange(res.data))
                    dispatch(setLoading(false))
                  }).catch(e=>{
                    dispatch(setLoading(true))
                    alert.error(e.response.data.message)
                  })
                }}
                colorScheme={"cyan"}
                className="mt-2"
              >
                Send
              </Button>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
