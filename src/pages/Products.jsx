import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import '../styles/Products.scss'
import { api } from "../utils/api";
import { notifySuccess, notifyInfo } from "../utils/toast";

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get("/");
        setProducts(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  //this is for new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  // this is for adding any new product
 const handleAddProduct = async () => {
    if (!newProduct.name.trim() || !newProduct.price || isNaN(newProduct.price)) {
      notifyInfo("Please enter a valid name and numeric price.");
      return;
    }
    const payload = {
      name: newProduct.name.trim(),
      price: parseFloat(newProduct.price),
      image: newProduct.image.trim() || "https://via.placeholder.com/150",
    };
    const res = await api.post("/", payload);
    setProducts((p) => [...p, res.data]);
    setNewProduct({ name: "", price: "", image: "" });
    notifySuccess("Product added");
  };

  // this is for Delete product
  const handleDelete = async (id) => {
  await api.delete(`/${id}`);
    setProducts((p) => p.filter((x) => x.id !== id));
    notifyInfo("Product deleted");
  };

  //this to edit produuct
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", price: "", image: "" });
  const handleEdit = (product) => {
    setEditId(product.id);
    setEditData(product);
  };


  //this is for save product
 const handleSave = async () => {
    if (!editData.name.trim() || !editData.price || isNaN(editData.price)) {
      notifyInfo("Please enter valid name and price.");
      return;
    }
    const payload = { ...editData, price: parseFloat(editData.price) };
    const res = await api.put(`/${editId}`, payload);
    setProducts((p) => p.map((it) => (it.id === editId ? res.data : it)));
    setEditId(null);
    setEditData({ name: "", price: "", image: "" });
    notifySuccess("Product updated");
  };

  return (
    <main className="products">
      <h2>Available Products</h2>
      <div className="add-product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div className="product-list">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onDelete={handleDelete} editId={editId} onEdit={handleEdit} onSave={handleSave} setEditId={setEditId}   editData={editData} setEditData={setEditData} />
        ))}
      </div>
    </main>
  );
}
