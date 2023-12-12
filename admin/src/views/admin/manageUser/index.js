import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import UserList from "./UserList";
import ShopList from "./ShopList";
import BrandList from "./BrandList";
import AddShop from "./AddShop";
import AddBrand from "./AddBrand";
import { useSelector } from "react-redux";
import MyShopList from "./MyShopList";
import MyBrandList from "./MyBrandList";

export default function ManageUsers() {
  const user = useSelector((state) => state.user);
  return (
    <div className="p-4 dark:text-white">
      <Tabs>
        <TabList>
          {user && user?.user?.role === 4 && <Tab>User List</Tab>}
          <Tab>My Shop List</Tab>
          <Tab>My Brand List</Tab>
          {user && user?.user?.role === 4 && <Tab>All Shops</Tab>}
          {user && user?.user?.role === 4 && <Tab>All Brands</Tab>}
        </TabList>

        <TabPanels>
          {user && user?.user?.role === 4 && (
            <TabPanel>
              <UserList />
            </TabPanel>
          )}
          <TabPanel>
            <MyShopList/>
          </TabPanel>
          <TabPanel>
           <MyBrandList/>
          </TabPanel>
          {user && user?.user?.role === 4 && (
            <TabPanel>
              <ShopList />
            </TabPanel>
          )}
          {user && user?.user?.role === 4 && (
            <TabPanel>
              <BrandList />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </div>
  );
}
