import React from "react";
import * as Icon from "react-feather"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import defaultInsertImage from "../assets/images/insertimage.jpg" 
import { useDispatch, useSelector } from "react-redux";
import { setProfile as setProfileAction } from "../../redux/reducers/profile";


const Profile =()=>{
    // const [user,setUser] =React.useState({})
    const user = useSelector (state =>state.profile.data)
    const [successMessage,setSuccessMessage] = React.useState(null)
    const [preview, setPreview] = React.useState()
    // const token = window.localStorage.getItem('token')
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()

    // React.useEffect(()=>{
    //     axios.get('http://localhost:8888/profile',{
    //         headers:{
    //             'Authorization': `Bearer ${token}`
    //         }
    //     }).then(({data})=>{
    //         setUser(data.results)
    //     })
    // },[])

    // const getProfile =async()=>{
    //     const {data}= await axios.get('http://localhost:8888/profile',{
    //                 headers:{
    //                     'Authorization': `Bearer ${token}`
    //                 }
    //     })
    //     setUser(data.results)
    // }
    React.useEffect(()=>{
        // getProfile()
    },[])
    

    React.useEffect(()=>{
        if(successMessage){
            setTimeout(()=>{
                setSuccessMessage(null)
            },2000)
        }
    },[successMessage])

    const updateProfileData = async(event)=>{
        
        event.preventDefault()
        const form = new FormData()
        const fields = ['fullName','email','address','phoneNumber','password']
        fields.forEach((field)=>{
            if(event.target[field]){
                form.append(field, event.target[field].value)
            }
        })
        // if(event.target.fullName){
        //     form.append('fullName',event.target.fullName.value)
        // }
        // if(event.target.email){
        //     form.append('email',event.target.email.value)
        // }
        // if(event.target.address){
        //     form.append('address',event.target.address.value)
        // }
        // if(event.target.phoneNumber){
        //     form.append('phoneNumber',event.target.phone.value)
        // }

        const {data} = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/profile`,form,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        setSuccessMessage(data.message)
        // setUser(data.results)
        dispatch(setProfileAction(data.results))

    }
    const changePicture = (event)=>{
        const pictureUrl = URL.createObjectURL(event.target.files[0])
        setPreview(pictureUrl)
    }
    const uploadPhoto = async(event)=>{
        event.preventDefault()
        try{
            const [file] = event.target.picture.files
        if(file){
            const form = new FormData()
            form.append('picture',file)
            const {data} = await axios.patch('${import.meta.env.VITE_BACKEND_URL}/profile',form,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
            })
            window.alert(data.message)
            // setUser(data.results)
            dispatch(setProfileAction(data.results))
            setPreview(null)
        }
        }catch(error){
            window.alert(error.response.data.message)
        }
    }
    return(
        <>
        <div className="flex flex-col items-center">
            <Navbar bg='#000000' />

        {/* profile form */}
    <h1 className="w-5/6 mt-24 text-3xl font-bold">Profile</h1>
    <div className="w-5/6 flex flex-col sm:flex-row gap-4">
    
      <form onSubmit={uploadPhoto} className="w-full sm:w-1/5 border border-gray-500 h-fit flex flex-col items-center p-4 gap-3">
        <div className="flex flex-col items-center">
          <h2 className="font-bold">{user.fullName}</h2>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
        <label className="flex flex-col items-center gap-2">
            {(!user.picture && !preview) && <img className="rounded-full w-28 h-28" src={defaultInsertImage} alt="profile picture" />}
            {(!preview && user.picture)&& <img className="rounded-full w-28 h-28 object-cover" src={preview? preview : `${import.meta.env.VITE_BACKEND_URL}/uploads/profile/${user.picture} `} alt="profile picture" />}
            {preview && <img className="rounded-full w-28 h-28" src={preview} alt="profile picture" />}
            {preview && <div className="absolute bg-[rgb(0,0,0,0.5)] rounded-full w-28 h-28 top-[12.5rem]" />}

        <input multiple={false} accept=".jpg,.jpeg,.png" onChange={changePicture} className="hidden" type="file" name="picture" />

        </label>
        <div className={`${!preview ? 'hidden' :''} flex justify-between`}>
        <button className="text-xs bg-green-500 w-full rounded p-2" type="submit">Confrim Photo</button>
        <button onClick={()=>{setPreview()}} className="text-xs bg-red-500 w-full rounded p-2" type="reset">Cencel Photo</button>
        </div>
        <button className={`${preview ? 'hidden' :''} text-xs bg-slate-700 w-full rounded p-2`} type="submit">Upload New Photo</button>
        <p className="text-xs text-gray-500">Since <span className="font-bold">{user.createdAt?.slice(0,-14).split('-').reverse().join('-')}</span></p>
      </form>
      
      <form onSubmit={updateProfileData} className="flex-1 border border-gray-500 p-4 flex flex-col gap-6 outline-none">
        {successMessage &&<div className="bg-green-200 text-green-700 border-green-700 border-solid p-5 rounded">{successMessage}</div>}
          <div className="flex flex-col gap-1">
            <label>
                <div  className="font-bold text-sm">Full Name</div>
            <div className="flex border border-[#DEDEDE] rounded-md text-gray-500 p-2 gap-2">
              <Icon.User/>
              <input defaultValue={user.fullName} className="text-xs w-full outline-none"  type="text" placeholder="Enter Your Full Name" name="fullName"/>
            </div>
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label>
                <div className="font-bold text-sm">Email</div>
            <div className="flex border border-[#DEDEDE] rounded-md text-gray-500 p-2 gap-2">
              <Icon.Mail/>
              <input defaultValue={user.email} className="text-xs w-full outline-none" type="email" placeholder="Enter Your Email" name="email"/>
            </div>
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label>
                <div className="font-bold text-sm">Phone</div>
            <div className="flex  border border-[#DEDEDE] rounded-md text-gray-500 p-2 gap-2">
              <Icon.Phone/>
              <input defaultValue={user.phoneNumber} className="text-xs w-full outline-none" type="text" placeholder="Enter Your Phone Number" name="phoneNumber"/>
            </div>
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label>
                <div className="font-bold text-sm">Password</div>
            <div className="flex border border-[#DEDEDE] rounded-md text-gray-500 p-2 gap-2">
              <Icon.Lock/>
              <input defaultValue={user.password} htmlFor={'password'}className="text-xs w-full outline-none" type="password" placeholder="Enter Your Password" name="password"/>
            </div>
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label>
                <div className="font-bold text-sm">Address</div>
            <div className="flex border border-[#DEDEDE] rounded-md text-gray-500 p-2 gap-2">
              <Icon.MapPin/>
              <input defaultValue={user.address} className="text-xs w-full outline-none" type="text" placeholder="Enter Your Adress" name="address"/>
            </div>
            </label>
          </div>
        <div>
        <button className="w-full bg-slate-700 rounded text-xs p-2" type="submit">Update Profile</button>
        </div>
          
        </form>
      
    </div>
    {/* profile form */}

        <Footer/>
        </div>
        
        
        
        </>
    )
}

export default Profile