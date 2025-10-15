import ProductCard from "../components/ProductCard";
import { useState } from "react";
import '../styles/Products.scss'

export default function Products() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 17",
      price: 99,
      image: "https://m.media-amazon.com/images/I/716Bo6d914L._AC_SL1500_.jpg",
    },
    {
      id: 2,
      name: "Galaxy S25 Ultra",
      price: 49,
      image:
        "https://m.media-amazon.com/images/I/61wRxkTFZhL._AC_SY300_SX300_QL70_ML2_.jpg",
    },
    {
      id: 3,
      name: "Google Pixel 9",
      price: 199,
      image:
        "https://m.media-amazon.com/images/I/51rBmPsvC+L._AC_SX300_SY300_QL70_ML2_.jpg",
    },
    {
      id: 4,
      name: "OnePlus 12",
      price: 89,
      image:
        "https://m.media-amazon.com/images/I/71o8VehMHXL._AC_SY300_SX300_QL70_ML2_.jpg",
    },
    {
      id: 5,
      name: "Xiaomi 14 Pro",
      price: 79,
      image:
        "https://m.media-amazon.com/images/I/61WboUKXp2L._AC_SY300_SX300_QL70_ML2_.jpg",
    },
    {
      id: 6,
      name: "Sony Xperia 1 V",
      price: 120,
      image:
        "https://m.media-amazon.com/images/I/71XwFAUiIcL._AC_SY300_SX300_QL70_ML2_.jpg",
    },
    {
      id: 7,
      name: "Huawei P60 Pro",
      price: 95,
      image:
        "https://m.media-amazon.com/images/I/71JlgLiugdL._AC_SY300_SX300_QL70_ML2_.jpg",
    },
    {
      id: 8,
      name: "Nothing Phone 2",
      price: 85,
      image:
        "https://m.media-amazon.com/images/I/51K+qyuOXjL._AC_SY300_SX300_QL70_ML2_.jpg",
    },
    {
      id: 9,
      name: "Motorola Edge 40",
      price: 59,
      image:
        "https://m.media-amazon.com/images/I/71RVcSlL8aL._AC_SY300_SX300_QL70_ML2_.jpg",
    },
    {
      id: 10,
      name: "Asus Zenfone 10",
      price: 110,
      image: "https://m.media-amazon.com/images/I/41rzoeSHMiL._AC_SY879_.jpg",
    },
  ]);

  //this is for new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  // this is for adding any new product
  const handleAddProduct = () => {
    if (
      !newProduct.name.trim() ||
      !newProduct.price ||
      isNaN(newProduct.price)
    ) {
      alert("Please enter product name and price.");
      return;
    }

 const newItem = {
    id: Date.now(),
    name: newProduct.name.trim(),
    price: parseFloat(newProduct.price),
    image: newProduct.image.trim() || "https://via.placeholder.com/150",
  };

    setProducts([...products, newItem]);
    setNewProduct({ name: "", price: "", image: "" });
  };

  // this is for Delete product
  const handleDelete = (id) => {
    setProducts(products?.filter((p) => p.id !== id));
  };

  //this to edit produuct
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", price: "", image: "" });
  const handleEdit = (product) => {
    setEditId(product.id);
    setEditData(product);
  };

  const handleSave = async () => {
    if (!editData.name.trim() || !editData.price || isNaN(editData.price)) {
      alert("Please enter valid product details.");
      return;
    }

    setProducts((prev) =>
      prev.map((p) =>
        p.id === editId ? { ...editData, price: parseFloat(editData.price) } : p
      )
    );
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
          <ProductCard key={p.id} product={p} onDelete={handleDelete} editId={editId} onEdit={handleEdit} onSave={handleSave} setEditId={setEditId}   editData={editData} setEditData={setEditData} />
        ))}
      </div>
    </main>
  );
}
