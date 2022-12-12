
import { LOGIN_USER_JWT, POST_USER_CREATE,  DETAILS_DISH, GET_ALL_DISHES } from './Actions/actionsTypes'


const initialState = {
  // platos : "platos"
	allDishes: [{
		"lenguage": {
			"es": {
				"name": "MILANESAS CON PAPAS FRITAS Y HUEVOS FRITOS",
				"type": "Desayunos",
				"descripcion": "La milanesa es un filete fino de carne, pescado o pollo, pasado por huevo batido y luego por pan rallado, que se cocina frito o al horno y suele acompañarse con una guarnición, como papas fritas.."
			},
			"en": {
				"name": "MILANESE WITH FRENCH FRIES AND FRIED EGGS",
				"type": "Breakfasts",
				"descripcion": "The milanesa is a thin fillet of meat, fish or chicken, passed through beaten egg and then breadcrumbs, which is cooked fried or baked and is usually accompanied with a garnish, such as French fries."
			}
		},
		"_id": "63948648364ffdac2230aa64",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 150,
		"disponible": true,
		"img": "https://srecetas.es/system/images/2501/full.P30-560x392.jpg",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "TÉ LIMÓN",
				"type": "Té",
				"descripcion": "El té limón, también conocido como zacate de limón o zacatillo es una planta con aroma a cítricos originaria de la India la cual es rica en antioxidantes que ayudan a aliviar dolores estomacales, porblemas respiratorios y otros malestares como insomnio, fiebre e incluso reumatismo."
			},
			"en": {
				"name": "LEMON TEA",
				"type": "Tea",
				"descripcion": "Lemon tea, also known as lemon grass or zacatillo, is a citrus-scented plant native to India that is rich in antioxidants that help relieve stomach aches, respiratory problems, and other ailments such as insomnia, fever, and even rheumatism."
			}
		},
		"_id": "63948648364ffdac2230aa65",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 85,
		"disponible": true,
		"img": "https://t2.uc.ltmcdn.com/es/posts/1/5/8/beneficios_del_te_de_limon_41851_600.webp",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "VASITOS DE KIWI FRESCO Y CREMOSO DE COCO CON BASE DE GRANOLA",
				"type": "Desayuno",
				"descripcion": "Los amantes del coco encontrarán en esta receta un desayuno saludable, delicioso y que te aportará un montón de nutrientes para empezar el día."
			},
			"en": {
				"name": "CUPS OF FRESH AND CREAMY COCONUT KIWI WITH A GRANOLA BASE",
				"type": "Breakfasts",
				"descripcion": "Coconut lovers will find in this recipe a healthy, delicious breakfast that will provide you with a lot of nutrients to start the day.."
			}
		},
		"_id": "63948648364ffdac2230aa66",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 115,
		"disponible": true,
		"img": "https://www.elmueble.com/medio/2022/07/06/vasitos-de-kiwi-fresco-y-cremoso-de-coco-con-base-de-granola-00543833_a88113e4_1200x810.jpg",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "SMOOTHIE DE BAYAS DE GOJI",
				"type": "Smoothies",
				"descripcion": "Las bayas de goji tienen un alto contenido de antioxidantes, que ayuda a fortalecer el sistema inmunológico y además previene enfermedades cardiovasculares. Una de las formas más fáciles de consumir bayas de goji es a través de smoothies o productos lácteos."
			},
			"en": {
				"name": "GOJI BERRY SMOOTHIE",
				"type": "Smoothies",
				"descripcion": "Goji berries are high in antioxidants, which help strengthen the immune system and also prevent cardiovascular diseases. One of the easiest ways to consume goji berries is through smoothies or dairy products."
			}
		},
		"_id": "63948648364ffdac2230aa67",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 90,
		"disponible": true,
		"img": "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/BEDF00C0-E231-4C08-A1E0-D2BC3AFB7B54/Derivates/cd559818-8d9a-4b24-b869-918ff07ca4b6.jpg",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "BIFE DE CHORIZO",
				"type": "Parrillada",
				"descripcion": "Es un filete y los bifes de chorizo son filetes gruesos obtenidos del lomo alto de la res. La grasa que presenta en su marmoleo permite que sea un corte de carne suave y jugoso, por lo que no requiere una gran cantidad de sazonadores, basta con un poco de sal de grano. Acompáñalo con papas en gajos o una fresca ensalada."
			},
			"en": {
				"name": "CHORIZO STEAK",
				"type": "Argentina Grill",
				"descripcion": "It is a steak and the bifes de chorizo are thick steaks obtained from the top loin of beef. The fat that it presents in its marbling allows it to be a soft and juicy cut of meat, so it does not require a large amount of seasoning, just a little grain salt. Accompany it with potato wedges or a fresh salad."
			}
		},
		"_id": "63948648364ffdac2230aa68",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 165,
		"disponible": true,
		"img": "https://i2.wp.com/files.agro20.com.br/uploads/2019/12/Bife-de-chorizo-2.jpg?fit=1024%2C653&ssl=1",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "CHURRASCO",
				"type": "Parrillada",
				"descripcion": "este corte de carne es uno de los más famosos de Argentina, donde también le llaman tira de asado. Se obtiene al realizar cortes transversales a la costilla de la res. Así, en lugar de cortarlo en chuletas, forman tiras con un poco de hueso. Pero también puede originarse de la parte superior del lomo, en cuyo caso será un corte magro (poca cantidad de grasa, sin hueso y sin nervios). Se puede marinar con ajo y perejil y acompañarse con el clásico chimichurri."
			},
			"en": {
				"name": "TOP SIRLOIN",
				"type": "Argentina Grill",
				"descripcion": "This cut of meat is one of the most famous in Argentina, where it is also called strip of roast. It is obtained by making transversal cuts to the beef rib. So instead of cutting it into chops, they form strips with a bit of bone. But it can also originate from the upper part of the loin, in which case it will be a lean cut (little amount of fat, without bone and without nerves). It can be marinated with garlic and parsley and served with the classic chimichurri."
			}
		},
		"_id": "63948648364ffdac2230aa69",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 220,
		"disponible": true,
		"img": "https://saboryestilo.com.mx/wp-content/uploads/2020/05/parrilla-argentina-4.jpg",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "CHORIZO ARGENTINO",
				"type": "Parrillada",
				"descripcion": "De carne de cerdo, también es conocido como chorizo criollo. Antes de ponerlo a la parrilla, se prepara con vino y especias, sin desecar ni ahumar, se deja reposar un día entero y después se cocina."
			},
			"en": {
				"name": "ARGENTINE SAUSAGE",
				"type": "Argentina Grill",
				"descripcion": "Made from pork, it is also known as Creole chorizo. Before putting it on the grill, it is prepared with wine and spices, without drying or smoking, it is left to rest for a whole day and then it is cooked."
			}
		},
		"_id": "63948648364ffdac2230aa6a",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 110,
		"disponible": true,
		"img": "https://saboryestilo.com.mx/wp-content/uploads/2020/05/parrilla-argentina-6.jpg",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "TEQUILA",
				"type": "Bebidas",
				"descripcion": "De todos los tragos populares en México, el tequila es el más famoso y lo podemos encontrar en los bares de todo el mundo. Se elabora a partir de plantas fermentadas de agave azul, el proceso de destilación del tequila está estrictamente regulado y solo puede producirse en pocos lugares del país. Mientras degustas el tequila, asegúrate de catar los diferentes sabores del tequila: blanco, reposado y añejo."
			},
			"en": {
				"name": "TEQUILA",
				"type": "Drinks",
				"descripcion": "Of all the popular drinks in Mexico, tequila is the most famous and can be found in bars all over the world. Made from fermented blue agave plants, the tequila distillation process is strictly regulated and can only be produced in a few places in the country. As you sip the tequila, be sure to sample the different flavors of tequila: blanco, reposado, and añejo."
			}
		},
		"_id": "63948648364ffdac2230aa6b",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 95,
		"disponible": true,
		"img": "https://villagrouploreto.s3.amazonaws.com/uploads/photo/image/4086/shots-de-tequila.jpg",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "CALDO DE POLLO CON ARROZ",
				"type": "Sopas",
				"descripcion": "Nada más rico que un caldito de pollo casero con arroz blanco y verduritas; es nutritivo, llenador y alivia el alma en cualquier momento. Nuestra receta tiene todo el sabor del pollo."
			},
			"en": {
				"name": "CHICKEN BROTH WITH RICE",
				"type": "Soups",
				"descripcion": "Nothing richer than a homemade chicken broth with white rice and vegetables; it is nutritious, filling and soothes the soul at any time. Our recipe has all the flavor of chicken."
			}
		},
		"_id": "63948648364ffdac2230aa6f",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 100,
		"disponible": true,
		"img": "https://cdn.sanity.io/images/jsdrzfkj/production-esmx/dc5d8cc71827749dbb72c4a197c3421a92efd872-1024x683.jpg?w=800&fit=max",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "AGUA FRESCAS",
				"type": "Bebidas",
				"descripcion": "Las aguas frescas son aguas de frutas, elaboradas con productos naturales del país. Desde los puestos de tacos casuales en la calle hasta restaurantes gourmet, normalmente podrás encontrar diferentes sabores disponibles, como agua de limón con chía o con albahaca, de fresa o mango. Estas bebidas son siempre una opción muy refrescante y una excelente forma de mantenerse hidratado."
			},
			"en": {
				"name": "FRESH WATER",
				"type": "Drinks",
				"descripcion": "Fresh water are fruit waters, made with natural products from the country. From casual street taco stands to gourmet restaurants, you can often find different flavors available, such as chia or basil lemon water, strawberry or mango. These drinks are always a very refreshing option and a great way to stay hydrated."
			}
		},
		"_id": "63948648364ffdac2230aa6d",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 80,
		"disponible": true,
		"img": "https://villagrouploreto.s3.amazonaws.com/uploads/photo/image/4078/aguas-frescas-de-sabor.jpg",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "MARGARITA",
				"type": "Bebidas",
				"descripcion": "Si bien las margaritas son la respuesta más común cuando preguntan, ¿cuáles son algunas de las bebidas tradicionales en México?, Cada bar del país tiene su propio estilo de margaritas y de sabor. El sabor clásico de las margaritas es de limón, pero los mixólogos experimentan con diferentes frutas y verduras, como la piña, pepino y chile jalapeño, o con sabores más exóticos como el tamarindo y la tuna. Incluso puedes toparte con una margarita escarchada con chile tajín en lugar de la tradicional sal."
			},
			"en": {
				"name": "MARGARITA",
				"type": "Drinks",
				"descripcion": "While margaritas are the most common answer when asked, what are some of the traditional drinks in Mexico? Each bar in the country has its own style of margaritas and flavor. The classic flavor of margaritas is lemon, but mixologists experiment with different fruits and vegetables, such as pineapple, cucumber and jalapeño pepper, or with more exotic flavors such as tamarind and prickly pear. You can even stumble upon a margarita frosted with tajin chili instead of the traditional salt."
			}
		},
		"_id": "63948648364ffdac2230aa6c",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 85,
		"disponible": true,
		"img": "https://villagrouploreto.s3.amazonaws.com/uploads/photo/image/4083/margarita.jpg",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "SOPA DE MARISCOS",
				"type": "Sopas",
				"descripcion": "Esta sopa de mariscos  con gambas y almejas es una receta tradicional  que se puede disfrutar en cualquier época del año, ten por seguro que todos en casa la amarán. Su preparación es más sencilla de lo que piensas. Rinde seis porciones."
			},
			"en": {
				"name": "SEA FOOD SOUP",
				"type": "Soups",
				"descripcion": "This seafood soup with prawns and clams is a traditional recipe that can be enjoyed at any time of the year, rest assured that everyone at home will love it. Its preparation is easier than you think. Makes six servings."
			}
		},
		"_id": "63948648364ffdac2230aa70",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 160,
		"disponible": true,
		"img": "https://www.cardamomo.news/__export/1643916197616/sites/debate/img/2022/02/03/sopa_de_mariscos_crop1643914183460.jpeg_172596871.jpeg",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "MICHELADA",
				"type": "Bebidas",
				"descripcion": "Para una extraordinaria experiencia cervecera, prueba una michelada, una de las bebidas mexicanas tradicionales que encontrarás en todo el país. Preparada con jugo de clamato y especias, la michelada es similar a un Bloody Mary pero hecha con cerveza. Las micheladas también se consideran un remedio para la cruda, por lo que comúnmente las verás como opciones en un brunch."
			},
			"en": {
				"name": "MICHELADA",
				"type": "Drinks",
				"descripcion": "For an extraordinary beer experience, try a michelada, one of the traditional Mexican drinks you'll find all over the country. Made with clamato juice and spices, the michelada is similar to a Bloody Mary but made with beer. Micheladas are also considered a hangover remedy, which is why you'll commonly see them as brunch options."
			}
		},
		"_id": "63948648364ffdac2230aa6e",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 75,
		"disponible": true,
		"img": "https://villagrouploreto.s3.amazonaws.com/uploads/photo/image/4080/micheladas.jpg",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "FLAN",
				"type": "Postres",
				"descripcion": "Batido de huevos con azúcar, leche y crema, que se trabaja en moldes y se termina al baño maría, culminado con una deliciosa cubierta de caramelo."
			},
			"en": {
				"name": "FLAN",
				"type": "Desserts",
				"descripcion": "Beaten eggs with sugar, milk and cream, which is worked in molds and finished in a bain-marie, culminating in a delicious caramel coating."
			}
		},
		"_id": "63948648364ffdac2230aa71",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 125,
		"disponible": true,
		"img": "https://media.scoolinary.app/blog/images/2021/01/flan-scoolinary1.jpg",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "PAN CON ACEITE Y CHOCOLATE",
				"type": "Postres",
				"descripcion": "Una fina lámina de pan redondo, un aceite de oliva texturizado que a su vez contiene un cremoso de chocolate, un ligero choco aire, una pizca de sal Maldon y unas gotas de aceite de arbequina componen este postre."
			},
			"en": {
				"name": "BREAD WITH OIL AND CHOCOLATE",
				"type": "Desserts",
				"descripcion": "A thin sheet of round bread, a textured olive oil that in turn contains a creamy chocolate, a light choco air, a pinch of Maldon salt and a few drops of arbequina oil make up this dessert."
			}
		},
		"_id": "63948648364ffdac2230aa72",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 130,
		"disponible": true,
		"img": "https://portales.vilbo.com/files/uploads/images/articulos/2019/d462/pa-oli-port.jpg",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "CLAFOUTIS DE CEREZAS",
				"type": "Postres",
				"descripcion": "Galleta de sablé mascabado con núcleo de crema de vainilla y cereza. Gelatina de limón con brotes de hierbaluisa, un rabito de la cereza de chocolate y decoración de pan de oro."
			},
			"en": {
				"name": "CHERRY CLAFOUTIS",
				"type": "Desserts",
				"descripcion": "Muscovado shortbread cookie with a core of vanilla cream and cherry. Lemon jelly with lemon verbena shoots, a stem of the chocolate cherry and gold leaf decoration."
			}
		},
		"_id": "63948648364ffdac2230aa73",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 150,
		"disponible": true,
		"img": "https://portales.vilbo.com/files/uploads/images/articulos/2021/d478/cerezas-queijo-port-bg.jpg",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "QUESO SOUTHWEST",
				"type": "Acompañamientos",
				"descripcion": "Pasta con queso Velveeta derretido, con una mezcla de tomates, chiles escurridos, cebolla colorada y el jalapeño. Decorada con cilantro picado grueso."
			},
			"en": {
				"name": "SOUTHWEST CHEESE",
				"type": "Accompaniments",
				"descripcion": "Pasta with melted Velveeta cheese, with a mixture of tomatoes, drained chiles, red onion and jalapeño. Garnished with coarsely chopped cilantro."
			}
		},
		"_id": "63948648364ffdac2230aa75",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 95,
		"disponible": true,
		"img": "https://s7d2.scene7.com/is/image/lambweston/southwest-queso-1?$ProductImage$",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "MOUSSE DE TIRAMISÚ",
				"type": "Postres",
				"descripcion": "Tiramisú mousse que sorprende, a primera vista, por  elegante y glamourosa presentación, muy en la línea de la filosofía de the Peninsula Hotel Company. A través de nuestro corresponsal y también chef Santiago Corral, conocemos algunos de sus trabajos como figura al frente de la partida dulce del establecimiento."
			},
			"en": {
				"name": "TIRAMISU MOUSSE",
				"type": "Desserts",
				"descripcion": "Iramisu mousse that surprises, at first glance, for its elegant and glamorous presentation, very much in line with the philosophy of the Peninsula Hotel Company. Through our correspondent and also chef Santiago Corral, we learn about some of his work as a figure in charge of the establishment's sweet item."
			}
		},
		"_id": "63948648364ffdac2230aa74",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 120,
		"disponible": true,
		"img": "https://portales.vilbo.com/files/uploads/images/Noticies/2020/08/tiramisu-bruni-port.jpg",
		"__v": 0
	},
	{
		"lenguage": {
			"es": {
				"name": "PAPAS FRITAS PARA SURFEAR",
				"type": "Acompañamientos",
				"descripcion": "Papas fritas en una fuente grande, salsa pico de gallo, la mitad de la salsa de queso y la mitad del queso Cheddar Jack en hebras. Decorado con guacamole y crema agria."
			},
			"en": {
				"name": "FRIES FOR SURFING",
				"type": "Accompaniments",
				"descripcion": "French fries in a large platter, pico de gallo sauce, half the cheese sauce and half the shredded Cheddar Jack cheese. Decorated with guacamole and sour cream."
			}
		},
		"_id": "63948648364ffdac2230aa76",
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"state": true,
		"price": 65,
		"disponible": true,
		"img": "https://www.dinneratthezoo.com/wp-content/uploads/2019/12/cheese-fries-5-500x375.jpg",
		"__v": 0
	}],
	detailDish: {}
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
		case GET_ALL_DISHES:
			return{
				...state,
				allDishes: action.payload.data
			}
		case DETAILS_DISH:
			return{
				...state,
				detailDish: state.allDishes.find(dish => dish._id === action.payload.id)
			}
    case POST_USER_CREATE:
      
      return{
        ...state,
      }
      case LOGIN_USER_JWT:
        localStorage.setItem("token", action.payload);
        return{
          ...state
        }
    default:
      return { ...state };
  }
}

export default rootReducer;