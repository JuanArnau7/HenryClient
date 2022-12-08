import { useEffect, useState } from "react"
import Filters from "../../Utils/Filters/Filters"
import Menus from "../../Utils/Menus/Menus"
import NavBar from "../../Utils/NavBar/NavBar"
import Pagination from "../../Utils/Pagination/Pagination"

// https://github.com/bradtraversy/simple_react_pagination
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts] = useState([{
    image: "https://spoonacular.com/recipeImages/716426-556x370.jpg",
    name: "Cauliflower, Brown Rice, and Vegetable Fried Rice",
    diets: ["gluten", "freedairy", "freelacto", "ovo", "vegetarianvegan"],
    description: "Cauliflower, Brown Rice, and Vegetable Fried Rice might be a good recipe to expand your side dish recipe box. Watching your figure? This gluten free, dairy free, lacto ovo vegetarian, and vegan recipe has 192 calories, 7g of protein, and 6g of fat per serving. For $1.12 per serving, this recipe covers 19% of your daily requirements of vitamins and minerals. This recipe serves 8. This recipe from fullbellysisters.blogspot.com has 3689 fans. This recipe is typical of Chinese cuisine. From preparation to the plate, this recipe takes about 30 minutes. Head to the store and pick up peas, broccoli, salt, and a few other things to make it today. Overall, this recipe earns an awesome spoonacular score of 100%. Users who liked this recipe also liked Vegetable Fried Brown Rice, Vegetable Fried Cauliflower Rice, and Easy Vegetable Fried Brown Rice with Egg."
  }]); // example dish, replace later with db file
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Added an use effect for later calls of database dishes to add.
  useEffect(() => {
    setLoading(true)
  }, [])

  // Example call given by the repo of this solution
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     setLoading(true);
  //     const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  //     setPosts(res.data);
  //     setLoading(false);
  //   };

  //   fetchPosts();
  // }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <NavBar />
      <Filters />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
      <Menus
        posts={currentPosts}
        loading={loading}
      />
    </div>
  )
}

export default Home