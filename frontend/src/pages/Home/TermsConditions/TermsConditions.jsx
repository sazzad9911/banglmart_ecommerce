import { useTranslation } from "react-i18next";

const TermsConditions = () => {
  const { t } = useTranslation();

    return (
        <div className="container mx-auto bg-CardColor p-4 m-4">
            <div>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.intro")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.introDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.condition")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.conditionDescriptions")}</p>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.conditionDescriptions(a)")}</p>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.conditionDescriptions(b)")}</p>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.conditionDescriptionsBottom")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.availabilityAndPricing")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.availabilityAndPricingDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.products")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.productsDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.accuracyAccount")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.accuracyAccountDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.discount")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.discountDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.license")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.licenseDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.personalInfo")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.personalInfoDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.ourSoftware")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.ourSoftwareDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.thirdPartyLinks")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.thirdPartyLinksDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.errors")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.errorsDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.orderCancellation")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.orderCancellationDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.prohibitedUsers")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.prohibitedUsersDescriptionTop")}</p>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.prohibitedUsersDescription(a)")}</p>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.prohibitedUsersDescription(b)")}</p>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.prohibitedUsersDescription(c)")}</p>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.prohibitedUsersDescription(d)")}</p>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.prohibitedUsersDescription(e)")}</p>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.prohibitedUsersDescription(f)")}</p>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.prohibitedUsersDescription(g)")}</p>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.prohibitedUsersDescription(h)")}</p>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.prohibitedUsersDescription(i)")}</p>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.prohibitedUsersDescription(j)")}</p>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.prohibitedUsersDescription(k)")}</p>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.prohibitedUsersDescriptionBottom")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.pricingOrderProcess")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.pricingOrderProcessDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.securityFraud")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.securityFraudDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.disclaimer")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.disclaimerDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.indemnification")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.indemnificationDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.severability")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.severabilityDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.termination")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.terminationDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.governingLaw")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.governingLawDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.termsService")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.termsServiceDescription")}</p>
                <h1 className="mt-4 mb-1 mr-4 text-TextColor">{t("termsCondition.contactInfo")}</h1>
                <p className="mb-2 mr-2 text-SubTextColor">{t("termsCondition.contactInfoDescription")}</p>
            </div>
        </div>
    );
};

export default TermsConditions;