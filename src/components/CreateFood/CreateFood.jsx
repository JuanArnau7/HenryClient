import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { imgFoodUpdate, postDishCreate } from "../../redux/Actions/actions";
import NavBarCreateFoods from "./components/NavBarCreateFoods";
import "./CreateFood.css";

const CreateFood = (props) => {
  const dispatch = useDispatch();
  const [tagsInput, setTagsInput] = useState({
    conutry: "",
    ciudad: "",
    food: "",
    comida: "",
    fit: "",
    sano: "",
  });
  const [Form, setForm] = useState({
    adminid: {
      _id: "638b0101aff092a52beda5a5",
      name: "kossito",
    },
    price: 0,
    tags: {
      es: [],
      en: [],
    },
    lenguage: {
      es: {
        name: "",
        descripcion: "",
      },
      en: {
        name: "",
        descripcion: "",
      },
    },
  });
  const [image, setImage] = useState(null)
  const [InglesCompletado, setInglesCompletado] = useState(false);
  const validar = () => {
    if (!Form.lenguage.es.name) {
      return false;
    }
    if (!Form.lenguage.en.name) {
      return false;
    }
    if (!Form.lenguage.es.descripcion) {
      return false;
    }
    if (!Form.lenguage.en.descripcion) {
      return false;
    }
    if (!Form.price) {
      return false;
    }
    if (!tagsInput.conutry) {
      return false;
    }
    if (!tagsInput.ciudad) {
      return false;
    }
    if (!tagsInput.food) {
      return false;
    }
    if (!tagsInput.comida) {
      return false;
    }
    if (!tagsInput.fit) {
      return false;
    }
    if (!tagsInput.sano) {
      return false;
    }
    if (!image) {
      return false;
    }
    return true;
  };
  const agregado = () => {
    Swal.fire({
      title: "Food Dish Added Successfully!",
      text: "",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  const noAgregado = () => {
    Swal.fire({
      title: "Error adding Food Plate!",
      text: "",
      icon: "warning",
      confirmButtonText: "OK",
    });
  };
  const completar = () => {
    Swal.fire({
      title: "Fill in all fields!",
      text: "",
      icon: "warning",
      confirmButtonText: "OK",
    });
  };
  const handleNameSpanish = (e) => {
    setForm({
      ...Form,
      lenguage: {
        ...Form.lenguage,
        es: {
          ...Form.lenguage.es,
          name: e.target.value,
        },
      },
    });
  };
  const handleDescriptionSpanish = (e) => {
    setForm({
      ...Form,
      lenguage: {
        ...Form.lenguage,
        es: {
          ...Form.lenguage.es,
          descripcion: e.target.value,
        },
      },
    });
  };
  const handleNameEnglish = (e) => {
    setForm({
      ...Form,
      lenguage: {
        ...Form.lenguage,
        en: {
          ...Form.lenguage.en,
          name: e.target.value,
        },
      },
    });
  };
  const handleDescriptionEnglish = (e) => {
    setForm({
      ...Form,
      lenguage: {
        ...Form.lenguage,
        en: {
          ...Form.lenguage.en,
          descripcion: e.target.value,
        },
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Form.tags.es = [tagsInput.ciudad, tagsInput.comida, tagsInput.sano];
    Form.tags.en = [tagsInput.conutry, tagsInput.food, tagsInput.fit];

    if (validar(Form) === true) {
    let agg = await dispatch(postDishCreate(Form))
	
	
		// Create an object of formData
		const formData = new FormData();
 
	  // Update the formData object
	  formData.append(
		"file",
		image.file,
		image.file.name
		);
	  

    const ass = await dispatch(imgFoodUpdate(agg.data._id, formData  ))

    	if (ass !== null) {
    		agregado()
    		reset()
    	} else {
    		noAgregado()
    	}
    } else {
    	completar()
    }
  
  setImage(null)
  };
  const handleChange = (e) => {
    setForm({
      ...Form,
      [e.target.name]: e.target.value,
    });
  };
  const reset = () => {
    setInglesCompletado(false);
    setForm({
      adminid: {
        _id: "638b0101aff092a52beda5a5",
        name: "kossito",
      },
      price: 0,
      tags: {
        es: [],
        en: [],
      },
      lenguage: {
        es: {
          name: "",
          descripcion: "",
        },
        en: {
          name: "",
          descripcion: "",
        },
      },
    });
  };
  const tags = useSelector((state) => state.allTags);

  const tagCountry = tags.filter((c) => c.type === "country");
  const tagFood = tags.filter((c) => c.type === "food");
  const tagFit = tags.filter((c) => c.type === "fit");

  const handleChangeCountry = (e) => {
    setTagsInput({
      ...tagsInput,
      conutry: e.target.value.split("/")[0],
      ciudad: e.target.value.split("/")[1],
    });
  };
  const handleChangeFood = (e) => {
    setTagsInput({
      ...tagsInput,
      food: e.target.value.split("/")[0],
      comida: e.target.value.split("/")[1],
    });
  };
  const handleChangeFit = (e) => {
    setTagsInput({
      ...tagsInput,
      fit: e.target.value.split("/")[0],
      sano: e.target.value.split("/")[1],
    });
  };

 

  const hadleImg = (e)=>{
		
	let url = URL.createObjectURL(e.target.files[0]);

	setImage({
		url,
		file: e.target.files[0]
	})
	
}

  return (
    <>
      <NavBarCreateFoods />
      <div className="flex items-center justify-center h-screen Center">
        <div className="w-10/12 lg:w-1/2 flex-col border bg-white pt-4 shadow-md rounded-[4px] px-5">
          <form onSubmit={handleSubmit} method="POST">
            <h4 className="font-semibold text-xl text-center">
              General information of Dish
            </h4>
            <div className="flex flex-wrap justify-between mt-6 mb-8">
              <div className="w-full sm:w-8/12 mb-3">
                <label className="text-back font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline">
                  Choose images to upload (PNG, JPG, JPEG)
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    hidden={true}
					value=""
                    onChange={hadleImg}
                  />
				{!image&&<img src="https://us.123rf.com/450wm/rastudio/rastudio1601/rastudio160103482/51390387-fast-icono-de-l%C3%ADnea-de-comida-de-alimentos-para-web-m%C3%B3vil-y-la-infograf%C3%ADa-gris-del-vector-icono-de-l.jpg?ver=6" width={150} height={150} alt="no imagen"/>}
				{image && <img src={image.url} width={150} height={150} alt="no imagen" />}
                </label>
              </div>
              <div className="w-full sm:w-3/12">
                <label className="block text-sm font-medium text-gray-700">
                  Price / Precio
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="price"
                  value={Form.price}
                  className="mt-1 block w-full rounded-md h-9 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3"
                />
              </div>
            </div>
            <div>
              <select
                defaultValue={""}
                id="country"
                className={` 'z-10'}bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                onChange={handleChangeCountry}
              >
                <option value={""}>Options</option>
                {tagCountry ? (
                  tagCountry.map((c, index) => {
                    return (
                      <option key={index} value={c.tagEN + "/" + c.tagES}>
                        {c.tagEN} / {c.tagES}{" "}
                      </option>
                    );
                  })
                ) : (
                  <></>
                )}
              </select>
              <select
                defaultValue={""}
                id="food"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleChangeFood}
              >
                <option value={""}>Options</option>
                {tagFood ? (
                  tagFood.map((c, index) => {
                    return (
                      <option key={index} value={c.tagEN + "/" + c.tagES}>
                        {c.tagEN} / {c.tagES}{" "}
                      </option>
                    );
                  })
                ) : (
                  <></>
                )}
              </select>
              <select
                defaultValue={""}
                id="fit"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleChangeFit}
              >
                <option value={""}>Options</option>
                {tagFit ? (
                  tagFit.map((c, index) => {
                    return (
                      <option key={index} value={c.tagEN + "/" + c.tagES}>
                        {c.tagEN} / {c.tagES}{" "}
                      </option>
                    );
                  })
                ) : (
                  <></>
                )}
              </select>
            </div>
            <hr />
            {!InglesCompletado ? (
              <>
                <div className="overflow-hidden shadow sm:rounded-md mt-3">
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="font-semibold">Create dish of food</h1>
                    <small>English version</small>
                  </div>

                  <div className="mb-5 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Dish name <small>(on English)</small>
                    </label>
                    <input
                      type="text"
                      value={Form.lenguage.en.name}
                      name="lenguague.en.name"
                      onChange={handleNameEnglish}
                      className="mt-1 block w-full rounded-md  h-9 border  border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3"
                      placeholder="Dish name "
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700">
                      Description <small>(on English)</small>
                    </label>
                    <textarea
                      id="about"
                      onChange={handleDescriptionEnglish}
                      name="description"
                      value={Form.lenguage.en.descripcion}
                      rows="3"
                      className="mt-1 block w-full h-full rounded-md  border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3"
                      placeholder="eg ingredients...."
                    ></textarea>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
                  <button
                    type="button"
                    onClick={() => setInglesCompletado(true)}
                    className="inline-flex justify-center align-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Next / Siguiente
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="overflow-hidden shadow sm:rounded-md mt-3">
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="font-semibold">Crear plato de comida</h1>
                    <small>Version en español</small>
                  </div>

                  <div className="mb-5 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Nombre del plato <small>(version español)</small>{" "}
                    </label>
                    <input
                      type="text"
                      onChange={handleNameSpanish}
                      name="lenguague.es.name"
                      value={Form.lenguage.es.name}
                      className="mt-1 block w-full rounded-md h-9 border border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3"
                      placeholder="Nombre del plato"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700">
                      Descripcion <small>(version español)</small>{" "}
                    </label>
                    <div className="mt-1 w-full">
                      <textarea
                        onChange={handleDescriptionSpanish}
                        value={Form.lenguage.es.descripcion}
                        name="description"
                        rows="3"
                        className="mt-1 block w-full rounded-md  border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3"
                        placeholder="Por ejemplo ingredientes...."
                      ></textarea>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
                    <button
                      type="button"
                      className="inline-flex justify-center mr-5 align-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setInglesCompletado(false)}
                    >
                      Anterior
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center align-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Crear
                    </button>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateFood;
