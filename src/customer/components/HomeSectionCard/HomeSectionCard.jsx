import React from "react";
import { useNavigate } from "react-router-dom";
const HomeSectionCard = ({ product }) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center overflow-hidden rounded-lg shadow-md  cursor-pointer bg-slate-200 w-[15rem] mx-10 border border-purple-700" onClick={() => navigate(`/product/${product._id}`)}>
      <div className="h-[13rem] w-[13rem]">
        <img
          className="object-cover object-top w-full h-full "
          src={product.imageUrl}
          alt=""
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-black">{product.brand}</h3>
        <p className="mt-2 text-sm text-gray-900">
          {product.title}
        </p>
        <p className="mt-2 text-xs text-green-600">₹{product.discountedPrice}</p>
        <p className="mt-2 text-xs text-gray-500 line-through">₹{product.price}</p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
