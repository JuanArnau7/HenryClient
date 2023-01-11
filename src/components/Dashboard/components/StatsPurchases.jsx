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
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';


const StatsPurchases = () => {
    const orders = useSelector(state=> state.allOrders)
    const [LastWeek, setLastWeek] = useState([])
    const [CurrentWeek, setCurrentWeek] = useState([])


const PurchasesCurrent = () => {
    let Orders =  orders.filter(o=>{
        if (CurrentWeek.includes(moment(o.date).add(1, 'days').format('l') ) ) {
    
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
        if (CurrentWeek[0] === moment(uf.date).add(1, 'days').format('l')) {
            w1.push(uf)
        }
        if (CurrentWeek[1] === moment(uf.date).add(1, 'days').format('l')) {
            w2.push(uf)
        }
        if (CurrentWeek[2] === moment(uf.date).add(1, 'days').format('l')) {
            w3.push(uf)
        }
        if (CurrentWeek[3] === moment(uf.date).add(1, 'days').format('l')) {
            w4.push(uf)
        }
        if (CurrentWeek[4] === moment(uf.date).add(1, 'days').format('l')) {
            w5.push(uf)
        }
        if (CurrentWeek[5] === moment(uf.date).add(1, 'days').format('l')) {
            w6.push(uf)
        }
        if (CurrentWeek[6] === moment(uf.date).add(1, 'days').format('l')) {
            w7.push(uf)
        }
      })
     return [w1.length, w2.length, w3.length, w4.length, w5.length, w6.length, w7.length]
}
const PurchasesLast =  () => {
  let Orders =  orders.filter(o=>{
    if (LastWeek.includes(moment(o.date).add(1, 'days').format('l') ) ) {

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
    if (LastWeek[0] === moment(uf.date).add(1, 'days').format('l')) {
        w1.push(uf)
    }
    if (LastWeek[1] === moment(uf.date).add(1, 'days').format('l')) {
        w2.push(uf)
    }
    if (LastWeek[2] === moment(uf.date).add(1, 'days').format('l')) {
        w3.push(uf)
    }
    if (LastWeek[3] === moment(uf.date).add(1, 'days').format('l')) {
        w4.push(uf)
    }
    if (LastWeek[4] === moment(uf.date).add(1, 'days').format('l')) {
        w5.push(uf)
    }
    if (LastWeek[5] === moment(uf.date).add(1, 'days').format('l')) {
        w6.push(uf)
    }
    if (LastWeek[6] === moment(uf.date).add(1, 'days').format('l')) {
        w7.push(uf)
    }
  })
 return [w1.length, w2.length, w3.length, w4.length, w5.length, w6.length, w7.length]
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
  
   const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: ' Purchases ',
        padding: 15,
        font: {
          weight: 'bold',
          size:20
        },
        align: 'center',
        color: '#212121'
      },
    },
  };
  
  const labels= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
   const data2 = {
    labels,
    datasets: [
      {
        barThickness: 20,
        maxBarThickness: 25,
        label: ' Purchases (last week)',
        data:  PurchasesLast(),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
  
        barThickness: 20,
        maxBarThickness: 25,
        label: 'Purchases Orders',
        data: PurchasesCurrent(),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  useEffect(() => {
    lastWeek()
  }, [])
  
  return (
    <>
        <Bar options={options2} data={data2} />
    </>
  )
}

export default StatsPurchases