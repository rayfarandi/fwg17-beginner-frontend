import FormAuth from "../components/FormAuth";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()

  const authRegister = async (event) => {
    event.preventDefault();
    const { value: fullName } = event.target.fullName;
    const { value: email } = event.target.email;
    const { value: password } = event.target.password;
    const { value: confirmPassword } = event.target.confirmPassword;
    const { value: address} = event.target.address;
    
    
      const form = new URLSearchParams();
      form.append("email", email);
      form.append("password", password);
      form.append("confirmPassword", confirmPassword)
      form.append("fullName", fullName);
      form.append("address",address);

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, form.toString());
        console.log(data)

        setSuccessMessage(data.message)
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/login")
        }, 2000);
      } catch (err) {
        setErrorMessage(err.response.data.message);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    
  };

  return (
    <div className="flex m-0 p-0 h-[46rem] 2xl:h-screen">
      <div
        className="hidden sm:block sm:w-2/5 md:w-2/6 lg:w-1/4
          bg-[url('../assets/images/bg-register.jpg')] bg-center bg-cover"
      ></div>

      <div className="flex flex-1 items-center justify-center">
        <div className={`fixed top-10 py-2 px-4 bg-white shadow-md text-green-400 rounded text-sm flex justify-center items-center font-bold ${success ? "block" : "hidden"}`}>
          <h1>{successMessage}</h1>
        </div>

        <div className={`fixed top-10 py-2 px-4 bg-white shadow-md text-red-500 rounded text-sm flex justify-center items-center font-bold ${error ? "block" : "hidden"}`}>
          <h1>{errorMessage}</h1>
        </div>

        <FormAuth handleAuth={authRegister} type="Register" />
      </div>
    </div>
  );
};

export default Register;
