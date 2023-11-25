import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const SellerPolicy = () => {
  const { t } = useTranslation();

    return (
        <div className="container mx-auto bg-CardColor p-4 m-4">
            <Helmet>
        <title>Seller Policy | Banglamart E-commerce</title>
      </Helmet>
            <div>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("sellerPolicy.sellerPolicyTitle")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("sellerPolicy.sellerPolicyDescription")}</p> <br />
                <Link className="btn btn-primary" to='/login'>Click here for Login</Link> <br /> <br />
                <Link className="btn btn-primary" to='/'>Click here for Become a Seller</Link>
            </div>
        </div>
    );
};

export default SellerPolicy;