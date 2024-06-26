import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { setShipping } from "../redux/reducers/deliveryShipping";

import OptionVariety  from "../components/OptionVariaety";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CardProductOrder from "../components/CardProductOrder";
import Payment from "../components/Payment";
import InputForm from "../components/InputForm";



const CheckOut = () => {
  const products = useSelector(state => state.products.data)
  const sizeProducts = useSelector(state => state.sizeProducts.sizes)
  const variantProduct = useSelector(state => state.variantProducts.variants)
  const quantityProducts = useSelector(state => state.quantityProducts.quantities)

  const dispatch = useDispatch()


  const handleCheckbox = (event) => {
    if (event.target.checked) {
      dispatch(setShipping(event.target.value))
    }
  };

  return (
    <body className="flex flex-col items-center">
      <Navbar />

      <div className="flex flex-col px-4 w-full sm:w-5/6 mt-20 sm:mt-24 mb-10 sm:mb-16 gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">Payment Details</h1>

        <form className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col w-full sm:w-7/12 gap-6 sm:gap-16">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <h4 className="font-semibold">Your Order</h4>
                <Link
                  to="/products"
                  className="flex items-center justify-center gap-2 text-white bg-gradient-to-b from-primary to-black rounded-md active:scale-95 transition-all p-1.5 sm:p-2"
                >
                  <FiPlus />
                  <h5 className="text-xs">Add Menu</h5>
                </Link>
              </div>

              <div className="order flex flex-col gap-3 sm:gap-5 overflow-y-auto max-h-[22rem] sm:max-h-[21rem]">
                {products &&
                  products.map((product, index) => (
                    <CardProductOrder
                      key={index}
                      id={product.id}
                      index={index}
                      productName={product.name}
                      quantity={quantityProducts[index]}
                      size={sizeProducts[index]}
                      variant={variantProduct[index]}
                      delivery={product.delivery}
                      basePrice={product.basePrice}
                      discountPrice={product.basePrice - product.discount}
                      image={product.image}
                      tag={product.tag}
                    />
                  ))}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <h2 className="text-lg sm:text-xl font-semibold">
                Payment Info & Delivery
              </h2>
              <InputForm
                name="email"
                label="Email"
                type="email"
                placeholder="Enter Your Email"
              />
              <InputForm
                name="full-name"
                label="Full Name"
                type="text"
                placeholder="Enter Your Full Name"
              />
              <InputForm
                name="address"
                label="Address"
                type="text"
                placeholder="Enter Your Address"
              />
              <OptionVariety
                option="Delivery"
                onChange={handleCheckbox}
              />
            </div>
          </div>

          <Payment />
        </form>
      </div>

      <Footer />
    </body>
  );
};

export default CheckOut;
