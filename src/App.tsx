import NavBar from "./components/shared/NavBar";
import Products from "./components/products/Products";

function App() {
  return (
    <>
      <NavBar />
      <div className="flex justify-center">
        {/* <div className="w-[20%] flex-col justify-around items-center"></div> */}
        <Products />
      </div>
    </>
  );
}

export default App;
