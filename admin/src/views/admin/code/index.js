import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PromoCode from "./PromoCode";
import CouponCode from "./CouponCode";
import SpecialMember from "./SpecialMember";
import { useSelector } from "react-redux";

export default function OfferCodes() {
  const user = useSelector((state) => state.user);
  //console.log(user.user.role);
  return (
    <div className="p-4 dark:text-white">
      <Tabs>
        <TabList>
          {user.user.role === 4 && <Tab>Promo Code</Tab>}
          <Tab>Coupon Code</Tab>
          {user.user.role === 4 && <Tab>Special Member</Tab>}
        </TabList>

        <TabPanels>
          {user.user.role === 4 && (
            <TabPanel>
              <PromoCode />
            </TabPanel>
          )}

          <TabPanel>
            <CouponCode />
          </TabPanel>
          {user.user.role === 4 && (
            <TabPanel>
              <SpecialMember />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </div>
  );
}
