import { useState, useEffect } from "react";

import { Spinner } from "../../components";
import { firebase } from "../../config";

function Home() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [mainButton, setMainButton] = useState("Save");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [canceUpdate, setCancelUpdate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    firebase
      .database()
      .ref("products")
      .orderByChild("price")
      .on("value", res => {
        if (res.val()) {
          const rawData = res.val();
          const productArray = [];
          Object.keys(rawData).map(i => {
            return productArray.push({ id: i, ...rawData[i] });
          });
          setProducts(productArray.reverse());
        }
      });
  }, []);

  const resetData = () => {
    setProductName("");
    setCategory("");
    setPrice("");
  };

  const onSubmit = e => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      product: productName,
      category: category,
      price: price,
    };

    if (mainButton === "Save") {
      firebase.database().ref("products").push(data);
    } else {
      firebase
        .database()
        .ref("products/" + selectedProduct.id)
        .set(data);

      setMainButton("Save");
    }

    resetData();

    setIsLoading(false);
    setIsEditing(false);
  };

  const onUpdate = item => {
    setProductName(item.product);
    setCategory(item.category);
    setPrice(item.price);
    setSelectedProduct(item);

    setMainButton("Update");
    setCancelUpdate(true);
    setIsEditing(true);
  };

  const onDelete = item => {
    firebase
      .database()
      .ref("products/" + item.id)
      .remove();
  };

  const onCancelUpdate = () => {
    resetData();
    setCancelUpdate(false);
    setMainButton("Save");
    setIsEditing(false);
  };

  return (
    <div>
      <h2 className="text-center">Home</h2>
      <hr />
      <form>
        <div className="row">
          <div className="col-sm-4 p-1">
            <div className="mb-3">
              <label htmlFor="product-name" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="product-name"
                placeholder="Type the product name"
                value={productName}
                onChange={e => setProductName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-4 p-1">
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                placeholder="Type the category"
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-4 p-1">
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                placeholder="Type the product name"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary m-1"
            style={{ minWidth: "150px" }}
            onClick={e => onSubmit(e)}
          >
            {isLoading && <Spinner />}
            {!isLoading && mainButton}
          </button>
          {canceUpdate && (
            <button
              type="button"
              className="btn btn-secondary m-1"
              onClick={onCancelUpdate}
            >
              Batal
            </button>
          )}
        </div>
      </form>
      <hr />
      <table className="table table-responsive">
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(i => {
            return (
              <tr key={i.id}>
                <td>{i.product}</td>
                <td>{i.category}</td>
                <td>{i.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success btn-sm m-1"
                    onClick={() => onUpdate(i)}
                  >
                    Edit
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      className="btn disabled btn-danger btn-sm m-1"
                      onClick={() => onDelete(i)}
                    >
                      Delete
                    </button>
                  )}
                  {!isEditing && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm m-1"
                      onClick={() => onDelete(i)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
