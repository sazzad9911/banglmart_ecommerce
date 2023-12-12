import { Select } from "@chakra-ui/react";
import NoData from "components/NoData";
import CardPagination from "layouts/pagination/CardPagination";
import Nothing from "Nothing";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatScreen from "./ChatScreen";
import CommentsCard from "./CommentsCard";
import MessageCard from "./MessageCard";
import { setAllConversation } from "reducers/multiple";
import { getApi } from "api/api";
import { setLoading } from "reducers/isLoading";
import { useLocation, useNavigate } from "react-router-dom";

export default function FeedBack() {
  const [messageId, setMessageId] = useState();
  const allComment = useSelector((state) => state.allComment);
  const user = useSelector((state) => state.user);
  const dispatch=useDispatch()
  const allConversation = useSelector((state) => state.allConversation);
  const location = useLocation();
  const navigate=useNavigate()
  //console.log(allConversation);
  useEffect(()=>{
    const allConversation = async () => {
      dispatch(setLoading(true))
      const res = await getApi("/message/get", user.token);
      dispatch(setAllConversation(res.data.data));
      dispatch(setLoading(false))
    };
    allConversation()
  },[])

  
  return (
    <div className="p-4 dark:text-white">
      <div className="gap-4 lg:grid lg:grid-cols-2">
        <div>
          <h1 className="headLine mb-4">Customers Comments ({allComment?.length})</h1>
          {/* <CommentsCard replied={`industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it `}/>
          <CommentsCard/> */}
          <Select placeholder="Sort By">
            <option>Un Replied</option>
            <option>Replied</option>
          </Select>
          <CardPagination
            data={allComment}
            itemsPerPage={2}
            ROW={(d) => <CommentsCard data={d.data} key={d.index} />}
          />
          {allComment?.length===0&&(
            <NoData/>
          )}
        </div>
        <div>
          <h1 className="headLine mb-4">Customers Messages({allConversation?.length})</h1>
          <Select placeholder="Sort By">
            <option>Un Replied</option>
            <option>Replied</option>
          </Select>
          <CardPagination
            data={allConversation}
            itemsPerPage={9}
            ROW={(d) => (
              <MessageCard data={d.data}
                onClick={() => {
             
                  navigate(`${location.pathname}/view?id=${d.data.id}`)
                }}
                key={d.index}
              />
            )}
          />
          {allConversation?.length===0&&(
            <NoData/>
          )}
        </div>
      </div>
    </div>
  );
}
