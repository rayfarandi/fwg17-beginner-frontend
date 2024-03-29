import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useEffect } from 'react';

const HistoryOrder = ()=>{
    useEffect(()=>{
        window.scrollTo({
          top:0,
          left:0,
          behavior:'smooth'
        })
      },[])
    return(
        <>
        <body className="flex flex-col items-center">
        <Navbar bg='#000000'/>
            {/* history order */}
            <div className="header flex justify-between sm:justify-start w-5/6 mt-20 sm:mt-24 gap-8 items-end">
            <h1 className="text-2xl sm:text-4xl font-semibold">History Order</h1>
            <div
                className="bg-[#E8E8E8] w-7 h-6 sm:w-8 sm:h-7 flex items-center justify-center"
            >
                <p>2</p>
            </div>
            </div>

            <div className="flex flex-col sm:flex-row w-5/6 gap-4">
            <div className="sm:w-2/3 flex flex-col gap-8 sm:gap-10">
                <div
                className="flex flex-col-reverse sm:flex-row gap-y-4 sm:gap-12 justify-between"
                >
                <div
                    className="flex justify-between sm:gap-4 bg-[#E8E8E899] p-1.5 sm:p-3"
                >
                    <h4 className="bg-white p-1 text-xs sm:text-base">On Progress</h4>
                    <h4 className="bg-transparen p-1 text-xs sm:text-base">
                    Sending Goods
                    </h4>
                    <h4 className="bg-transparen p-1 text-xs sm:text-base">Finish Order</h4>
                </div>

                <div
                    className="w-fit sm:w-auto flex items-center justify-center bg-[#E8E8E899] p-1.5 sm:p-3 gap-1"
                >
                    <i className="h-4 sm:h-auto" data-feather="calendar"></i>
                    <h4 className="text-xs sm:text-base">January 2023</h4>
                    <i className="h-4 sm:h-auto" data-feather="chevron-down"></i>
                </div>
                </div>

                <div className="flex flex-col gap-4 h-fit sm:h-[33.5rem]">
                <div className="flex gap-4 items-center p-2 bg-gray-100 text-sm">
                    <div className="hidden sm:block">
                    <img src="./assets/history-order-image.jpg" />
                    </div>

                    <div className="flex-1 flex flex-col gap-4">
                    <div
                        className="grid grid-cols-2 place-content-between gap-y-6 sm:flex justify-between"
                    >
                        <div className="flex flex-col gap-2 text-gray-500">
                        <div className="flex items-center gap-1">
                            <i className="h-3.5 w-fit" data-feather="coffee"></i>
                            <p className="text-xs sm:text-base">No. Order</p>
                        </div>
                        <h5 className="font-semibold text-black text-xs sm:text-base">
                            #12354-09893
                        </h5>
                        </div>

                        <div className="flex flex-col gap-2 text-gray-500">
                        <div className="flex items-center gap-1">
                            <i className="h-3.5 w-fit" data-feather="calendar"></i>
                            <p className="text-xs sm:text-base">Date</p>
                        </div>
                        <h5 className="font-semibold text-black text-xs sm:text-base">
                            23 January 2023
                        </h5>
                        </div>

                        <div className="flex flex-col gap-2 text-gray-500">
                        <div className="flex items-center gap-1">
                            <i className="h-3.5 w-fit" data-feather="repeat"></i>
                            <p className="text-xs sm:text-base">Total</p>
                        </div>
                        <h5 className="font-semibold text-black text-xs sm:text-base">
                            Idr 40.000
                        </h5>
                        </div>

                        <div className="flex flex-col gap-2 text-gray-500">
                        <div className="flex items-center gap-1">
                            <i className="h-3.5 w-fit" data-feather="refresh-ccw"></i>
                            <p className="text-xs sm:text-base">Status</p>
                        </div>
                        <h5
                            className="font-semibold text-slate-700 text-xs bg-orange-200 p-1.5 rounded-3xl translate-y-[-0.3rem] w-fit "
                        >
                            On Progress
                        </h5>
                        </div>
                    </div>

                    <a className="text-slate-700 underline text-xs sm:text-base" href="#"
                        >Views Order Detail</a
                    >
                    </div>
                </div>

                <div className="flex gap-4 items-center p-2 bg-gray-100 text-sm">
                    <div className="hidden sm:block">
                    <img src="./assets/history-order-image.jpg" />
                    </div>

                    <div className="flex-1 flex flex-col gap-4">
                    <div
                        className="grid grid-cols-2 place-content-between gap-y-6 sm:flex justify-between"
                    >
                        <div className="flex flex-col gap-2 text-gray-500">
                        <div className="flex items-center gap-1">
                            <i className="h-3.5 w-fit" data-feather="coffee"></i>
                            <p className="text-xs sm:text-base">No. Order</p>
                        </div>
                        <h5 className="font-semibold text-black text-xs sm:text-base">
                            #12354-09893
                        </h5>
                        </div>

                        <div className="flex flex-col gap-2 text-gray-500">
                        <div className="flex items-center gap-1">
                            <i className="h-3.5 w-fit" data-feather="calendar"></i>
                            <p className="text-xs sm:text-base">Date</p>
                        </div>
                        <h5 className="font-semibold text-black text-xs sm:text-base">
                            23 January 2023
                        </h5>
                        </div>

                        <div className="flex flex-col gap-2 text-gray-500">
                        <div className="flex items-center gap-1">
                            <i className="h-3.5 w-fit" data-feather="repeat"></i>
                            <p className="text-xs sm:text-base">Total</p>
                        </div>
                        <h5 className="font-semibold text-black text-xs sm:text-base">
                            Idr 40.000
                        </h5>
                        </div>

                        <div className="flex flex-col gap-2 text-gray-500">
                        <div className="flex items-center gap-1">
                            <i className="h-3.5 w-fit" data-feather="refresh-ccw"></i>
                            <p className="text-xs sm:text-base">Status</p>
                        </div>
                        <h5
                            className="font-semibold text-slate-700 text-xs bg-orange-200 p-1.5 rounded-3xl translate-y-[-0.3rem] w-fit"
                        >
                            On Progress
                        </h5>
                        </div>
                    </div>

                    <a className="text-slate-700 underline text-xs sm:text-base" href="#"
                        >Views Order Detail</a
                    >
                    </div>
                </div>

                <div className="flex gap-4 items-center p-2 bg-gray-100 text-sm">
                    <div className="hidden sm:block">
                    <img src="./assets/history-order-image.jpg" />
                    </div>

                    <div className="flex-1 flex flex-col gap-4">
                    <div
                        className="grid grid-cols-2 place-content-between gap-y-6 sm:flex justify-between"
                    >
                        <div className="flex flex-col gap-2 text-gray-500">
                        <div className="flex items-center gap-1">
                            <i className="h-3.5 w-fit" data-feather="coffee"></i>
                            <p className="text-xs sm:text-base">No. Order</p>
                        </div>
                        <h5 className="font-semibold text-black text-xs sm:text-base">
                            #12354-09893
                        </h5>
                        </div>

                        <div className="flex flex-col gap-2 text-gray-500">
                        <div className="flex items-center gap-1">
                            <i className="h-3.5 w-fit" data-feather="calendar"></i>
                            <p className="text-xs sm:text-base">Date</p>
                        </div>
                        <h5 className="font-semibold text-black text-xs sm:text-base">
                            23 January 2023
                        </h5>
                        </div>

                        <div className="flex flex-col gap-2 text-gray-500">
                        <div className="flex items-center gap-1">
                            <i className="h-3.5 w-fit" data-feather="repeat"></i>
                            <p className="text-xs sm:text-base">Total</p>
                        </div>
                        <h5 className="font-semibold text-black text-xs sm:text-base">
                            Idr 40.000
                        </h5>
                        </div>

                        <div className="flex flex-col gap-2 text-gray-500">
                        <div className="flex items-center gap-1">
                            <i className="h-3.5 w-fit" data-feather="refresh-ccw"></i>
                            <p className="text-xs sm:text-base">Status</p>
                        </div>
                        <h5
                            className="font-semibold text-slate-700 text-xs bg-orange-200 p-1.5 rounded-3xl translate-y-[-0.3rem] w-fit "
                        >
                            On Progress
                        </h5>
                        </div>
                    </div>

                    <a className="text-slate-700 underline text-xs sm:text-base" href="#"
                        >Views Order Detail</a
                    >
                    </div>
                </div>

                <div className="flex gap-4 items-center p-2 bg-gray-100 text-sm">
                    <div className="hidden sm:block">
                    <img src="./assets/history-order-image.jpg" />
                    </div>

                    <div className="flex-1 flex flex-col gap-4">
                    <div
                        className="grid grid-cols-2 place-content-between gap-y-6 sm:flex justify-between"
                    >
                        <div className="flex flex-col gap-2 text-gray-500">
                        <div className="flex items-center gap-1">
                            <i className="h-3.5 w-fit" data-feather="coffee"></i>
                            <p className="text-xs sm:text-base">No. Order</p>
                        </div>
                        <h5 className="font-semibold text-black text-xs sm:text-base">
                            #12354-09893
                        </h5>
                        </div>

                        <div className="flex flex-col gap-2 text-gray-500">
                        <div className="flex items-center gap-1">
                            <i className="h-3.5 w-fit" data-feather="calendar"></i>
                            <p className="text-xs sm:text-base">Date</p>
                        </div>
                        <h5 className="font-semibold text-black text-xs sm:text-base">
                            23 January 2023
                        </h5>
                        </div>

                        <div className="flex flex-col gap-2 text-gray-500">
                        <div className="flex items-center gap-1">
                            <i className="h-3.5 w-fit" data-feather="repeat"></i>
                            <p className="text-xs sm:text-base">Total</p>
                        </div>
                        <h5 className="font-semibold text-black text-xs sm:text-base">
                            Idr 40.000
                        </h5>
                        </div>

                        <div className="flex flex-col gap-2 text-gray-500">
                        <div className="flex items-center gap-1">
                            <i className="h-3.5 w-fit" data-feather="refresh-ccw"></i>
                            <p className="text-xs sm:text-base">Status</p>
                        </div>
                        <h5
                            className="font-semibold text-slate-700 text-xs bg-orange-200 p-1.5 rounded-3xl translate-y-[-0.3rem] w-fit"
                        >
                            On Progress
                        </h5>
                        </div>
                    </div>

                    <a className="text-slate-700 underline text-xs sm:text-base" href="#"
                        >Views Order Detail</a
                    >
                    </div>
                </div>
                </div>

                <div className="flex gap-2 justify-center">
                <div
                    className="flex justify-center items-center bg-slate-700 text-xs sm:text-sm rounded-full h-6 w-6 sm:h-8 sm:w-8"
                >
                    <h3>1</h3>
                </div>

                <div
                    className="flex justify-center items-center text-[#A0A3BD] text-xs sm:text-sm bg-[#E8E8E8] rounded-full h-6 w-6 sm:h-8 sm:w-8"
                >
                    <h3>2</h3>
                </div>

                <div
                    className="flex justify-center items-center text-[#A0A3BD] text-xs sm:text-sm bg-[#E8E8E8] rounded-full h-6 w-6 sm:h-8 sm:w-8"
                >
                    <h3>2</h3>
                </div>

                <div
                    className="flex justify-center items-center text-[#A0A3BD] text-xs sm:text-sm bg-[#E8E8E8] rounded-full h-6 w-6 sm:h-8 sm:w-8"
                >
                    <h3>4</h3>
                </div>

                <div
                    className="flex justify-center items-center bg-slate-700 rounded-full h-6 w-6 sm:h-8 sm:w-8"
                >
                    <i className="text-white h-4 sm:h-auto" data-feather="arrow-right"></i>
                </div>
                </div>
            </div>

            <div
                className="flex-1 flex flex-col gap-2 border border-[#E8E8E8] h-fit p-2 mt-4 sm:mt-0"
            >
                <div className="relative bg-black rounded-2xl w-fit p-1.5 flex">
                <i className="text-white" data-feather="message-square"></i>
                <i
                    className="absolute top-2.5 text-slate-700 h-3"
                    data-feather="align-right"
                ></i>
                </div>
                <h4 className="text-gray-500 font-bold text-sm">Send Us Message</h4>
                <p className="text-gray-500 text-xs">
                if your unable to find answer or find your product quickly, please
                describe your problem and tell us. we will give you solution.
                </p>
                <button className="text-xs bg-slate-700 p-1.5 rounded-md">
                Send Message
                </button>
            </div>
            </div>
            {/* history order */}
            <Footer />
        </body>
        </>
    )
}
export default HistoryOrder