
const FlashSaleBanner = ({bannerURL}) => {
 const imgURL =bannerURL || 'https://i.ibb.co/K78NBht/sell-41-01.jpg'
    return (
        <div className="container mx-auto mt-4 p-1 lg:p-0">
            <img className="max-h-[290px] w-full object-fill "   src={imgURL} alt="" />
        </div>
    );
};

export default FlashSaleBanner;