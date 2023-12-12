import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { postApi } from "api/api";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { setLoading } from "reducers/isLoading";

export default function ContactCard({ data,setChange }) {
  const [message,setMessage]=useState()
  const alert=useAlert()
  const dispatch=useDispatch()
  return (
    <div className="my-3  rounded-md bg-white p-4 shadow-sm dark:bg-blueSecondary dark:text-white">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div>
          <p className="mediumText">{data?.name}</p>
          <p>{data?.email}</p>
          <p>{data?.phone}</p>
        </div>
        <div>
          <p className="mediumText">{data?.title}</p>
          <p>{data?.description}</p>
          <p className="text-gray-400">{new Date(data.date).toDateString()}</p>
        </div>
      </div>
      <div></div>
      {!data?.replied && (
        <Accordion allowToggle={true}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Button colorScheme="blackAlpha">Replay Text Message</Button>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Textarea value={message} onChange={e=>setMessage(e.target.value)} type="text" placeholder="Write message..." />
              <div className="mt-4 flex justify-end">
                <Button onClick={async()=>{
                  if(!message){
                    return alert.info("Message is required")
                  }
                  dispatch(setLoading(true))
                  postApi("/support/replay",{
                    supportId:data.id,
                    message:message
                  }).then(res=>{
                    setChange(res.data)
                    dispatch(setLoading(false))
                    alert.success("Replay sended")
                  }).catch(e=>{
                    dispatch(setLoading(false))
                    alert.error(e.response.data.message)
                  })
                }} colorScheme="cyan">Send</Button>
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
