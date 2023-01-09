import React from 'react'
import TableActivities from "../components/TableActivities";
import Tasks from "../components/TasksQA";
import TasksQA from "../components/TasksQA";
import TasksToDo from "../components/TasksToDo";
import TasksDevelopment from "../components/TasksDevelopment";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    BarElement
    } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import {HiOutlineUsers} from 'react-icons/hi'
import {FaChartLine} from 'react-icons/fa'
import {BsHandbag} from 'react-icons/bs'
import {MdOutlineAttachMoney} from 'react-icons/md'
import { useSelector } from 'react-redux';

const Stats = () => {
    const users = useSelector(state=> state.allUsers)
    const orders = useSelector(state=> state.allOrders)


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    BarElement
  );
  
   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' 
      },
      title: {
        display: true,
        text: ' Sales this week :',
        padding: 20,
        font: {
          weight: 'bold',
          size:20
        },
        align: 'start',
        color: '#ffff'
      },
    },
  };
  
  const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const data = {
    labels,
    datasets: [
      {
        tension:0.3,
        label: 'Revenue (last period)',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        tension:0.3,
        label: 'Revenue ',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
   const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' ,
      },
      title: {
        display: true,
        text: ' Sales this week :',
        padding: 15,
        font: {
          weight: 'bold',
          size:20
        },
        align: 'center',
        color: '#ffff'
      },
    },
  };
  
  const labels2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
   const data2 = {
    labels,
    datasets: [
      {
        barThickness: 20,
        maxBarThickness: 25,
        label: 'Dataset 1',
        data: labels2.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
  
        barThickness: 20,
        maxBarThickness: 25,
        label: 'Dataset 2',
        data: labels2.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  return (
    <>
    <div className="w-full flex text-white m-5 justify-around">
          <div className="flex justify-between items-center p-3 w-1/5 bg-blue-500 rounded-lg">
              <div className="text-3xl text-blue-500  bg-white rounded-full p-2"><HiOutlineUsers/></div>
              <div className="flex flex-col justify-center items-end text-lg">
                <div>{users.length}</div>
                <div>Users</div>

              </div>
          </div>
          <div className="flex justify-between items-center p-3 w-1/5 bg-blue-500 rounded-lg">
          <div className="text-3xl text-blue-500  bg-white rounded-full p-2"><FaChartLine/></div>
              <div className="flex flex-col justify-center items-end text-lg">
                <div> $ 1247</div>
                <div className="sm:hidden md:block lg:block">Sales</div>

              </div>
          </div>          <div className="flex justify-between items-center p-3 w-1/5 bg-blue-500 rounded-lg">
          <div className="text-3xl text-blue-500  bg-white rounded-full p-2"><BsHandbag/></div>
              <div className="flex flex-col justify-center items-end text-lg">
                <div>{orders.length}</div>
                <div>Customers</div>

              </div>
          </div>          <div className="flex justify-between items-center p-3 w-1/5 bg-blue-500 rounded-lg">
          <div className="text-3xl text-blue-500  bg-white rounded-full p-2 font-bold"><MdOutlineAttachMoney/></div>
              <div className="flex flex-col justify-center items-end text-lg">
                <div> $ 1247</div>
                <div>Balances</div>

              </div>
          </div>
      </div>
        <div className=" flex items-center justify-center  h-2/3 w-4/5 bg-gray-700 rounded-lg m-5">
          <Line options={options} data={data} />
        </div>
        <div className="flex flex-wrap w-screen  my-5 items-center justify-around h-1/3 ">
          <div className="w-2/5 mx-5 bg-gray-700 rounded-lg h-full flex items-center justify-center">
          <Bar options={options2} data={data2} />
          </div>
          <div className="w-2/5  bg-gray-700 rounded-lg h-full flex items-center justify-center">
          <Bar options={options2} data={data2} />
          </div>
        </div>
    </>
  )
}

export default Stats