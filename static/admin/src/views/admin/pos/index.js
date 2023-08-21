import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useState } from "react";
import OrderCart from "./OrderCart";

export default function POS() {
  const [detailsClick,setDetailsClick]=useState()
  
  return (
    <Tabs>
      <TabList>
        <Tab>On going</Tab>
        <Tab>Cancelled</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <OrderCart />
          <OrderCart />
          <OrderCart />
        </TabPanel>
        <TabPanel>
          <OrderCart />
          <OrderCart />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
