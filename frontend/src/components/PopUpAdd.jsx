import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { putApi } from "../apis";

const PopUpAdd = ({ setAdds }) => {
  const url = "https://banglamartecommerce.com.bd";

  const [addImages, setAddImages] = useState(null);
  const [image, setImage] = useState(null);
  const [ids, setId] = useState(null);
  useEffect(() => {
    let addId = [];
    const visitorId = localStorage.getItem("visitorId");
    const fetchAdds = async () => {
      try {
        const response = await fetch(`${url}/adds/get?visitorId=${visitorId}`);
        const data = await response.json();
        setAddImages(data.data);
        setImage(data.data[0]);
        data.data.map((data) => addId.push(data.id));
        setId(addId);
      } catch (error) {
        setAdds(false);
        console.error("Error fetching instructor classes:", error);
      }
    };

    fetchAdds();
  }, []);
  useEffect(() => {
    if (addImages?.length > 0) {
      setAdds(true);
    }
  }, [addImages]);

  // console.log(ids);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const showNextImage = () => {
    const visitorId = localStorage.getItem("visitorId");
    // console.log(image);
    putApi(
      "/adds/close",
      {
        addId: image.id,
        visitorId: visitorId,
      },
      null
    );
    if (currentIndex < addImages?.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setImage(addImages[currentIndex + 1]);
    } else {
      setButtonDisabled(true);
      setAdds(false);
    }
  };

  const handleClearAdds = () => {
    const visitorId = localStorage.getItem("visitorId");
    putApi(
      "/adds/closeAll",
      {
        addId: ids,
        visitorId: visitorId,
      },
      null
    )
      .then(() => {
        setAdds(false);
      })
      .catch(() => {
        setAdds(false);
      });
  };
  if (addImages?.length == 0) {
    setAdds(false);
  }
  return (
    <div className="flex items-center justify-center h-screen fixed bg-SubTextColor w-screen z-40 bg-opacity-80">
      <motion.div
        animate={{
          scale: [1, 1.5, 1.5, 1, 1],
          rotate: [0, 0, 270, 270, 0],
        }}
        style={{
          clipPath:
            "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)",
        }}
        className=""
      >
        {addImages ? (
          <Link to={`/productDetails/${image?.productId}`}>
            <img
              className="h-[30vw] w-[60vw]"
               
              src={`${url}${image?.image}`}
              alt={`Image ${currentIndex}`}
            />
          </Link>
        ) : (
          <div className="flex justify-center items-center p-10">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        )}
      </motion.div>
      <div className="flex flex-col h-[30vw] justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          onClick={showNextImage}
          disabled={buttonDisabled}
          className="btn-sm lg:btn btn-info rounded-full text-2xl text-CardColor"
        >
          X
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          className="text-CardColor btn-sm lg:btn btn-info rounded-full"
          onClick={handleClearAdds}
        >
          Clear All
        </motion.button>
      </div>
    </div>
  );
};

export default PopUpAdd;
