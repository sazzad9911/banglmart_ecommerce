import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React from "react";

export default function ContactCard() {
  return (
    <div className="my-3  rounded-md bg-white p-4 shadow-sm dark:bg-blueSecondary dark:text-white">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <div>
          <p className="mediumText">Md Sazzad Hossain</p>
          <p>mksa.sazzad@gmail.com</p>
          <p>+8801761143991</p>
        </div>
        <div>
          <p className="mediumText">New option need</p>
          <p>
            orem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem
          </p>
          <p className="text-gray-400">11 July 2023</p>
        </div>
      </div>
      <div></div>
      <Accordion allowToggle={true}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Button colorScheme="blackAlpha">Replay Text Message</Button>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Textarea type="text" placeholder="Write message..."/>
            <div className="flex justify-end mt-4">
                <Button colorScheme="cyan">Send</Button>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
