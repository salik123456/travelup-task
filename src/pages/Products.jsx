import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import "../styles/Products.scss";
import { api } from "../utils/api";
import { useProducts } from "../context/ProductContext";

export default function Products() {
  const {
    products,
    loading,
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    setLoading,
  } = useProducts();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get("/");
        setProducts(res.data);
      } catch (err) {
        notifyError("⚠️ Failed to fetch products.");
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
    image: "",
  });

  // this is for adding any new product
  const handleAddProduct = async () => {
    if (!newProduct.name.trim() || !newProduct.price) {
      notifyError("Please enter valid name and price.");
      return;
    }
    await addProduct({
      ...newProduct,
      price: parseFloat(newProduct.price),
      image: newProduct.image || "https://via.placeholder.com/150",
    });
    setNewProduct({ name: "", price: "", image: "" });
  };

  // this is for Delete product
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      deleteProduct(id);
    } catch {
      notifyError("Failed to delete product");
    } finally {
      setLoading(false);
    }
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
    if (!editData.name.trim() || !editData.price) {
      notifyError("Please enter valid name and price.");
      return;
    }
    await updateProduct(editId, {
      ...editData,
      price: parseFloat(editData.price),
    });
    setEditId(null);
    setEditData({ name: "", price: "", image: "" });
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
          <ProductCard
            key={p.id}
            product={p}
            onDelete={handleDelete}
            editId={editId}
            onEdit={handleEdit}
            onSave={handleSave}
            setEditId={setEditId}
            editData={editData}
            setEditData={setEditData}
          />
        ))}
      </div>
    </main>
  );
}
