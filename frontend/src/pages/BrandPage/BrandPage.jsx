import { Helmet } from "react-helmet";
import BrandCart from "../../components/BrandCart";
import EmptyContent from "../../components/EmptyContent";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const BrandPage = () => {
  const {t}=useTranslation()
  const brands = useSelector((state) => state.brand.brand.data);
 
  return (
    <div className="container mx-auto ">
      <Helmet>
        <title>Brand | Banglamart E-commerce</title>
      </Helmet>

      <div className="bg-CardColor p-4 lg:p-10 mt-4">
        <h1 className=" mb-4 text-SubTextColor">{t("choseBrand")}</h1>
        <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2">
          {brands?.length>0? (
            brands?.map((data, i) => (
              <BrandCart data={data} key={i}></BrandCart>
            ))
          ) : (
            <EmptyContent text="Currently no brand available!!"></EmptyContent>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandPage;
