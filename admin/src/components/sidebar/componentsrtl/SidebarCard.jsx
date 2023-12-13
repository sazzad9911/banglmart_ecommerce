import { useSelector } from "react-redux";
import logo from "assets/img/avatars/logo.png"

const FreeCard = () => {
  const user=useSelector(state=>state.user)
  return (
    <div className="relative mt-14 mb-5 flex w-[256px] justify-center rounded-[20px] bg-gradient-to-br from-[#868CFF] via-[#132486] to-brand-500 pb-4">
      <div className="absolute -top-12 flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-white bg-gradient-to-b from-[#3075ff] to-gray-900 dark:!border-navy-800">
        <img src={logo}/>
      </div>

      <div className="mt-16 flex h-fit flex-col items-center">
        <p className="text-lg font-bold text-white">{user?.user?.role==4?"Mother":user?.user?.role===3?"Brand":"Seller"} Admin</p>
        <p className="mt-1 px-4 text-center text-sm text-white">
          Your product house is for store products, categories and many more to decorate your store and take it to the public
        </p>

        
      </div>
    </div>
  );
};

export default FreeCard;
