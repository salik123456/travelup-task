import './styles/App.scss'
import Header from "./components/Header";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {

  return (
    <>
     <Header />
      <Products />
        <ToastContainer position="top-right" autoClose={2500} />
      <Footer />

    </>
  )
}

export default App
