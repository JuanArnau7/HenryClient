import React, { useState } from "react";
import { useSelector } from "react-redux";
import Stats from "../components/Stats";
import TabsHome from "../components/TabsHome";
import TaskHome from "../components/TaskHome";





const BoardHome = () => {
	const Orders = useSelector(state => state.allOrders)
  const [Tabs, setTabs] = useState(1)


  return (
    <>
    <div className="bg-white w-screen mt-80px h-full flex flex-col items-center ">
      <TabsHome Tabs={Tabs} setTabs={setTabs}/>
      {Tabs === 1?
      <Stats orders={Orders}/>
    :
      <TaskHome/>
      }
    </div>
      
    </>
  )
}

export default BoardHome