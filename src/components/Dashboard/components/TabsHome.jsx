import React from 'react'

const TabsHome = ({Tabs, setTabs}) => {
  return (
    <>
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul className="flex flex-wrap -mb-px">
        <li className="mr-2">
            <span  onClick={()=>setTabs(1)} className={`inline-block p-4 ${Tabs === 1? "border-b-2 border-blue-600 text-blue-600 " : "border-b-2 border-transparent " } rounded-t-lg hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer`}>Stats</span>
        </li>
        <li className="mr-2">
            <span onClick={()=>setTabs(2)} className={`${Tabs === 2? "border-b-2 border-blue-600 text-blue-600 " : "border-b-2 border-transparent " } inline-block p-4  rounded-t-lg  dark:text-blue-500 dark:border-blue-500 hover:text-gray-600 cursor-pointer`} >Tasks</span>
        </li>
    </ul>
</div>
    </>
  )
}

export default TabsHome