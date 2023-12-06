import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";

const SubCategory = ({ subCategories }) => {
  const [options, setOptions] = useState(null);
  // console.log(subCategories);

  const url = "https://api.banglamartecommerce.com.bd";
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${url}/category/getOptions?subCategoryId=${subCategories?.id}`
        );
        const data = await response.json();
        setOptions(data.data);
      } catch (error) {
        console.error("Error fetching instructor classes:", error);
      }
    };

    fetchCategories();
  }, [subCategories]);

// console.log(options);
  return (
    <div className="">
      <h2 className="text-TextColor mb-1 mr-4">
        {subCategories ? (
          subCategories.name
        ) : (
          <SkeletonTheme baseColor="#FAD7A0" highlightColor="#fff">
            <p>
              <Skeleton count={1} />
            </p>
          </SkeletonTheme>
        )}
      </h2>
      <div className="pl-1 ml-1 mb-2 border-l-2 border-l-BorderColor">
        {options ? (
          options.map((option, i) => {
            
            return (
              <Link to={`/products/${option.id}/${option?.name}`} key={i} className="flex p-1">
                <p className="text-SubTextColor font-semibold hover:text-[#6feb6f] hover:underline tracking-[2px]">
                  {option.name}
                </p>
              </Link>
            );
          })
        ) : (
          <SkeletonTheme baseColor="#FAD7A0" highlightColor="#fff">
            <p>
              <Skeleton count={3} />
            </p>
          </SkeletonTheme>
        )}
      </div>
    </div>
  );
};

export default SubCategory;
