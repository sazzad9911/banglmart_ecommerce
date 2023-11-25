import { Helmet } from "react-helmet";

const Faq = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <Helmet>
        <title>FAQ | Banglamart E-commerce</title>
      </Helmet>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

                {/* FAQ sections */}
                <div className="space-y-8">
                    {/* Section 1 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Why can't I login with my old Banglamart account?</h2>
                        <p>Currently, we are using a new server temporarily. All details from previous credentials will be available upon retrieval of our old server from Amazon. For now, please create a new account (you may use your old mobile number).</p>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Where are my old orders?</h2>
                        <p>Banglamart is currently operating from a new server which will have the details from recent usage. All the data from the earlier version are stored and protected with safety in Amazon server. We are in constant progress with Amazon to retrieve the previous data soon.</p>
                    </div>

                    {/* Section 3 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">When will I be able to see my old orders?</h2>
                        <p>We are trying our best to recover the old server as soon as possible.</p>
                    </div>

                    {/* Section 4 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Can I use my old phone number to create a new account in the new server?</h2>
                        <p>Yes, you can. After recovering the old server, both accounts will be merged if you use the same login number. You'll be able to see your old orders automatically.</p>
                    </div>

                    {/* Section 5 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">What is the Star Program?</h2>
                        <p>
                            <strong>i. Customers will get 1 Star ⭐ on every successful Delivered order from Banglamart CBD, COD, PnP Store.</strong><br />
                            ii. For non-payment of delivery charge/not confirmed orders, 5 Stars ⭐ will be deducted as a penalty.<br />
                            iii. For dispatched and returned orders due to not receiving the products without raising any prior Issue from customer end will also deduct 5 Stars ⭐. If Issue has been raised on time, Star ⭐ will remain the same.<br />
                            iv. Stay updated with us to know more about the amazing Star ⭐ facilities which will be announced over the period.
                        </p>
                    </div>

                    {/* Section 6 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Return Policy</h2>
                        <p>
                            If you wish to return the product you ordered for any reason, please return it by courier within 7 days of receiving the product at your convenience. In this case, only the courier fee will be paid by Banglamart, as applicable under that condition. Therefore, you do not have to pay any return charges. After sending the product for return, please email the courier copy to return@e-valy.com. We will pay the courier fee and receive the product. Your claim will be verified, and the refund will be processed within the next 14 days.
                            <br /><br />
                            <strong>N.B: Please note that you should keep and be able to provide proper documentation and proof about your return/refund claim (e.g. unboxing video, receiving invoice, etc.) and attach said documentation to the email.</strong>
                            <br /><br />
                            We are committed to providing the highest level of service to Banglamart customers. Every seller on our platform is registered and verified before selling products on Banglamart.
                        </p>
                        <div className="mt-4">
                            <strong>Product Return Address:</strong><br />
                            8, Gulfesha Plaza (4th floor), Shahid Sangbadik Selina Parvin Sarak, Mogbazar, Dhaka<br />
                            Ph: +8809649110110
                        </div>
                    </div>

                    {/* Section 7 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">What are Banglamart Star Points?</h2>
                        <p>Banglamart Star Points are a loyalty reward system used by Banglamart, where users can earn points through each successful delivered order on the platform.</p>
                    </div>

                    {/* Section 8 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">What are the eligibility criteria to avail the delivery charge payment feature?</h2>
                        <p>
                            To avail this service, you need to meet the following criteria:<br />
                            a) Have a minimum of 30 Cash-on-Delivery (COD) orders delivered.<br />
                            b) Have a minimum of 20,000 Star Points in your account.
                        </p>
                    </div>

                    {/* Section 9 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">How many Star Points are required to pay for delivery charges?</h2>
                        <p>The conversion rate is 30 Star Points equivalent to 1 BDT. The exact number of Star Points required to pay for delivery charges will depend on the specific delivery charge amount.</p>
                    </div>

                    {/* Section 10 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Is there a limit on the maximum redemption of Star Points for delivery charges?</h2>
                        <p>Yes, there is a maximum redemption limit of 20,000 BDT per month for paying delivery charges using Star Points.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;
