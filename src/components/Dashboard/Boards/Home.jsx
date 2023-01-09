import React, { useState } from "react";
import Stats from "../components/Stats";
import TabsHome from "../components/TabsHome";
import TaskHome from "../components/TaskHome";





const BoardHome = () => {

  const [Tabs, setTabs] = useState(1)


  return (
    <>
    <div className="bg-gray-900 w-screen mt-80px h-full flex flex-col items-center ">
      <TabsHome Tabs={Tabs} setTabs={setTabs}/>
      {Tabs === 1?
      <Stats/>
    :
      <TaskHome/>
      }
    </div>
      
    </>
  )
}

export default BoardHome