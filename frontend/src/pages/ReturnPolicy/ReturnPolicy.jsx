import { Helmet } from "react-helmet";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";

// TODO
const ReturnPolicy = () => {
  const { language } = useContext(AuthContext);
  return (
    <div className="container mx-auto m-4">
      <Helmet>
        <title>Return Policy | Banglamart E-commerce</title>
      </Helmet>
      <div className="p-4 bg-CardColor">
        {language ? (
          <p className="text-TextColor">
            Conditions for Returns: <br /> The product must be unused, unworn,
            unwashed and without any flaws. Fashion products can be tried on to
            see if they fit and will still be considered unworn <br />
            The product must include the original tags, user manual, warranty
            cards, freebies and accessories. <br />
            The product must be returned in the original and undamaged
            manufacturer packaging / box. If the product was delivered in a
            second layer of Banglamart packaging, it must be returned in the
            same condition with return shipping label attached. Do not put tape
            or stickers on the manufacturers box. <br /> <br />
            Returns & Replacement Policy: <br />
            All products listed under a particular category may not have the
            same return/replacement period. <br />
            Promotion may or may not follow this policy.
            <br />
            Replacement Period after Delivery is applicable if product received
            is Defective or damaged or not as described.
            <br />
            If you have received a damaged or defective product or if it is not
            as described, you can raise a replacement request on the Website/App
            or making direct call to our customer care within the applicable
            Return Policy period. For all Electronics and Appliance's Category:
            If any manufacturing defeats then you can replace within 72 hours
            from the date of product received.
            <br />
            <br />
            Refund Payment:
            <br />
            It will be done only in 2 case… · If customer cancel the product. ·
            If Banglamart is not able to fulfill the order.
            <br />
            In a rare event of the replacement being defective/damaged or not as
            described on the product page, a full refund will be provided by the
            seller once they receive the product.
            <br />
            <br />
            For products where installation is provided by Banglamart:
            <br />
            Please do not open the product packaging by yourself. Banglamart
            authorized personnel shall help in unboxing and installation of the
            product where applicable.
            <br />
            The return period for such products commences from the date of
            installation.
            <br />
            <br />
            Returns Processing:
            <br />
            If you're facing any issues with a product purchased on Banglamart,
            we shall help by verifying and trying to resolve your product issue
            as part of the return verification process. The Issue resolution
            steps may be shared with you as self-help, or with assistance over
            call or a Banglamart (or partner) personnel may visit your place.
            Banglamart will arrange for a replacement if the issue has not been
            resolved.
            <br />
            Issue resolution steps will be available for products like mobiles,
            tablets, laptops, large appliances, electronics, home appliances,
            furniture etc.
            <br />
            In case the product is not in stock or has been permanently
            discontinued, the refund for the entire product or part(s) of the
            product will be provided by the Banglamart.
            <br />
            <br />
            Returns Pick-Up:
            <br />
            In case of returns where you would like item(s) to be picked up from
            a different address, the address can only be changed if pick-up
            service is available at the new address during pick-up, your product
            will be checked for the following conditions.
            <br />
            · Correct Product
            <br />
            <br />
            IMEI/name/image/brand/serial number/article number/bar code should
            match and MRP tag should be undetached and clearly visible.
            <br />
            · Complete Product
            <br />
            <br />
            All in-the-box accessories (like remote control, starter kits,
            instruction manuals, chargers, headphones, etc.), freebies and
            combos (if any) should be present.
            <br />
            · Unused Product
            <br />
            <br />
            The product should be unused, unwashed, unsoiled, without any stains
            and with non-tampered quality check seals/warranty seals (wherever
            applicable). Before returning a Mobile/Laptop/Tablet, the device
            should be formatted and iCloud accounts should be unlocked for iOS
            devices.
            <br />
            · Undamaged Product
            <br />
            <br />
            The product (including SIM trays/charging port/headphone port,
            back-panel etc.) should be undamaged and without any scratches,
            dents, tears or holes.
            <br />
            · Undamaged Packaging
            <br />
            <br />
            Product's original packaging/box should be undamaged.
            <br />
            <br />
            The field executive may refuse to accept the return if any of the
            above conditions are not met.
            <br />
            <br />
            Where to return the product?
            <br />
            In an event where you have failed to provide your product to our
            pick-up, kindly have your returns shipped or dropped-off to our Hub
            Offices-
            <br />
            <br />
            Returns Mailing Address: Once your product is received by
            Banglamart, what are the checks being done?
            <br />
            <br />
            Once your product is received, your product will be checked by our
            Quality Control team. We will test whether the product fails to
            perform as you have claimed in your return form. We will also make
            sure that your product meets all the requirements for a return as
            stated in our policy.
            <br />
            <br />
            How to request a refund and what are the conditions?
            <br />
            Refunds are made only when the request is made within 48 hours of
            the purchase. And the purchased product must be in sealed/intact
            condition to be eligible for a refund. Otherwise, there will be no
            option for any refund.
            <br />
            <br />
            How long does the validation or invalidation of the refund take?
            <br />
            This quality evaluation process takes at least 72 hours business
            days depending on the refund method. Once completed, we will send
            you an e-mail or call you to give you the result of the quality
            evaluation.
            <br />
            <br />
            Can you request an exchange rather than a refund?
            <br />
            If you prefer to exchange your product, just let Customer Service
            know and we will call you as soon as your product has been received,
            and we have looked into the availability of the requested product.
            But the product must be totally sealed/intact for any exchange.
            <br />
            <br />
            If you choose a refund voucher, you can also use it to buy any
            product on Banglamart within the voucher amount.
            <br />
            <br />
            If your returned product is not validated for return, how are you
            informed?
            <br />
            If your return is invalid, then we will call you to explain the
            issue and send the item back to you. We will arrange the delivery of
            the item. You can still avail warranty if you have.
          </p>
        ) : (
          <p className="text-TextColor">
            রিফান্ড এবং রিটার্ন
            <br />
            রিটার্নের শর্তাবলী
            <br />
            পণ্যটি অব্যবহৃত, অপরিচ্ছন্ন, ধোয়া এবং কোন ত্রুটি ছাড়াই হতে হবে।
            ফ্যাশন পণ্যগুলি ফিট কিনা তা পরীক্ষা করার চেষ্টা করা যেতে পারে এবং
            এখনও এটি অপরিচ্ছন্ন বলে বিবেচিত হবে
            <br />
            পণ্যের মূল ট্যাগ, ব্যবহারকারী ম্যানুয়াল, ওয়ারেন্টি কার্ড, ফ্রি এবং
            আনুষাঙ্গিক অন্তর্ভুক্ত করা আবশ্যক।
            <br />
            পণ্যটি আসল এবং ক্ষতিহীন প্যাকেজিং / বাক্সে ফেরত দিতে হবে। যদি পণ্যটি
            বাংলামার্ট প্যাকেজিংয়ের দ্বিতীয় স্তরে বিতরণ করা হয় তবে এটি অবশ্যই
            একই অবস্থায় ফেরত পাঠাতে হবে রিটার্ন শিপিং লেবেল সংযুক্ত করে।
            নির্মাতাদের বাক্সে টেপ বা স্টিকার লাগানো যাবে না।
            <br />
            রিটার্ন এবং প্রতিস্থাপন নীতি:
            <br />
            একটি নির্দিষ্ট বিভাগের অধীনে তালিকাভুক্ত সমস্ত পণ্যের একই
            রিটার্ন/প্রতিস্থাপনের সময় নাও থাকতে পারে।
            <br />
            প্রচার এই নীতি অনুসরণ করতে পারে বা নাও করতে পারে।
            <br />
            যদি প্রাপ্ত পণ্য ত্রুটিপূর্ণ বা ক্ষতিগ্রস্ত হয় বা বর্ণিত হিসাবে না
            হয় তবে ডেলিভারির পরে প্রতিস্থাপনের জন্য প্রযোজ্য।
            <br />
            যদি আপনি একটি ক্ষতিগ্রস্ত বা ত্রুটিপূর্ণ পণ্য পেয়ে থাকেন বা যদি এটি
            বর্ণিত না হয়, তাহলে আপনি প্রযোজ্য রিটার্ন পলিসি সময়কালের মধ্যে
            ওয়েবসাইট/অ্যাপে প্রতিস্থাপনের অনুরোধ করতে পারেন বা সরাসরি আমাদের
            কাস্টমার কেয়ারে কল করতে পারেন। সমস্ত ইলেকট্রনিক্স এবং
            অ্যাপ্লায়েন্স বিভাগের জন্য: যদি কোন প্রস্তুতকালীন ত্রুটিহয় তবে
            আপনি প্রাপ্ত পণ্যের তারিখ থেকে ৭২ঘন্টার মধ্যে প্রতিস্থাপন করতে
            পারেন।
            <br />
            টাকা ফেরতঃ
            <br />
            এটি ২ ক্ষেত্রে হতে পারে-
            <br />
            · যদি কাস্টমার পণ্যটি বাতিল করে
            <br />
            · যদি বাংলামার্ট অর্ডারটি দিতে ব্যর্থ হয়।
            <br />
            পণ্য প্রতিস্থাপন ত্রুটিপূর্ণ/ক্ষতিগ্রস্ত বা পৃষ্ঠায় বর্ণিত হিসাবে
            না হলে, বিক্রেতা যখন পণ্যটি গ্রহণ করবে তখন তার সম্পূর্ণ অর্থ ফেরত
            দেওয়া হবে।
            <br />
            বাংলা মার্টদ্বারা ইনস্টলেশন প্রদান করা হয় এমন পণ্যগুলির জন্য:
            <br />
            দয়া করে নিজেপণ্যের প্যাকেজিং খুলবেন না।বাংলামার্ট অনুমোদিত কর্মীরা
            যেখানে প্রযোজ্য সেখানে পণ্য আনবক্সিং এবং ইনস্টলেশনে সাহায্য করবে।
            <br />
            এই জাতীয় পণ্যগুলির ফেরত দেওয়ার সময়টি ইনস্টলেশনের তারিখ থেকে শুরু
            হয়।
            <br />
            রিটার্ন প্রসেসিং
            <br />
            আপনি যদি বাংলামার্টে কেনা পণ্য নিয়ে কোন সমস্যার সম্মুখীন হন, তাহলে
            আমরা রিটার্ন যাচাই প্রক্রিয়ার অংশ হিসাবে আপনার পণ্যের সমস্যা যাচাই
            এবং সমাধানের চেষ্টা করব। ইস্যু সমাধানের ধাপগুলি স্ব-সাহায্য হিসাবে
            আপনার সাথে ভাগ করা যেতে পারে, অথবা কল দিয়ে সহায়তা বা বাংলা মার্ট
            (বা অংশীদার) কর্মীরা আপনার জায়গায় যেতে পারে। সমস্যার সমাধান না হলে
            বাংলামার্ট প্রতিস্থাপনের ব্যবস্থা করবে।
            <br />
            মোবাইল, ট্যাবলেট, ল্যাপটপ, বড় যন্ত্রপাতি, ইলেকট্রনিক্স, হোম
            অ্যাপ্লায়েন্স, আসবাবপত্র ইত্যাদি পণ্যের জন্য ইস্যু সমাধানের স্টেপ
            পাওয়া যাবে।
            <br />
            যদি পণ্য স্টকে না থাকে বা স্থায়ীভাবে বন্ধ হয়ে যায়, তাহলে পুরো
            পণ্য বা পণ্যের অংশ (গুলি) এর ফেরত বাংলা মার্ট প্রদান করবে।
            <br />
            পিক-আপ রিটার্ন
            <br />
            রিটার্নের ক্ষেত্রে যেখানে আপনি একটি ভিন্ন ঠিকানা থেকে আইটেম (গুলি)
            তুলে নিতে চান, ঠিকানাটি কেবল তখনই পরিবর্তন করা যেতে পারে যদি
            পিক-আপের সময় নতুন ঠিকানায় পিক-আপ সার্ভিস পাওয়া যায়, আপনার পণ্য
            চেক করা হবে নিম্নলিখিত শর্তাবলীতে।
            <br />
            · সঠিক পণ্য
            <br />
            আইএমইআই/নাম/ছবি/ব্র্যান্ড/সিরিয়াল নাম্বার/ আর্টিকেল নাম্বার/ বার কোড
            মিলতে হবে এবং এমআরপি ট্যাগ থাকতে হবে যেনো স্পষ্টভাবে দেখা যায়
            <br />
            · সম্পূর্ণ পণ্য
            <br />
            সমস্ত পণ্য (যেমন রিমোট কন্ট্রোল, স্টার্টার কিট, নির্দেশিকা
            ম্যানুয়াল, চার্জার, হেডফোন ইত্যাদি), ফ্রি এবং কম্বো (যদি থাকে)
            বাক্সে উপস্থিত থাকতে হবে।
            <br />
            · অব্যবহৃত পণ্য
            <br />
            পণ্যটি অব্যবহৃত, ধোয়া, অপরিচ্ছন্ন, কোন দাগ ছাড়াই এবং নন-টেম্পার্ড
            কোয়ালিটি চেক সীল/ওয়ারেন্টি সিল (যেখানে প্রযোজ্য) সহ হওয়া উচিত।
            মোবাইল/ল্যাপটপ/ট্যাবলেট ফেরত দেওয়ার আগে, ডিভাইসটি ফর্ম্যাট করা উচিত
            এবং আইওএস ডিভাইসের জন্য আইক্লাউড অ্যাকাউন্টগুলি আনলক করতে হবে।
            <br />
            · অক্ষতিগ্রস্ত পণ্য
            <br />
            পণ্যটি (সিম ট্রে/চার্জিং পোর্ট/হেডফোন পোর্ট, ব্যাক-প্যানেল ইত্যাদি
            সহ) অক্ষতিগ্রস্ত হওয়া উচিত এবং কোন আঁচড়, ডেন্টস, পানি বা গর্ত
            ছাড়াই।
            <br />
            অক্ষত প্যাকেজিং
            <br />
            পণ্যের মূল প্যাকেজিং/বাক্সটি অক্ষত হওয়া উচিত।
            <br />
            উপরোক্ত শর্ত পূরণ না হলে ফিল্ড এক্সিকিউটিভ রিটার্ন গ্রহণ করতে
            অস্বীকার করতে পারে।
            <br />
            কোথায় পণ্য রিটার্ন করতে হবে?
            <br />
            এক্ষেত্রে আপনি আমাদের পিক-আপে আপনার পণ্য সরবরাহ করতে ব্যর্থ হলে,
            দয়া করে আপনার রিটার্নগুলি আমাদের হাব অফিসে পাঠিয়ে দিন বা ছেড়ে
            দিন-
            <br />
            ফেরতের ঠিকানা:
            <br />
            একবার আপনার পণ্য বাংলা মার্ট দ্বারা প্রাপ্ত হলে, কি পরীক্ষা করা হয়?
            <br />
            একবার আপনার পণ্য গ্রহণ করা হলে, আপনার পণ্য আমাদের মান নিয়ন্ত্রণ দল
            দ্বারা পরীক্ষা করা হবে। আপনার রিটার্ন ফর্মে আপনার দাবি অনুযায়ী
            পণ্যটি পারফর্ম করতে ব্যর্থ হয়েছে কিনা তাআমরা পরীক্ষা করব। আমরা এটাও
            নিশ্চিত করব যে আপনার পণ্য আমাদের নীতিমালায় বর্ণিত রিটার্নের সমস্ত
            প্রয়োজনীয়তা পূরণ করে।
            <br />
            কিভাবে টাকা ফেরতের জন্য অনুরোধ করবেন এবং শর্তগুলি কী?
            <br />
            পণ্য কেনার ৪৮ঘন্টার মধ্যে অনুরোধ করা হলেই টাকা ফেরত দেওয়া হয়এবং
            ফেরত পাওয়ার যোগ্য হতে হলে ক্রয়কৃত পণ্য অবশ্যই সিল/অক্ষত অবস্থায়
            থাকতে হবে। অন্যথায়, কোন টাকা ফেরতের জন্য কোন বিকল্প থাকবে না।
            <br />
            রিফান্ডের বৈধতা বা অবৈধতা কতক্ষণ?
            <br />
            এই মানের মূল্যায়ন প্রক্রিয়াটি ফেরতের পদ্ধতির উপর নির্ভর করে
            কমপক্ষে ৭২ঘন্টার ব্যবসায়িক দিন সময় নেয়। একবার সম্পন্ন হলে, আমরা
            আপনাকে একটি ই-মেইল পাঠাবো অথবা আপনাকে গুণমান মূল্যায়নের ফলাফল দিতে
            কল করব।
            <br />
            আপনি কি টাকা ফেরতের পরিবর্তে বিনিময়ের অনুরোধ করতে পারেন?
            <br />
            আপনি যদি আপনার পণ্য বিনিময় করতে চান, তাহলে কেবল গ্রাহক সেবাকে জানান
            এবং আপনার পণ্যটি পাওয়ার সাথে সাথে আমরা আপনাকে কল করব এবং আমরা
            অনুরোধকৃত পণ্যের প্রাপ্যতা দেখবো। কিন্তু যেকোনো বিনিময়ের জন্য
            পণ্যটি সম্পূর্ণ সিল/অক্ষত থাকতে হবে।
            <br />
            আপনি যদি রিফান্ড ভাউচার নির্বাচন করেন, তবে আপনি এটি ব্যবহার করে
            বাংলা মার্টের যেকোনো পণ্য ভাউচার পরিমাণের মধ্যে কিনতে পারেন।
            <br />
            যদি আপনার ফেরত দেওয়া পণ্য ফেরতের জন্য বৈধ না হয়, তাহলে আপনাকে
            কিভাবে জানানো হবে?
            <br />
            যদি আপনার রিটার্ন অবৈধ হয়, তাহলে আমরা আপনাকে সমস্যাটি ব্যাখ্যা করতে
            এবং পণ্যটি আপনাকে ফেরত পাঠানোর জন্য কল করব। আমরা পণ্যটির ডেলিভারির
            ব্যবস্থা করব। আপনার কাছে থাকলেও আপনি ওয়ারেন্টি পেতে পারেন।
            <br />
          </p>
        )}
      </div>
    </div>
  );
};

export default ReturnPolicy;
