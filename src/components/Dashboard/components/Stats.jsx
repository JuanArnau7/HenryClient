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
import moment from 'moment/moment';
import StatsUsers from './StatsUsers';
import StatsPurchases from './StatsPurchases';

const Stats = ({orders, users}) => {
    const [LastWeek, setLastWeek] = useState([])
    const [CurrentWeek, setCurrentWeek] = useState([])
const OrdenesCurrent = () => {
  let Orders = orders.filter(o=>{
    if (CurrentWeek.includes(moment(o.date).format('l') ) ) {
      return o
    }
  })
    let w1 =[]
    let w2 =[]
    let w3 =[]
    let w4 =[]
    let w5 =[]
    let w6 =[]
    let w7 =[]
  
      Orders.map(uf=>{
      if (CurrentWeek[0] === moment(uf.date).format('l')) {
          w1.push(uf.valuePaid)
      }
      if (CurrentWeek[1] === moment(uf.date).format('l')) {
          w2.push(uf.valuePaid)
      }
      if (CurrentWeek[2] === moment(uf.date).format('l')) {
          w3.push(uf.valuePaid)
      }
      if (CurrentWeek[3] === moment(uf.date).format('l')) {
          w4.push(uf.valuePaid)
      }
      if (CurrentWeek[4] === moment(uf.date).format('l')) {
          w5.push(uf.valuePaid)
      }
      if (CurrentWeek[5] === moment(uf.date).format('l')) {
          w6.push(uf.valuePaid)
      }
      if (CurrentWeek[6] === moment(uf.date).format('l')) {
          w7.push(uf.valuePaid)
      }
    
    })
    return [w1.reduce((prev, curr)=> prev+curr, 0), w2.reduce((prev, curr)=> prev+curr, 0), w3.reduce((prev, curr)=> prev+curr, 0), w4.reduce((prev, curr)=> prev+curr, 0), w5.reduce((prev, curr)=> prev+curr, 0), w6.reduce((prev, curr)=> prev+curr, 0), w7.reduce((prev, curr)=> prev+curr, 0)]

}
const OrdenesLast = () => {
  let Orders = orders.filter(o=>{
    if (LastWeek.includes(moment(o.date).format('l') ) ) {
      return o
    }
  })
  let w1 =[]
  let w2 =[]
  let w3 =[]
  let w4 =[]
  let w5 =[]
  let w6 =[]
  let w7 =[]

    Orders.map(uf=>{
    if (LastWeek[0] === moment(uf.date).format('l')) {
        w1.push(uf.valuePaid)
    }
    if (LastWeek[1] === moment(uf.date).format('l')) {
        w2.push(uf.valuePaid)
    }
    if (LastWeek[2] === moment(uf.date).format('l')) {
        w3.push(uf.valuePaid)
    }
    if (LastWeek[3] === moment(uf.date).format('l')) {
        w4.push(uf.valuePaid)
    }
    if (LastWeek[4] === moment(uf.date).format('l')) {
        w5.push(uf.valuePaid)
    }
    if (LastWeek[5] === moment(uf.date).format('l')) {
        w6.push(uf.valuePaid)
    }
    if (LastWeek[6] === moment(uf.date).format('l')) {
        w7.push(uf.valuePaid)
    }
  })
 return [w1.reduce((prev, curr)=> prev+curr, 0), w2.reduce((prev, curr)=> prev+curr, 0), w3.reduce((prev, curr)=> prev+curr, 0), w4.reduce((prev, curr)=> prev+curr, 0), w5.reduce((prev, curr)=> prev+curr, 0), w6.reduce((prev, curr)=> prev+curr, 0), w7.reduce((prev, curr)=> prev+curr, 0)]
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
getDatesCurrentWeek(current[0], current[1])
getDatesLastWeek(last[0], last[1])

}

function getDatesLastWeek (startDate, endDate) {
  let dates = []
  let last = startDate.split("/")
  let last2 = []
  for (let i = 0; i < last.length; i++) {
    let element = parseInt(last[i]);
    last2.push(element)
  }
  let last3 = new Date(last2[2], last2[0], last2[1])
  let end = endDate.split("/")
  let end2 = []
  for (let i = 0; i < end.length; i++) {
    const element = parseInt(end[i]);
    end2.push(element)
  }
let end3 = new Date(end2[2], end2[0], end2[1])
let addDays = function (days) {
  let date = new Date(this.valueOf())
  date.setDate(date.getDate() + days )
  return date
}
while (last3 <= end3) {
  dates.push(last3)
  last3 = addDays.call(last3, 1)
}
  setLastWeek(dates.map(d=> moment(d).subtract(1,'month').format('l')))
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
  setCurrentWeek(dates.map(d=> moment(d).subtract(1,'month').format('l')))
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
        position: 'top' 
      },
      title: {
        display: true,
        text: "Week's Revenues ",
        padding: 20,
        font: {
          weight: 'bold',
          size:20
        },
        align: 'center',
        color: '#212121'
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
        data: OrdenesCurrent(),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  useEffect(() => {
    lastWeek()
  }, [])
  
  
  return (
    <>
    <div className="w-full flex text-white m-5 justify-around" >
          <div className="flex justify-between items-center p-3 w-1/5 bg-blue-500 rounded-lg shadow-2xl">
              <div className="text-3xl text-blue-500  bg-white rounded-full p-2"><HiOutlineUsers/></div>
              <div className="flex flex-col justify-center items-end text-lg">
                <div>{users.length}</div>
                <div>Users</div>

              </div>
          </div>
          <div className="flex justify-between items-center p-3 w-1/5 bg-blue-500 rounded-lg shadow-2xl">
          <div className="text-3xl text-blue-500  bg-white rounded-full p-2" ><FaChartLine/></div>
              <div className="flex flex-col justify-center items-end text-lg">
                <div> $ {sales()}</div>
                <div className="sm:hidden md:block lg:block">Revenues</div>

              </div>
          </div>          <div className="flex justify-between items-center p-3 w-1/5 bg-blue-500 rounded-lg shadow-2xl">
          <div className="text-3xl text-blue-500  bg-white rounded-full p-2"><BsHandbag/></div>
              <div className="flex flex-col justify-center items-end text-lg">
                <div>{orders.length}</div>
                <div>Purchases</div>

              </div>
          </div>         
      </div>
        <div className=" flex items-center justify-center  h-2/3 w-4/5 bg-blue-200 rounded-lg m-5 shadow-2xl">
          <Line options={options} data={data} />
        </div>
        <div className="flex flex-row w-screen  my-5 items-center justify-around h-1/3 md:flex-row sm:flex-col">
          <div className="w-2/5 mx-5 bg-blue-200 rounded-lg h-full flex items-center justify-center shadow-2xl">
         <StatsUsers users={users}/>
          </div>
          <div className="w-2/5 mx-5 bg-blue-200 rounded-lg h-full flex items-center justify-center shadow-2xl">
         <StatsPurchases/>
          </div>
          
        </div>
    </>
  )
}

export default Stats