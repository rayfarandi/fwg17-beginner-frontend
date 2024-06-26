import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProduct } from "../redux/reducers/products";
import { setTotal } from "../redux/reducers/totalOrder";
import { setSize } from "../redux/reducers/sizeProducts";
import { setVariant } from "../redux/reducers/variantProducts";
import { setQuantity } from "../redux/reducers/quantityProducts";
import { setId } from "../redux/reducers/productsId";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CardProduct from "../components/CardProduct";
import PageNavigation from "../components/PageNavigation";
import Details from "../components/Details";
import { recommendProducts } from './Home'

const ProductDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // details product start
  const {id} = useParams()
  const [infoProduct, setInfoProduct] = useState()
  console.log(infoProduct && infoProduct.variantsProduct)
  const variants = infoProduct && infoProduct.variantsProduct

  const dataDetails = async (productId) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    try {
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products/${productId ? productId : id}`)
      setInfoProduct(data.results)
      console.log(data.results)
    } catch (error) {
      console.log(error)
    }
  }
  // details product end



  // add to redux start
  const addToCart = (quantity, size, variant, dataSize, dataVariant, id) => {
    dispatch(setProduct({
      ...infoProduct
    }))

    dispatch(setTotal((infoProduct.basePrice - infoProduct.discount + dataSize.additionalPrice + (dataVariant ? dataVariant.additionalPrice : 0)) * quantity))
    dispatch(setSize(size))
    dispatch(setVariant(variant))
    dispatch(setQuantity(quantity))
    dispatch(setId(id))

    // navigate('/checkout')
  }
   // add to redux end



  // recommendation products start
  const [dataProducts, setDataProducts] = useState()
  const [totalPage, setTotalPage] = useState()
  const [nextPage, setNextPage] = useState()
  const [prevPage, setprevPage] = useState()
  const [disable, setDisable] = useState(false)
  const[currentPage, setCurrentPage] = useState()

  const recommendProducts = async () =>{
    try{
      const {data} =await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`, {
        params: {
          limit: 3,
          isRecommended:true
        }
      })
      console.log(data)
      setDataProducts(data.results)
      setCurrentPage(data.pageInfo.currentPage)
      setTotalPage(data.pageInfo.totalPage)
      setNextPage(data.pageInfo.nextPage)
    }catch(error){
      console.log(error)
    }
  }

  const pageNavigator = async (page) => {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`, {
        params: {
          limit: 3,
          page,
          isRecommended: true
        }
      })
      console.log(data)
        setDataProducts(data.results)
        setNextPage(data.pageInfo.nextPage)
        setprevPage(data.pageInfo.prevPage)
        setCurrentPage(data.pageInfo.currentPage)

        if(data.pageInfo.nextPage === null){
          setDisable(true)
        }else{
          setDisable(false)
        }
    } catch (error) {
      console.log(error)
    }
  }

  const nextPageNavigator = async () => {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`, {
        params: {
          limit: 3,
          page: nextPage,
          isRecommended: true
        }
      })
      console.log(data)
      setDataProducts(data.results)
      setNextPage(data.pageInfo.nextPage)
      setprevPage(data.pageInfo.prevPage)
      setCurrentPage(data.pageInfo.currentPage)

      if(data.pageInfo.nextPage === null){
        setDisable(true)
      }else{
        setDisable(false)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const prevPageNavigator = async () => {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`, {
        params: {
          limit: 3,
          page: prevPage,
          isRecommended: true
        }
      })
      console.log(data)
      setDataProducts(data.results)
      setNextPage(data.pageInfo.nextPage)
      setprevPage(data.pageInfo.prevPage)
      setCurrentPage(data.pageInfo.currentPage)

      if(data.pageInfo.nextPage === null){
        setDisable(true)
      }else{
        setDisable(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // recommendation products end


  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    recommendProducts({
      setDataProducts,
      setTotalPage,
      setNextPage,
      setCurrentPage,
      limit: 3,
    });

    dataDetails()
  }, [])

  return (
    <body className="flex flex-col items-center gap-8">
      <Navbar />

      <section className="h-fit sm:h-screen w-5/6 flex flex-col sm:flex-row items-center mt-20 sm:mt-8 gap-4 ">
        <div className="w-full sm:flex-1 flex flex-col items-center gap-2 sm:gap-4 h-96 sm:h-5/6">
          {infoProduct && (
            <div
              style={{
                backgroundImage: `url('${import.meta.env.VITE_SERVER_URL}/uploads/products/${infoProduct.image}')`,
                backgroundPosition: "center",
              }}
              className={`w-full h-72 sm:h-80 bg-center bg-cover`}
            ></div>
          )}

          <div className="flex-1 flex justify-between gap-4 w-full">
            <div className="flex-1 bg-[url('../assets/images/detail-product1.jpg')] bg-center bg-cover"></div>
            <div className="flex-1 bg-[url('../assets/images/detail-product2.jpg')] bg-center bg-cover"></div>
            <div className="flex-1 bg-[url('../assets/images/detail-product3.jpg')] bg-center bg-cover"></div>
          </div>
        </div>

        {infoProduct && infoProduct.discount == 0 ? (
          <Details
            id={infoProduct.id}
            productName={infoProduct.name}
            rating={infoProduct.rating}
            review={infoProduct.review}
            description={infoProduct.description}
            price={infoProduct.basePrice}
            tag={infoProduct.tag}
            isRecommended={infoProduct.isRecommended}
            variants={variants}
            handleAddToCart={addToCart}
          />
        ) : (
          infoProduct && (
            <Details
              id={infoProduct.id}
              productName={infoProduct.name}
              rating={infoProduct.rating}
              review={infoProduct.review}
              description={infoProduct.description}
              basePrice={infoProduct.basePrice}
              discountPrice={infoProduct.basePrice - infoProduct.discount}
              tag={infoProduct.tag}
              isRecommended={infoProduct.isRecommended}
              variants={variants}
              handleAddToCart={addToCart}
            />
          )
        )}
      </section>

      <div className="h-fit sm:h-screen flex flex-col justify-center items-center w-5/6 gap-4 mb-8 sm:mb-0">
        <h1 className="w-full text-xl text-center sm:text-start sm:text-4xl">
          Recommendation <span className="text-[#8E6447]">For You</span>
        </h1>

        <div className="flex justify-center gap-4 sm:gap-12 mb-48 w-md sm:w-fit flex-wrap gap-y-48">
          {dataProducts &&
            dataProducts.map((product) =>
              product.discount == 0 ? (
                <CardProduct
                  id={product.id}
                  key={product.id}
                  productName={product.name}
                  description={product.description}
                  rating={product.rating}
                  price={product.basePrice}
                  image={product.image}
                  handleDetails={dataDetails}
                  tag={product.tag}
                />
              ) : (
                <CardProduct
                  id={product.id}
                  key={product.id}
                  productName={product.name}
                  description={product.description}
                  rating={product.rating}
                  basePrice={product.basePrice}
                  discountPrice={product.basePrice - product.discount}
                  image={product.image}
                  handleDetails={dataDetails}
                  tag={product.tag}
                />
              )
            )}
        </div>

        <PageNavigation
          totalPage={totalPage}
          pageHandle={pageNavigator}
          nextPageHandle={nextPageNavigator}
          prevPageHandle={prevPageNavigator}
          handleDisable={disable}
          currentPage={currentPage}
        />
      </div>

      <Footer />
    </body>
  );
};

export default ProductDetails;
