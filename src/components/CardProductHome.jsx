import Rating from "./Rating";
import { FiShoppingCart } from "react-icons/fi";
import Tag from "./Tag";
import { Link } from "react-router-dom";
import Price from "./Price"
import Product1 from '../assets/images/detail-product1.jpg'

const CardProductHome = ({id, productName, description, rating, basePrice, discountPrice, price, image, handleDetails, tag }) => {
  return (
    <div className="relative flex justify-center w-fit h-fit">
      <div>
        <img className="w-48 h-48 object-cover" src={image ? `${import.meta.env.VITE_SERVER_URL}/uploads/products/${image}` : Product1}/>
      </div>
      {
        tag &&
      <div className="absolute left-2 top-2">
        <Tag text={tag}/>
      </div>
      }
      <div className="absolute w-11/12 h-[12.5rem] sm:h-5/6 bg-white top-[85%] p-1.5 sm:p-2 flex flex-col gap-1.5">
        <h1 className="font-semibold text-sm sm:text-base" id="product-name">
          {productName}
        </h1>
        <p className="flex-1 text-[0.6rem] sm:text-[0.7rem] text-[#4F5665]">
          {description}
        </p>
        {rating && <Rating rating={rating}/>}
        <Price basePrice={basePrice} discountPrice={discountPrice} price={price}/>
        <div className="flex-1 flex flex-col sm:flex-row items-end gap-1 sm:gap-2">
          <Link to={`/products/${id}`} onClick={handleDetails ? () => handleDetails(id) : undefined}  className="text-white w-full sm:w-9/12 bg-gradient-to-br from-primary to-black rounded-md text-xs sm:text-sm py-1 active:scale-95 transition-all flex justify-center">
            Buy
          </Link>
          <Link to={`/products/${id}`} onClick={handleDetails ? () => handleDetails(id) : undefined} className="w-full sm:flex-1 border border-primary text-primary p-[0.21rem] rounded-md flex justify-center items-center active:scale-95 transition-all">
            <FiShoppingCart color="primary" className="h-4 sm:h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardProductHome;
