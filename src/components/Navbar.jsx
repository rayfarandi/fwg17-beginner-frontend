import axios from "axios";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiSearch, FiUser, FiArchive } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../redux/reducers/auth";
import { setProfile as setProfileAction} from '../redux/reducers/profile'

import CupCoffee from "../assets/images/cup-coffee-icon-white.png";
import TextLogo from "../assets/images/text-logo-white.png";
import defaultPhoto from '../assets/images/default-photo-profil.jpeg'


const LinkNav = ({mobile, destination, value,}) => {
  return (
      <Link
      to={destination}
      // className={` base-100 ${!mobile ? 'hidden sm:block' : ''} ${handlective ? 'border-b-2 border-primary' : ''}`}
      className={` base-100 ${!mobile ? 'hidden sm:block' : ''} ${document.URL.endsWith(destination) && 'border-b-2 border-primary' }`}
    >
      {value}
    </Link>
  )
}

const Navbar = ({home}) => {

  const [navMobile, setNavMobile] = useState(false)
  const [navSearch, setNavSearch] = useState(false)
  const [homeActive, setHomeActive] = useState(false)
  const [productActive, setProductActive] = useState(false)
  const navigate = useNavigate()

  const token = useSelector(state => state.auth.token)
  const dataProfile = useSelector(state => state.profile.data)
  const dispatch = useDispatch()
  
  const getProfile =  async () => {
    if(token){
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_SERVER_URL}/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
  
        dispatch(setProfileAction(data.results))
      } catch (error) {
        console.log(error)
      }
    }
  }

  const onLogout = () => {
    dispatch(logoutAction())
    navigate('/')
  }



  useEffect(() => {
    getProfile()
    

    if (document.URL.endsWith('/')) {
      setHomeActive(true);
      setProductActive(false);
    } else {
      setProductActive(true);
      setHomeActive(false);
    }
  
   
  },[])

  return (
    <nav
      className={`fixed w-full h-fit py-3 sm:py-0 sm:h-14 flex flex-col gap-4 items-center  ${
        home ? "bg-[#00000021]"  : "bg-black"
      } z-50`}
    >
      <div className="flex justify-between items-center sm:h-full w-5/6">
        <div className="flex sm:gap-12 ">
          <div className="flex gap-4">
            <div>
            <Link to="/">
              <img src={CupCoffee} />
            </Link>
            </div>
            <div>
              <img src={TextLogo} />
            </div>
          </div>
          <div className="flex gap-12">
            <LinkNav destination="/" value="Home" handlective={homeActive} />
            <LinkNav destination="/products" value="Product" handleActive={productActive}
            />
          </div>
        </div>

        <div className="relative flex items-center gap-2 sm:gap-5 sm:w-[32rem] justify-end">
          <form
            className={`${
              !navSearch ? "hidden" : "flex"
            } absolute items-center ${
              token ? "left-[-2.2rem]" : "left-4"
            } border border-white rounded w-60 py-1 px-1.5 transition-all`}
          >
            <input
              className="bg-transparent base-100 placeholder-white text-base w-52 flex px-1 outline-none "
              type="text"
              placeholder="search"
            />
            <button className="hidden" type="submit"></button>
          </form>
          <FiSearch
            onClick={() => setNavSearch(!navSearch)}
            color="white"
            className="text-2xl base-100 hidden sm:block z-50 active:scale-90 transition-all cursor-pointer"
          />
          <Link to="/history-order">
            <FiArchive
              color="white"
              className="text-2xl hidden sm:block base-10 active:scale-90 transition-all"
            />
          </Link>
          <Link to="/checkout">        
            <FiShoppingCart
              color="white"
              className="text-2xl hidden sm:block base-100 active:scale-90 transition-all"
            />
          </Link>

          {token && dataProfile && (
            <div className="flex-1 flex justify-end items-center sm:hidden ">
              <div>
                <img
                  className="rounded-full w-8 h-8 object-cover"
                  src={dataProfile && dataProfile.picture ? `${import.meta.env.VITE_SERVER_URL}/uploads/users/${dataProfile.picture}` : defaultPhoto}
                ></img>
              </div>
            </div>
          )}

          <FiMenu
            onClick={() => setNavMobile(!navMobile)}
            className="text-2xl sm:hidden base-100 active:scale-90 transition-all"
          />
          {token && dataProfile ? (
            <>
              <div className="hidden sm:block">
                <img
                  className="rounded-full w-8 h-8 object-cover"
                  src={dataProfile && dataProfile.picture ? `${import.meta.env.VITE_SERVER_URL}/uploads/users/${dataProfile.picture}` : defaultPhoto}
                ></img>
              </div>
              <Link
                to="/profile"
                className="bg-gradient-to-br base-100 from-primary to-black py-2 px-3 text-sm rounded hidden sm:block active:scale-95 transition-all"
              >
                Profile
              </Link>
              <button
                onClick={onLogout}
                type="button"
                className="bg-gradient-to-br base-100 from-primary to-black py-2 px-3 text-sm rounded hidden sm:block active:scale-95 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="base-100 border border-white py-2 px-3 text-sm rounded hidden sm:block active:scale-95 transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-br from-primary to-black py-2 px-3 base-100 text-sm rounded hidden sm:block active:scale-95 transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      <div
        className={`${
          !navMobile ? "hidden" : "flex"
        } sm:hidden flex-col gap-3 w-5/6 h-fit`}
      >
        <div className="w-full flex justify-between items-center base-100 h-6">
          <div className="flex-1 flex items-center gap-4">
            <LinkNav mobile={true} destination="/" value="Home" />
            <LinkNav mobile={true} destination="/products" value="Product" />
          </div>
          <Link to="/history-order">
            <FiArchive
              color="white"
              className="text-2xl base-100 active:scale-90 transition-all"
            />
          </Link>
          <Link to="/checkout">
            <FiShoppingCart
              color="white"
              className="text-2xl base-100 active:scale-90 transition-all"
            />
          </Link>
        </div>

        <form className="flex-1 flex items-center gap-2 w-full border border-white rounded py-1 px-2">
          <FiSearch color="white" size={23} />
          <input
            className="bg-transparent base-100 text-sm outline-none placeholder-white w-full"
            type="text"
            placeholder="search"
          />
          <button type="submit" className="hidden"></button>
        </form>

        {token ? (
          <div className="flex flex-col gap-4">
          <div className="bg-gradient-to-br from-primary to-black py-1 px-2 text-sm rounded w-full text-center active:scale-90 transition-all">

          <Link
            to="/profile"
            className="base-100 "
          >
            Profile
          </Link>
          </div>
          
          <button
            type="button"
            onClick={onLogout}
            className="base-100 bg-gradient-to-br from-primary to-black py-1 px-2 text-sm rounded w-full text-center active:scale-90 transition-all"
          >
            Logout
          </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              className="flex-1 base-100 border border-white py-1 px-2 text-sm rounded w-full text-center active:scale-90 transition-all"
              to="/login"
            >
              Sign In
            </Link>
            <Link
              className="flex-1 bg-gradient-to-br from-primary to-black py-1 px-2 text-sm rounded w-full text-center active:scale-90 transition-all"
              to="/register"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
