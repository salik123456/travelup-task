export default function ProductCard({
  product,
  onDelete,
  editId,
  onEdit,
  onSave,
  setEditId,
  setEditData,
  editData
}) {
  return (
 <div className="product-card" key={product.id}>
  {editId === product.id ? (
    <>
      <input
        type="text"
        value={editData.name}
        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
      />
      <input
        type="number"
        value={editData.price}
        onChange={(e) =>
          setEditData({ ...editData, price: e.target.value })
        }
      />
      <input
        type="text"
        value={editData.image}
        onChange={(e) =>
          setEditData({ ...editData, image: e.target.value })
        }
      />
      <div className="actions">
        <button className="save" onClick={onSave}>Save</button>
        <button className="cancel" onClick={() => setEditId(null)}>Cancel</button>
      </div>
    </>
  ) : (
    <>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <div className="actions">
        <button className="edit" onClick={() => onEdit(product)}>Edit</button>
        <button className="delete" onClick={() => onDelete(product.id)}>Delete</button>
      </div>
    </>
  )}
</div>

  );
}
