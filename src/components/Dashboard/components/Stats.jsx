import React, { useEffect, useState } from 'react'
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
import moment from 'moment/moment';

const Stats = () => {
    const users = useSelector(state=> state.allUsers)
    const orders = useSelector(state=> state.allOrders)
    const [LastWeek, setLastWeek] = useState([])
    const [CurrentWeek, setCurrentWeek] = useState([])
const OrdenesLast = () => {

  let Orders = orders.filter(o=>{
      console.log("bbbbbbbbbbbbbbbbb", moment(o.date).format('l'))
      LastWeek.map(lw => {
        console.log("lw", moment(lw).format('l'), "comparado", moment(o.date).format('l'))
        if (lw === moment(o.date).format('l')) {
          return o.valuePaid
        }
      })
      // if (LastWeek.includes( moment(o.date).format('l'))) {
      //   return o.valuePaid
      // } 
  })
  console.log("ccccccccccccccc", Orders) 
}
const sales = () => {
  let Orders = orders.map(o=>o.valuePaid? o.valuePaid : 0).reduce((prev, curr)=> prev+curr, 0);
      return Orders
} 
const lastWeek =()=>{
  moment.updateLocale('en', {
    week : {
        dow :0  // 0 to 6 sunday to saturday
    }
});

//than get current week or get last week according to Sun -- Sat
let current = [moment().startOf('week'), moment().endOf('week')].map(c=>moment(c._d).format('l'))
let last = [moment().startOf('week').subtract(7,'days'), moment().endOf('week').subtract(7, 'days')].map(l=>moment(l._d).format('l'))
console.log("current:", current)
console.log("last:", last)
getDatesCurrentWeek(current[0], current[1])
getDatesLastWeek(last[0], last[1])

}

function getDatesLastWeek (startDate, endDate) {
  let dates = []
  let current = startDate.split("/")
  let current2 = []
  for (let i = 0; i < current.length; i++) {
    let element = parseInt(current[i]);
    current2.push(element)
  }
  let current3 = new Date(current2[2], current2[0], current2[1])
  let end = endDate.split("/")
  let end2 = []
  for (let i = 0; i < end.length; i++) {
    const element = parseInt(end[i]);
    end2.push(element)
  }
let end3 = new Date(end2[2], end2[0], end2[1])
let addDays = function (days) {
  let date = new Date(this.valueOf())
  date.setDate(date.getDate() )
  return date
}
while (current3 <= end3) {
  dates.push(current3)
  current3 = addDays.call(current3, 1)
}
console.log("datesssssss", dates)
  setLastWeek(dates.map(d=> moment(d).format('l')))
}

function getDatesCurrentWeek (startDate, endDate) {
  let dates = []
  let current = startDate.split("/")
  let current2 = []
  for (let i = 0; i < current.length; i++) {
    let element = parseInt(current[i]);
    current2.push(element)
  }
  let current3 = new Date(current2[2], current2[0], current2[1])
  let end = endDate.split("/")
  let end2 = []
  for (let i = 0; i < end.length; i++) {
    const element = parseInt(end[i]);
    end2.push(element)
  }
let end3 = new Date(end2[2], end2[0], end2[1])
let addDays = function (days) {
  let date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}
while (current3 <= end3) {
  dates.push(current3)
  current3 = addDays.call(current3, 1)
}
  setCurrentWeek(dates.map(d=> moment(d).format('l')))
}

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
        data: OrdenesLast(),
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
  useEffect(() => {
    lastWeek()
  }, [])
  
  
  return (
    <>
    <div className="w-full flex text-white m-5 justify-around" onClick={()=>console.log(LastWeek, CurrentWeek)}>
          <div className="flex justify-between items-center p-3 w-1/5 bg-blue-500 rounded-lg">
              <div className="text-3xl text-blue-500  bg-white rounded-full p-2"><HiOutlineUsers/></div>
              <div className="flex flex-col justify-center items-end text-lg">
                <div>{users.length}</div>
                <div>Users</div>

              </div>
          </div>
          <div className="flex justify-between items-center p-3 w-1/5 bg-blue-500 rounded-lg">
          <div className="text-3xl text-blue-500  bg-white rounded-full p-2" ><FaChartLine/></div>
              <div className="flex flex-col justify-center items-end text-lg">
                <div> $ {sales()}</div>
                <div className="sm:hidden md:block lg:block">Sales</div>

              </div>
          </div>          <div className="flex justify-between items-center p-3 w-1/5 bg-blue-500 rounded-lg">
          <div className="text-3xl text-blue-500  bg-white rounded-full p-2"><BsHandbag/></div>
              <div className="flex flex-col justify-center items-end text-lg">
                <div>{orders.length}</div>
                <div>Customers</div>

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