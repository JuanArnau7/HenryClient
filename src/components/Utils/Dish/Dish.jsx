const Dish = ({ image, name, diets, id }) => {
  return(
    <div>
      <img src={image} alt={id} />
      <p>{name}</p>
      <p>{diets}</p>
      <p>{id}</p>
    </div>
  )
}

export default Dish