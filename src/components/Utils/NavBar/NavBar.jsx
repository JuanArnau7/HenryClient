import { Link } from "react-router-dom"

const NavBar = () => {
    return(
      <>
        <ul>
          <li>Order</li>
          <li><Link to='/login' >Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
        </ul>
      </>
    )
  }
  
  export default NavBar
