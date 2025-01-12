import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserLogin from "./components/Login/UserLogin";
import Register from "./components/Register";
import VerifyEmail from "./pages/userPages/VerifyEmail";
import Home from "./pages/userPages/Home";
import Catpage from "./pages/userPages/Catpage";
import { useSelector } from "react-redux";
import UserProfiles from "./pages/userPages/mainPages/UserProfiles";
// import AdminLogin from './components/Login/AdminLogin'
import Check from "./pages/check";
// import PropDetails from './components/hostComponents/propDetails'
// import HomeData from './components/userComponents/homeComponents/homeData'
import AllProperties from "./pages/userPages/mainPages/allProperties";
import PropertyDetails from "./pages/userPages/mainPages/PropertyDetails";
import PaymentDetails from "./components/userComponents/mainComponents/paymentDetails";
// import MainBanner from './components/adminComponents/BannerComponents/MainBanner'
import AdminRoute from './routes/AdminRoutes'
import HostRoute from './routes/HostRoutes'
import PaymentFail from './components/userComponents/mainComponents/PaymentFail'
import PaymentSuccess from './components/userComponents/mainComponents/PaymentSuccess'
import Bookings from './pages/userPages/mainPages/Booking'
import Chat from './components/userComponents/mainComponents/UserChat'
import LatestProperties from './components/userComponents/homeComponents/LatestProperties'
import Chat from './pages/userPages/mainPages/Chat'
import ProtectedRoute from './components/userComponents/ProtectRouter'
import ResetPassword from './components/Login/ResetPassword'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/resetPassword/:userId" element={<ResetPassword />} />

        <Route path="/check" element={<Check />} />

        <Route path="/verifyMail/:userId" element={<VerifyEmail />} />

        <Route path="/Catpage" element={<Catpage />} />

        {/* <Route path='/admin/addBanner' element={<MainBanner/>}/>
    <Route path='/adnav' element={<AdminNav/>}/> */}
        {/* <Route path='/userProfile/:userId' element={<UserProfile/>}/> */}
        <Route
          path="/userProfile"
          element={
            <ProtectedRoute>
              <UserProfiles />
            </ProtectedRoute>
          }
        ></Route>
        {/* <Route path="/userProfile" element={<ProtectedRoute element={<UserProfile />} />} /> */}
        {/* <Route path='/admin/categorylist' element={<Categorylist/>}/>
    <Route path='/admin/login' element={<AdminLogin/>}/> 
    <Route path='/admin/mainFeature' element={<MainFeature/>}/> 
    <Route path='/admin/typeFeature' element={<TypeFeature/>}/>  */}
        {/* <Route path='/admin/login' element={<AdminLogin/>}/>  */}

        <Route
          path="/allProperties"
          element={
            <ProtectedRoute>
              <AllProperties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/propertyDetails/:id"
          element={
            <ProtectedRoute>
              <PropertyDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/paymentDetails"
          element={
            <ProtectedRoute>
              <PaymentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/paymentSuccess/:load"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/paymentFail"
          element={
            <ProtectedRoute>
              <PaymentFail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userChat/:hostId"
          element={
            <ProtectedRoute>
              <Chat role={"user"} />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/host/*" element={<HostRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
