import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import HostHome from '../pages/HostPages/HostHome'
import HostProps from '../pages/HostPages/HostProp'
import HostPage from '../components/hostComponents/HostPage'
import HostType from '../components/hostComponents/HostType'
// import HostPlace from '../components/hostComponents/hostPlace'
import HostLocation from '../components/hostComponents/HostLocation'
import HostAddress from '../components/hostComponents/HostAddress'
import Test from '../components/hostComponents/Test'
import HostBasics from '../components/hostComponents/HostBasics'
import HostStPlace from '../components/hostComponents/HostStPlace'
import HostAmenities from '../components/hostComponents/HostAmenities'
import HostPhotos from '../components/hostComponents/HostPhotos'
import HostFinish from '../components/hostComponents/HostFinish'
import HostPrice from '../components/hostComponents/HostPrice'
import HostFinal from '../components/hostComponents/HostFinal'
import HostNavbar from '../components/hostComponents/HostNavbar'
import PropDetails from '../pages/HostPages/PropDetails'
import HostDescription from '../components/hostComponents/HostDescription'
import HostChat from '../pages/HostPages/HostChat'
import { useSelector } from 'react-redux'
import ProtectedRoute from '../components/userComponents/ProtectRouter'

function HostRoute(){

    const token=useSelector((state)=>state.User.token)
return (
    <Routes>
                <Route path='/test' element={<Test/>}/>

        <Route path='/hostHome' element={<HostHome/>}/>
        <Route path='/hostProps' element={<ProtectedRoute><HostProps/></ProtectedRoute>}/>
        <Route path='/hostPage' element={<ProtectedRoute><HostPage/></ProtectedRoute>}/>
        <Route path='/hostType' element={<ProtectedRoute><HostType/></ProtectedRoute>}/>
        {/* <Route path='/hostPlace' element={<ProtectedRoute><HostPlace/></ProtectedRoute>}/> */}
        <Route path='/hostLocation' element={<ProtectedRoute><HostLocation/></ProtectedRoute>}/>
        <Route path='/hostAddress' element={<ProtectedRoute><HostAddress/></ProtectedRoute>}/>
        <Route path='/test' element={<Test/>}/>
        <Route path='/hostBasics' element={<ProtectedRoute><HostBasics/></ProtectedRoute>}/>
        <Route path='/hostStPlace' element={<ProtectedRoute><HostStPlace/></ProtectedRoute>}/>
        <Route path='/hostAmenities' element={<ProtectedRoute><HostAmenities/></ProtectedRoute>}/>
        <Route path='/hostPhotos' element={<ProtectedRoute><HostPhotos/></ProtectedRoute>}/>
        <Route path='/hostFinish' element={<ProtectedRoute><HostFinish/></ProtectedRoute>}/>
        <Route path='/hostPrice' element={<ProtectedRoute><HostPrice/></ProtectedRoute>}/>
        <Route path='/hostFinal' element={<ProtectedRoute><HostFinal/></ProtectedRoute>}/>
        <Route path='/hostDescription' element={<ProtectedRoute><HostDescription/></ProtectedRoute>}/>
 
        <Route path='/hostNav' element={<HostNavbar/>}/>
        <Route path='/propDetails/:id' element={<ProtectedRoute><PropDetails/></ProtectedRoute>}/>
        <Route path='/chat' element={<ProtectedRoute><HostChat  role={'host'}/></ProtectedRoute>}/>


    </Routes>

)
  

}

export default HostRoute


