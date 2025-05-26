import NavBar from "./components/shared/NavBar";
import Products from "./components/products/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import About from "./components/shared/About";
import Contact from "./components/shared/Contact";
import { Toaster } from "react-hot-toast";
import Cart from "./components/cart/cart";



function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/products' element={<Products />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/cart' element={<Cart />}/>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center"/>
    </>
  );
}

export default App;
