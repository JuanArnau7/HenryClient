import Dish from "../Dish/Dish";

// https://github.com/bradtraversy/simple_react_pagination
const Menus = ({ posts, loading }) => {

  if (!loading) {
    return <h2>Loading...</h2>;
  } else if (!posts.length) {
    return <h2>No dishes!</h2>
  }

  return (
    <div>
      {
        posts.map(
          (d) => <Dish
            image={d.image}
            name={d.name}
            diet={d.diets}
            key={d.id}
            id={d.id} />
        )
      }
    </div>
  )
}

export default Menus