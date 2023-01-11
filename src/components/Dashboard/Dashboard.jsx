import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
// import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import BoardFoods from "./Boards/Food";
import BoardHome from "./Boards/Home";
import BoardReview from "./Boards/Review";
import Tag from "./Boards/Tag";
import BoardUser from "./Boards/User";

const Dashboard = () => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => {
    setSidebar(!sidebar)
  }

  return (
    <>
      <AdminSidebar handlerSidebar={showSidebar} sidebar={sidebar}/>
      {/* className="pl-64" */}
      <div className={sidebar ? "flex pl-64 w-full" : "flex w-full"}>
        <Routes>
          <Route exact path='/home' element={<BoardHome />} />
          <Route exact path='/foods' element={<BoardFoods />} />
          <Route exact path='/users' element={<BoardUser />} />
          <Route exact path='/reviews' element={<BoardReview />} />
          <Route exact path='/tags' element={<Tag />} />
        </Routes>
      </div>
    </>
  )
}

export default Dashboard