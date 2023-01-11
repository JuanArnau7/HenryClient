import React from 'react'
import TasksDevelopment from './TasksDevelopment'
import TasksQA from './TasksQA'
import TasksToDo from './TasksToDo'

const TaskHome = () => {
  return (
    <>
        <div className=" flex lg:flex-row md:flex-row  sm:flex-col  w-screen  my-5 items-start justify-around h-screen ">
          <div className="w-1/4  bg-gray-700 rounded-lg h-fit flex items-center justify-center">
          <TasksToDo/>
          </div>
          
          <div className="w-1/4  bg-gray-700 rounded-lg h-fit flex items-center justify-center">
          <TasksDevelopment/>
          </div>
          <div className="w-1/4  bg-gray-700 rounded-lg h-fit flex items-center justify-center">
          <TasksQA/>
          </div>
        </div>
    </>
  )
}

export default TaskHome