import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating";

const ReviewSection = ({ reviews }) => {
  const url = "https://api.banglamartecommerce.com.bd"; 

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-4">
        {reviews.map((review) => (
          <div
            key={review?.id}
            className="bg-CardColor rounded-lg shadow-md p-4 flex flex-col justify-center items-center"
          >
             <div className="mb-2">
             <Rating
                initialRating={review?.rate}
                readonly
                emptySymbol={
                  <AiOutlineStar className="text-[14px] text-BorderColor" />
                }
                fullSymbol={
                  <AiFillStar className="text-[14px] text-MainColor" />
                }
              />
            </div>
            <p className="text-lg font-semibold">
              {review?.message}
            </p>
            <p className="text-gray-700 mt-2">
              By: {review?.user.name}
            </p>
            <img
            src={`${url}${review?.user.image}`}
             
              alt={review?.user.name}
              className="w-12 h-12 rounded-full mt-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
