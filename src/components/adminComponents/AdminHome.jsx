import React, { useEffect, useState } from 'react'
import MiniCalendar from "./components/calendar/MiniCalendar";
import WeeklyRevenue from "./components/WeeklyRevenue";
import TotalSpent from "./components/TotalSpent";
import PieChartCard from "./components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { columnsDataCheck, columnsDataComplex } from "./components/columnsData";
import Widget from "./components/Widget";
import CheckTable from "./components/CheckTable";
import ComplexTable from "./components/ComplexTable";
import DailyTraffic from "./components/DailyTraffic";
import TaskCard from "./components/TaskCard";
import tableDataCheck from "./components/tableDataCheck.json";
import tableDataComplex from "./components/tableDataComplex.json";
import axiosInstance from '../../api/axios';

const AdminHome = () => {
  const [revenue, setRevenue] = useState('')
  const [reload,setReload]=useState('')
  const [users,setUsers]=useState('')

  useEffect(() => {
    axiosInstance.get('/admin/adminRevenue').then((res) => {
      setRevenue(res?.data?.revenue)
    }).catch((error) => {
      console.log(error);
    })
     
    axiosInstance.get('/admin/latestUsers').then((res)=>{
      setUsers(res?.data?.latestUsers)
    }).catch((error)=>{
      console.log(error);
    })
  },[reload])

  return (
    <>
      <div className='bg-white p-5 min-h-screen'>
        {/* Card widget */}
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
          <Widget
            icon={<MdBarChart className="h-7 w-7" />}
            title={"Earnings"}
            subtitle={revenue}
          />
          <Widget
            icon={<IoDocuments className="h-6 w-6" />}
            title={"New Bookings"}
            subtitle={"₹642.39"}
          />
          <Widget
            icon={<MdBarChart className="h-7 w-7" />}
            title={"New Users"}
            subtitle={"₹574.34"}
          />
          <Widget
            icon={<MdDashboard className="h-6 w-6" />}
            title={"New Properties"}
            subtitle={"₹1,000"}
          />
          <Widget
            icon={<MdBarChart className="h-7 w-7" />}
            title={"Total Users"}
            subtitle={"145"}
          />
          <Widget
            icon={<IoMdHome className="h-6 w-6" />}
            title={"Total Properties"}
            subtitle={"₹2433"}
          />
        </div>

        {/* Charts */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <TotalSpent />
          <WeeklyRevenue />
        </div>

        {/* Tables & Charts */}
        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* Check Table */}
          <div>
            {
              users && <CheckTable
                columnsData={columnsDataCheck}
                tableData={users}
              />
            }
          </div>

          {/* Traffic chart & Pie Chart */}
          <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
            <PieChartCard />
            <div className="grid grid-cols-1 rounded-[20px]">
              <MiniCalendar />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminHome;
