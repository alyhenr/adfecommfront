import NavBar from "./components/shared/NavBar";
import Products from "./components/products/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";



function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/products' element={<Products />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
