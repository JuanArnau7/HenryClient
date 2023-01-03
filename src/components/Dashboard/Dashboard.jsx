import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
// import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import BoardFoods from "./Boards/Food";
import BoardHome from "./Boards/Home";
import BoardReview from "./Boards/Review";
import BoardTag from "./Boards/Tag";
import BoardUser from "./Boards/User";

const Dashboard = () => {
  return (
    <div>
      <AdminSidebar />
      <div className="pl-64">
        <Routes>
          <Route exact path='/home' element={<BoardHome />} />
          <Route exact path='/foods' element={<BoardFoods />} />
          <Route exact path='/users' element={<BoardUser />} />
          <Route exact path='/reviews' element={<BoardReview />} />
          <Route exact path='/tags' element={<BoardTag />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard