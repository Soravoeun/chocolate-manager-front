import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [originCountry, setOriginCountry] = useState("");
  const [grams, setGrams] = useState(0);
  const [price, setPrice] = useState(0);

  const getProducts = () => {
    fetch(`${import.meta.env.VITE_API_URL}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.length);
        setProducts(data);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      name: name,
      description: description,
      imageUrl: imageUrl,
      originCountry: originCountry,
      grams: grams,
      price: price,
    };

    fetch(`${import.meta.env.VITE_API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    }).then(() => {
      // Refresh to get the new products
      getProducts();
    });
  };

  // Delete product
  const deleteProduct = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/delete/${id}`, {
      method: "DELETE",
    }).then(() => {
      // Refresh to get the new products
      getProducts();
    });
  };

  return (
    <>
      <div className="cards-container">
        {products.map((product) => (
          <div className="card" key={product._id}>
            <img
              src={product.imageUrl}
              className="card-img-top"
              alt={product.description}
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">{product.price}€</p>
              <p className="card-text">{product.grams} grams</p>
              <p className="card-text">{product.originCountry}</p>

              <a
                onClick={(e) => {
                  e.preventDefault();
                  deleteProduct(product._id);
                }}
                href="#"
                class="btn btn-sm btn-outline-danger"
              >
                Delete
              </a>
            </div>
          </div>
        ))}
      </div>

      <form className="mt-5" method="post" onSubmit={handleSubmit}>
        <div className="form-floating mb-3" id="numberOne">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Product's name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label> Product's name </label>
        </div>
        <div className="form-floating  mb-3">
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="Product's description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <label> Description </label>
        </div>
        <div className="form-floating  mb-3">
          <input
            type="number"
            className="form-control"
            name="price"
            placeholder="Product's price"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <label> Price </label>
        </div>
        <div className="form-floating  mb-3">
          <input
            type="number"
            className="form-control"
            name="grams"
            placeholder="Product's grams"
            value={grams}
            onChange={(event) => {
              setGrams(event.target.value);
            }}
          />
          <label> Grams </label>
        </div>
        <div className="form-floating  mb-3">
          <input
            type="text"
            className="form-control"
            name="originCountry"
            placeholder="Origin country"
            value={originCountry}
            onChange={(event) => {
              setOriginCountry(event.target.value);
            }}
          />
          <label> Origin country </label>
        </div>
        <div className="form-floating  mb-3">
          <input
            type="text"
            className="form-control"
            name="imageUrl"
            placeholder="Product's image link"
            value={imageUrl}
            onChange={(event) => {
              setImageUrl(event.target.value);
            }}
          />
          <label> Image </label>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          id="inputGroupFileAddon04"
        >
          Create
        </button>
      </form>
    </>
  );
}

export default App;
