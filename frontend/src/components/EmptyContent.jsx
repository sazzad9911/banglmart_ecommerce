
const EmptyContent = ({text}) => {
    return (
        <div>
            <div className="p-4 bg-CardColor flex flex-col justify-center items-center">
                <img className="" src="https://i.ibb.co/hFdqFDx/image.png" alt="" />
                <h2 className="text-SubTextColor mt-4 ">
                  {text|| ''}
                </h2>
              </div>
        </div>
    );
};

export default EmptyContent;