import { useEffect } from "react";
import { getApi } from "../../apis";
import { useState } from "react";
import EmptyContent from "../../components/EmptyContent";


const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  // console.log(notifications);
  useEffect(() => {
    const token = localStorage.getItem("token");
    getApi("/notification/read", token).then((response) => {
      setNotifications(response.data.data);
    });
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Notifications</h1>
      <div className="space-y-4">
        {notifications.length > 0
          ? notifications?.map((notification) => (
              <div
                key={notification.id}
                className="bg-CardColor p-4 rounded-lg shadow-md flex items-center justify-between"
              >
                <div>
                  <p className="text-lg">{notification.message}</p>
                  <p className="text-SubTextColor text-sm">{notification.date}</p>
                </div>
                {/* <button className="text-red-500">Read</button> */}
              </div>
            ))
          : (<EmptyContent text={"No notification found!"}></EmptyContent>)}
      </div>
    </div>
  );
};

export default NotificationPage;
