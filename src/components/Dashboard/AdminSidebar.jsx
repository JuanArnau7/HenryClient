import React from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./AdminSidebar.css"

const AdminSidebar = ({sidebar, handlerSidebar}) => {

  return (
    <div>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <span onClick={() => handlerSidebar()}>Abrir</span>
        </Link>
      </div>
      <div className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <span onClick={() => handlerSidebar()}>Cerrar</span>
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}><span>{item.title}</span></Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default AdminSidebar