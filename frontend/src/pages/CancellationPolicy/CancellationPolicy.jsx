import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";


const CancellationPolicy = () => {
    const { t } = useTranslation();

    return (
        <div className="container mx-auto bg-CardColor p-4 m-4">
            <Helmet>
        <title>Cancellation Policy | Banglamart E-commerce</title>
      </Helmet>
            <div>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("CancellationPolicy.CancellationPolicyTitle")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("CancellationPolicy.CancellationPolicyDescription")}</p> 
            </div>
        </div>
    );
};

export default CancellationPolicy;