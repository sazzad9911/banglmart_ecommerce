import AllCategory from "../../../components/AllCategories";
import Banner from "../../../components/Banner";
import BrandSlider from "../../../components/BrandSlider";

const TopBannerSection = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-4 pt-[16px]">
        <div className="hidden lg:col-span-1 lg:block">
          <AllCategory></AllCategory>
        </div>
        <div className="col-span-4 lg:col-span-3 p-1 lg:p-0">
          <Banner></Banner>
          <div className="mt-4">
            <BrandSlider></BrandSlider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBannerSection;
