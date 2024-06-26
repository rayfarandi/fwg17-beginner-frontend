import CupCoffee from "../assets/images/cup-coffe-icon.png"
import TextLogo from "../assets/images/text-logo.png"
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"
import { Link } from "react-router-dom";

const FooterLink = ({destination1, text1, destination2, text2, destination3, text3, destination4, text4, destination5, text5}) => {
  return (
    <div className="flex flex-col gap-4 text-sm sm:text-base">
      <p className="font-semibold">Product</p>
      <div className="flex flex-col gap-2 text-[#4F5665]">
        <Link to={destination1}>{text1}</Link>
        <Link to={destination2}>{text2}</Link>
        <Link to={destination3}>{text3}</Link>
        <Link to={destination4}>{text4}</Link>
        <Link to={destination5}>{text5}</Link>
      </div>
    </div>
  );
};

const Footer = () => {

    return (
    <footer className="flex justify-center items-center w-full h-fit py-6 sm:h-fit sm:py-12 bg-base-200">
        <div className="flex flex-col w-5/6 gap-6 sm:gap-0">
  
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-20">
            <div className={`flex flex-col gap-4 w-full sm:w-[21rem]`}>
              <div className="flex gap-4">
                <div>
                  <img src={CupCoffee} />
                </div>
                <div>
                  <img src={TextLogo} />
                </div>
              </div>
              <p className="text-content text-sm sm:text-base">
                Coffee Shop is a store that sells some good meals, and especially
                coffee. We provide high quality beans
              </p>
            </div>
  
            <div className="flex gap-5 sm:gap-20">
              <FooterLink destination1="#" text1="Our Product" 
              destination2="#" text2="Pricing"
              destination3="#" text3="Location"
              destination4="#" text4="Countries"
              destination5="#" text5="Blog"/>

              <FooterLink destination1="#" text1="Partner" 
              destination2="#" text2="FAQ"
              destination3="#" text3="About Us"
              destination4="#" text4="Privacy Policy"
              destination5="#" text5="Terms of Service"/>
            </div>
  
            <div className="flex flex-col gap-4 text-sm sm:text-base">
              <p className="font-semibold">Social media</p>
              <div className="flex gap-4">
                <Link to="#" className="duration-300 bg-primary rounded-3xl text-lg sm:text-xl p-1.5 h-fit sm:p-2 text-white"><FaFacebookF/></Link>
                <Link to="#" className="duration-300 bg-primary rounded-3xl text-lg sm:text-xl p-1.5 h-fit sm:p-2 text-white"><FaTwitter/></Link>
                <Link to="#" className="duration-300 bg-primary rounded-3xl text-lg sm:text-xl p-1.5 h-fit sm:p-2 text-white"><FaInstagram /></Link>
              </div>
            </div>
          </div>
  
          <p className="text-content text-xs sm:text-sm" id="copyright">&copy;2024CoffeeStore</p>
  
        </div>
      </footer>
    )
}

export default Footer