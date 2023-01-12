import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminSidebar from "./AdminSidebar";
import BoardFoods from "./Boards/Food";
import BoardHome from "./Boards/Home";
import Orders from "./Boards/Orders";
import BoardReview from "./Boards/Review";
import BoardUser from "./Boards/User";

const Dashboard = () => {
  const [sidebar, setSidebar] = useState(false)
	const user = useSelector(state => state.userProfile)
	const navigate = useNavigate()

	// useEffect(() => {
	// 	if(user.rol !== "ADMIN_ROLE") {
	// 		Swal.fire("Esta ruta no existe", "Navega por nuestra pagina para adquirir tus productos favoritos", "info")
	// 		navigate('/local/alterHome')
	// 	}
	// }, [user, navigate])
	

  const showSidebar = () => {
    setSidebar(!sidebar)
  }

  return (
    <>
      <AdminSidebar handlerSidebar={showSidebar} sidebar={sidebar}/>
      {/* className="pl-64" */}
      <div className={sidebar ? "flex pl-64 w-full" : "flex w-full"}>
        <Routes>
          <Route exact path='/' element={<BoardHome />} />
          <Route exact path='/foods' element={<BoardFoods />} />
          <Route exact path='/users' element={<BoardUser />} />
          <Route exact path='/reviews' element={<BoardReview />} />
          <Route exact path='/orders' element={<Orders />} />
        </Routes>
      </div>
    </>
  )
}

export default Dashboard