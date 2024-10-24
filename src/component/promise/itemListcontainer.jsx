import { useEffect, useState } from "react";
import { MisProductos } from "../../data/data.js";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "./itemListcintainer.css";
const ItemDataContainer = () => {
  const [productos, setProductos] = useState([]);
  const {Idcategory} = useParams()

  useEffect(() => {
    MisProductos()
      .then((data) => {
        if(Idcategory) {
          const filtrarProducto = data.filter((productos) => productos.category === Idcategory)
          setProductos(filtrarProducto)
        }else {
          setProductos(data)
        }
      })
      .catch((error) => {
        console.error(error);
      })
    },[Idcategory]);

  return (
    <div className="Products">
      {
        productos.map((producto) => (
          <div key={producto.id} className="card">
            <img src={producto.image} alt="" />
            <h2>{producto.name}</h2>
            <p>Precio: ${producto.price}</p>
            <p>category: {producto.category}</p>
            <Link to={"/detail/" + producto.id}><button>Ver mas</button></Link>
          </div>
        ))
      }
    </div>
  );
};

export default ItemDataContainer;