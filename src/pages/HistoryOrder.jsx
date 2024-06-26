import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import {
  FiMessageSquare,
  FiAlignRight,
  
} from "react-icons/fi";

import { useSelector } from "react-redux";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";
import ButtonCustom from "../components/ButtonCustom";
import Product1 from "../assets/images/detail-product1.jpg";



const optionFilter = ["On Progress", "Sending Goods", "Finish Order"]

const CardHistoryOrder = ({id, orderNumber, date, total, statusDelivery, image}) => {
    return (
        <div className="flex gap-4 items-center p-2 bg-[#E8E8E84D] text-sm">
        <div className="hidden sm:block w-28">
          <img src={image} />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div
            className="grid grid-cols-2 place-content-between gap-y-6 sm:flex justify-between"
          >
            <div className="flex flex-col gap-2 text-[#4F5665]">
              <div className="flex items-center gap-1">
                <i className="h-3.5 w-fit" data-feather="coffee"></i>
                <p className="text-xs sm:text-base">No. Order</p>
              </div>
              <h5 className="font-semibold text-black text-xs sm:text-base">
               #{orderNumber}
              </h5>
            </div>

            <div className="flex flex-col gap-2 text-[#4F5665]">
              <div className="flex items-center gap-1">
                <i className="h-3.5 w-fit" data-feather="calendar"></i>
                <p className="text-xs sm:text-base">Date</p>
              </div>
              <h5 className="font-semibold text-black text-xs sm:text-base">
                {date}
              </h5>
            </div>

            <div className="flex flex-col gap-2 text-[#4F5665]">
              <div className="flex items-center gap-1">
                <i className="h-3.5 w-fit" data-feather="repeat"></i>
                <p className="text-xs sm:text-base">Total</p>
              </div>
              <h5 className="font-semibold text-black text-xs sm:text-base">
                Idr {total.toLocaleString('id')}
              </h5>
            </div>

            <div className="flex flex-col gap-2 text-[#4F5665]">
              <div className="flex items-center gap-1">
                <i className="h-3.5 w-fit" data-feather="refresh-ccw"></i>
                <p className="text-xs sm:text-base">Status</p>
              </div>
              <h5
                className="font-semibold text-white text-xs bg-gradient-to-br from-primary to-black p-1.5 rounded-3xl translate-y-[-0.3rem] w-fit"
              >
                {statusDelivery}
              </h5>
            </div>
          </div>

          <Link to={`/order-details/${id}`} className="text-primary underline text-xs sm:text-base"
            >Views Order Detail
            </Link>
        </div>
      </div>
    )
}

const HistoryOrder = () => {
const [totalPage, setTotalPage] = useState()
  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPage] = useState()
  const[currentPage, setCurrentPage] = useState()
  const [filter, setFilter] = useState(null)
  const [disable, setDisable] = useState(false)
  const [orders, setOrders] = useState()
  const [totalData, setTotalData] = useState(0)
  const [errorMessage, setErrorMessage] = useState()
  const [error, setError] = useState(false)
  const [isLoading,setIsLoading] = useState(false)

  const token = useSelector(state => state.auth.token)


  const dataOrders = async () => {
    setIsLoading(true)
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_URL}/orders`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      });
      console.log(data); // Tambahkan untuk debugging
      if (data && data.pageInfo) {
        setOrders(data.results);
        setTotalPage(data.pageInfo.totalPage);
        setNextPage(data.pageInfo.nextPage);
        setPrevPage(data.pageInfo.prevPage);
        setTotalData(data.pageInfo.totalData);
        setCurrentPage(data.pageInfo.currentPage);
        setIsLoading(false)
      } else {
        // Handle kasus dimana data.pageInfo tidak ada
        console.error('Data pageInfo tidak ditemukan dalam respon');
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Terjadi kesalahan saat mengambil data';
      setErrorMessage(errorMessage);
      setError(true);
      setIsLoading(false)
    }
  };


  const filterStatus = async (event) => {
    const filterStatus = event.target.innerText

    try {
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_URL}/orders?status=${filterStatus}`, {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      })
      console.log(data && data)
      setOrders(data.results)
      setTotalPage(data.pageInfo.totalPage)
      setNextPage(data.pageInfo.nextPage)
      setPrevPage(data.pageInfo.prevPage);
      setCurrentPage(data.pageInfo.currentPage)
      setTotalData(data.pageInfo.totalData)
      setFilter(filterStatus)

      if (data.pageInfo.nextPage === null) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    } catch (error) {
      console.log(error.response.data.message)
      setErrorMessage(error.response.data.message)
      setError(true)
    }
  }


  const pageNavigator = async (page) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    try {
      if (filter) {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/orders?page=${page}&status=${filter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        setOrders(data.results);
        setNextPage(data.pageInfo.nextPage);
        setPrevPage(data.pageInfo.prevPage);
        setCurrentPage(data.pageInfo.currentPage)

        if (data.pageInfo.nextPage === null) {
          setDisable(true);
        } else {
          setDisable(false);
        }
      } else {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/orders?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        setOrders(data.results);
        setNextPage(data.pageInfo.nextPage);
        setPrevPage(data.pageInfo.prevPage);
        setCurrentPage(data.pageInfo.currentPage)

        if (data.pageInfo.nextPage === null) {
          setDisable(true);
        } else {
          setDisable(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  const nextPageNavigator = async () => {
    window.scrollTo({
      // note: bug saat ke halaman terakhir
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    try {
      if (filter) {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/orders?page=${nextPage}&status=${filter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        setOrders(data.results);
        setNextPage(data.pageInfo.nextPage);
        setPrevPage(data.pageInfo.prevPage);
        setCurrentPage(data.pageInfo.currentPage)

        if (data.pageInfo.nextPage === null) {
          setDisable(true);
        } else {
          setDisable(false);
        }
      } else {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/orders?page=${nextPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        setOrders(data.results);
        setNextPage(data.pageInfo.nextPage);
        setPrevPage(data.pageInfo.prevPage);
        setCurrentPage(data.pageInfo.currentPage)

        if (data.pageInfo.nextPage === null) {
          setDisable(true);
        } else {
          setDisable(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  const prevPageNavigator = async () => {
    window.scrollTo({
      // note: bug saat ke halaman terakhir
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    try {
      if (filter) {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/orders?page=${prevPage}&status=${filter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        setOrders(data.results);
        setNextPage(data.pageInfo.nextPage);
        setPrevPage(data.pageInfo.prevPage);
        setCurrentPage(data.pageInfo.currentPage)

        if (data.pageInfo.nextPage === null) {
          setDisable(true);
        } else {
          setDisable(false);
        }
      } else {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/orders?page=${prevPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        setOrders(data.results);
        setNextPage(data.pageInfo.nextPage);
        setPrevPage(data.pageInfo.prevPage);
        setCurrentPage(data.pageInfo.currentPage)

        if (data.pageInfo.nextPage === null) {
          setDisable(true);
        } else {
          setDisable(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    dataOrders()
  }, [])


  return (
    <body className="flex flex-col items-center gap-6 sm:gap-10">
      <Navbar/>

      <div className="header flex justify-between sm:justify-start w-5/6 mt-20 sm:mt-24 gap-8 items-end">
        <h1 className="text-2xl sm:text-4xl font-semibold">History Order</h1>
        <div className="bg-[#E8E8E8] w-7 h-6 sm:w-8 sm:h-7 flex items-center justify-center">
          <p>{totalData}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-5/6 gap-4">
        <div className="sm:w-2/3 flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col-reverse sm:flex-row gap-y-4 sm:gap-12 justify-between">
            <div className="flex flex-col items-start gap-2 w-fit sm:w-auto sm:flex-row sm:justify-between sm:gap-4 bg-[#E8E8E899] p-1.5 sm:p-3">
            {optionFilter.map((item, index) => (
              <button key={index} onClick={filterStatus} className={`${filter == item ? 'bg-white' : 'bg-transparen'}  p-1 text-xs sm:text-base font-semibold transition-all`}>
                {item}
              </button>
            ))}
            </div>

            <label className="relative w-fit sm:w-auto flex items-center justify-center bg-[#E8E8E899] p-1.5 sm:p-3 gap-2 font-semibold">
              {/* <FiCalendar />
              <h4 className="text-xs sm:text-base">January 2023</h4>
              <FiChevronDown /> */}
              <input className="outline-none bg-transparent" type="month" name="date"/>
            </label>
          </div>
          
          <div className="relative flex flex-col gap-4 h-fit">
            {/* loading */}
          {isLoading && <span className="absolute text-primary top-2 left-1/2 -translate-x-1/2 loading loading-bars w-[3rem] h-[3rem]"></span>}
              {/* loading */}
          <div className={`absolute text-center top-10 py-2 px-4 bg-white shadow-md rounded text-sm text-red-500 flex justify-center items-center font-bold ${error ? 'flex' : 'hidden'}`}>
                <h1>{errorMessage}</h1>
          </div>

            {orders &&
              orders.map((order) => (
                <CardHistoryOrder
                  key={order.id}
                  id={order.id}
                  orderNumber={order.orderNumber}
                  date={`${moment(order.createdAt).format('D').padStart(2, '0')} ${moment(order.createdAt).format('MMMM')} ${moment(order.createdAt).format('YYYY')}`}
                  total={parseInt(order.subtotal)}
                  statusDelivery={order.status}
                  image={Product1}
                />
              ))}
          </div>
          
          {!error &&
          <PageNavigation totalPage={totalPage} pageHandle={pageNavigator} nextPageHandle={nextPageNavigator} prevPageHandle={prevPageNavigator} handleDisable={disable} currentPage={currentPage}/>
          }
        </div>

        <div className="flex-1 flex flex-col gap-2 border border-[#E8E8E8] h-fit p-2 mt-4 sm:mt-0">
          <div className="relative bg-black rounded-2xl w-fit p-1.5 flex items-center justify-center">
            <FiMessageSquare color="white" size={25} />
            <FiAlignRight className="absolute top-2.5 text-[#A87C7C] h-3" />
          </div>
          <h4 className="text-[#4F5665] font-bold text-sm">Send Us Message</h4>
          <p className="text-[#4F5665] text-xs">
            if your unable to find answer or find your product quickly, please
            describe your problem and tell us. we will give you solution.
          </p>
          <ButtonCustom destination="#" value="Send Message" py="1.5" />
        </div>
      </div>

      <Footer />
    </body>
  );
};

export default HistoryOrder;
