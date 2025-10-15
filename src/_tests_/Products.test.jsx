import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductProvider } from "../context/ProductContext";
import Products from "../pages/Products";
import axios from "axios";
import "@testing-library/jest-dom";
import { notifyError } from "../utils/toast";


jest.mock("../utils/toast", () => ({
  notifyError: jest.fn(),
}));


jest.mock("axios", () => {
  const mockAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: { response: { use: jest.fn() } },
  };

  return {
    create: jest.fn(() => mockAxiosInstance),
    __mockInstance: mockAxiosInstance,
  };
});

const mockAxiosInstance = axios.__mockInstance;

describe("Products Page - Integration Tests", () => {
  const mockProducts = [
    { id: 1, name: "Laptop", price: 1000, image: "laptop.jpg" },
    { id: 2, name: "Phone", price: 800, image: "phone.jpg" },
  ];

  const renderProducts = () =>
    render(
      <ProductProvider>
        <Products />
      </ProductProvider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
    mockAxiosInstance.get.mockResolvedValue({ data: mockProducts });
  });

  it("renders products from API", async () => {
    renderProducts();

    expect(await screen.findByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
  });

  it("adds a new product", async () => {
    mockAxiosInstance.post.mockResolvedValue({
      data: { id: 3, name: "Tablet", price: 500, image: "tablet.jpg" },
    });

    renderProducts();

    fireEvent.change(screen.getByPlaceholderText(/Product Name/i), {
      target: { value: "Tablet" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Price/i), {
      target: { value: "500" },
    });
    fireEvent.click(screen.getByText("Add Product"));

    expect(await screen.findByText("Tablet")).toBeInTheDocument();
  });

  it("edits a product", async () => {
    mockAxiosInstance.put.mockResolvedValue({
      data: { id: 1, name: "Gaming Laptop", price: 1200, image: "laptop.jpg" },
    });

    renderProducts();

    const editButtons = await screen.findAllByText(/Edit/i);
    fireEvent.click(editButtons[0]);
    fireEvent.change(screen.getByDisplayValue("Laptop"), {
      target: { value: "Gaming Laptop" },
    });
    fireEvent.click(screen.getByText(/Save/i));

    expect(await screen.findByText("Gaming Laptop")).toBeInTheDocument();
  });

  it("deletes a product", async () => {
    mockAxiosInstance.delete.mockResolvedValue({});

    renderProducts();

    const deleteBtns = await screen.findAllByText(/Delete/i);
    fireEvent.click(deleteBtns[0]);

    await waitFor(() =>
      expect(screen.queryByText("Laptop")).not.toBeInTheDocument()
    );
  });

  it("shows validation error when adding invalid product", async () => {
    mockAxiosInstance.get.mockResolvedValue({ data: [] });

    renderProducts();
    fireEvent.click(screen.getByText("Add Product"));

    await waitFor(() =>
      expect(notifyError).toHaveBeenCalledWith("Please enter valid name and price.")
    );
  });
});
