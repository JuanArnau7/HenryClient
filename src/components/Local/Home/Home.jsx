import Filters from "../../Utils/Filters/Filters"
import NavBar from "../../Utils/NavBar/NavBar"
import Pagination from "../../Utils/Pagination/Pagination"


const Home = () => {
  return(
    <div>
      <NavBar/>
      <Filters/>
      <Pagination/>
    </div>
  )
}

export default Home