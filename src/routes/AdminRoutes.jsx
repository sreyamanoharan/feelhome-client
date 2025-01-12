import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Categorylist from '../components/adminComponents/CategoryComponents/Categorylist'
import MainFeature from '../components/adminComponents/Features/mainFeature'
import { useSelector} from 'react-redux'
import AdminNav from '../components/adminComponents/AdminNav'
import MainBanner from '../components/adminComponents/BannerComponents/MainBanner'
import AdminHome from '../components/adminComponents/AdminHome'
import AdminLogin from '../components/Login/AdminLogin'
import UserList from '../components/adminComponents/UserList'
import AdminProtected from '../components/adminComponents/AdminProtected'


function AdminRoutes(){
   
    return(
        <Routes>
            <Route element={<AdminNav/>}>
            <Route path='/categoryList' element={<AdminProtected><Categorylist/></AdminProtected>}></Route>
            <Route path='/MainFeature' element={<AdminProtected><MainFeature/></AdminProtected>}></Route>
            <Route path='/MainBanner' element={<AdminProtected><MainBanner/></AdminProtected>}/><Route/>
            <Route path='/home' element={<AdminHome/>}></Route>
            <Route path='/userList' element={<AdminProtected><UserList/></AdminProtected>}></Route>
            </Route>
            <Route path='/adminLogin' element={<AdminLogin/>}></Route>
        </Routes>
    )
}
export default AdminRoutes