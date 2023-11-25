import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
    const { t } = useTranslation();

    return (
        <div className="container mx-auto bg-CardColor p-4 m-4">
            <Helmet>
        <title>Privacy Policy | Banglamart E-commerce</title>
      </Helmet>
            <div>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("PrivacyPolicy.preamble")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("PrivacyPolicy.preambleContent")}</p> 
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("PrivacyPolicy.informationTypeCollected")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("PrivacyPolicy.informationTypeCollectedContent")}</p> 
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("PrivacyPolicy.personalInformation")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("PrivacyPolicy.personalInformationContent")}</p> 
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("PrivacyPolicy.collectionGateway")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("PrivacyPolicy.collectionGatewayContent")}</p> 
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("PrivacyPolicy.scopeAndUsage")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("PrivacyPolicy.scopeAndUsageContent")}</p> 
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("PrivacyPolicy.disclosureScopes")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("PrivacyPolicy.disclosureScopesContent")}</p> 
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("PrivacyPolicy.accessAndManagement")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("PrivacyPolicy.accessAndManagementContent")}</p> 
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("PrivacyPolicy.optingOut")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("PrivacyPolicy.optingOutContent")}</p> 
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("PrivacyPolicy.crossBorderDisclosure")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("PrivacyPolicy.crossBorderDisclosureContent")}</p> 
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("PrivacyPolicy.whereToContact")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("PrivacyPolicy.whereToContactContent")}</p> 
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("PrivacyPolicy.banglamartWebsite")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("PrivacyPolicy.banglamartWebsiteContent")}</p> 
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("PrivacyPolicy.miscellaneous")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("PrivacyPolicy.miscellaneousContent")}</p> 
                
            </div>
        </div>
    );

};

export default PrivacyPolicy;