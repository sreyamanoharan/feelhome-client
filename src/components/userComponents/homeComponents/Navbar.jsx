import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../store/slice/User";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../../api/axios";
import { CgMenu } from "react-icons/cg";

const Navbar = () => {
  const [details, setDetails] = useState("");
  const [showOption,setShowOption] = useState(false)
  const userId = useSelector((state) => state.User.userId);
  console.log(userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/getUser/${userId}`).then((res) => {
      setDetails(res?.data?.users);
    });
  }, [userId]);

  const isLinkActive = (pathname) => {
    return location.pathname === pathname;
  };

  return (
    <div className="flex justify-between h-20 mt bg-blue-900 shadow-lg fixed top-0  w-full z-50">
      <Link
        to="/"
        className="flex items-center px-10 font-normal  justify-start  normal-case text-3xl w-1/2 text-white"
        style={{
          fontFamily: '"Playwrite ES Deco Guides", serif',
          
          fontStyle: "normal",
        }}
      >
        feelHome
      </Link>

      <div className="flex xl:flex   w-1/2  items-center justify-start">
        <Link
          to="/host/hostHome"
          className="flex  px-4  mr-4 text-white text-xl hover:underline"
          style={{ fontFamily: '"Oswald", serif' }}
        >
          Host your Home
        </Link>
        <Link
          to="/bookings"
          className={`px-4 py-2 mr-4 text-white text-xl ${
            isLinkActive("/bookings")
              ? "underline text-green-700"
              : "hover:underline"
          }`}
          style={{ fontFamily: '"Oswald", serif' }}
        >
          My Bookings
        </Link>

        <Link
          to="/allProperties"
          className={`text-white text-xl ${
            isLinkActive("/allProperties") ? "underline" : "hover:underline"
          }`}
          style={{ fontFamily: '"Oswald", serif' }}
        >
          All Properties
        </Link>
     
      </div>

      <div className="flex flex-col  relative h-full  justify-start  px-4    ">
          <div className="flex   h-full items-center   w-full   cursor-pointer justify-end " onClick={()=>setShowOption(!showOption)}>
            <div className="w-10 rounded-full">
              <img className="rounded-full" src={details?.profileImage} />
            </div>
          </div>
          {showOption&&
          <div
          
            className=" bg-gray-700 absolute hover:text-red mt-16   right-4 cursor-pointer rounded   z-[1] p-2 shadow   w-52"
          >
            <div>
              <a
                onClick={() => {
                  navigate("/userProfile");
                }}
                className="justify-between text-white"
              >
                Profile
              </a>
            </div>
            <div className="mt-4">
              <a
                className="text-white"
                onClick={() => {
                  dispatch(userLogout());
                  navigate("/userLogin");
                }}
              >
                Logout
              </a>
            </div>
          </div>
}
      </div>

      <div className="xl:hidden block dropdown dropdown-end">
        <label tabIndex={0}>
          <CgMenu className="w-8 h-8" />
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] shadow bg-red-900 pl-6 rounded-lg leading-8 w-52"
        >
          <div
            className="flex gap-3 mb-2"
            onClick={() => {
              navigate("/userProfile");
            }}
          >
            <img
              src={details?.profileImage}
              className="w-8 h-8 rounded-full"
            />
            <h1>Profile</h1>
          </div>
          <Link to="/host/hostHome" className="text-white">
            Host your Home
          </Link>
          <Link to="/bookings" className="text-white">
            My Bookings
          </Link>
          <Link to="/allProperties" className="text-white">
            All Properties
          </Link>
          <Link to="/userChat" className="text-white">
            Chat
          </Link>
          <h1
            className="text-white"
            onClick={() => {
              dispatch(userLogout()), navigate("/userLogin");
            }}
          >
            Logout
          </h1>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
