import { useSelector } from "react-redux";
import logo from "assets/img/avatars/logo.png"

const FreeCard = () => {
  const user=useSelector(state=>state.user)
  return (
    <div className="relative mt-14 flex w-[256px] justify-center rounded-[20px] bg-gradient-to-br from-[#868CFF] via-[#132486] to-brand-500 pb-4">
      <div className="absolute -top-12 flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-white bg-gradient-to-b from-[#3075ff] to-gray-900 dark:!border-navy-800">
        <img src={logo}/>
      </div>

      <div className="mt-16 flex h-fit flex-col items-center">
        <p className="text-lg font-bold text-white">{user?.user?.role==4?"Mother":user?.user?.role===3?"Brand":"Seller"} Admin</p>
        <p className="mt-1 px-4 text-center text-sm text-white">
          This is the simplest version of mother panel. The version released 1.0.0 initial. Farther development--
        </p>

        <a
          target="blank"
          className="text-medium mt-7 block rounded-full bg-gradient-to-b from-white/50 to-white/10 py-[12px] px-11 text-center text-base text-white hover:bg-gradient-to-b hover:from-white/40 hover:to-white/5 "
          href="https://horizon-ui.com/pro?ref=live-free-tailwind-react"
        >
          Contact BANGLAMART
        </a>
      </div>
    </div>
  );
};

export default FreeCard;
