import { createContext, useContext, useReducer } from "react";
import { api } from "../utils/api";
import { notifySuccess, notifyInfo, notifyError } from "../utils/toast";

const ProductContext = createContext();

const initialState = {
  products: [],
  loading: false,
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_PRODUCTS":
      return { ...state, products: payload };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, payload] };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === payload.id ? payload : p
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== payload),
      };
    case "SET_LOADING":
      return { ...state, loading: payload };
    default:
      return state;
  }
}

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setProducts = (products) =>
    dispatch({ type: "SET_PRODUCTS", payload: products });
  const setLoading = (val) =>
    dispatch({ type: "SET_LOADING", payload: val });

  // Add product
  const addProduct = async (product) => {
    try {
      setLoading(true);
      const res = await api.post("/", product);
      dispatch({ type: "ADD_PRODUCT", payload: res.data });
      notifySuccess("Product added successfully!");
    } catch (err) {
      notifyError("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  // Update product
  const updateProduct = async (id, product) => {
    try {
      setLoading(true);
      const res = await api.put(`/${id}`, product);
      dispatch({ type: "UPDATE_PRODUCT", payload: res.data });
      notifySuccess("Product updated successfully!");
    } catch (err) {
      notifyError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/${id}`);
      dispatch({ type: "DELETE_PRODUCT", payload: id });
      notifyInfo("Product deleted");
    } catch (err) {
      notifyError("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        setLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
