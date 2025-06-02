import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import About from "./components/shared/About";
import Contact from "./components/shared/Contact";
import { Toaster } from "react-hot-toast";
import Cart from "./components/cart/Cart";
import Login from "./components/auth/Login";
import PrivateRouter from "./components/auth/PrivateRouter";
import SignUp from "./components/auth/SignUp";
import Checkout from "./components/checkout/Checkout";
import OrderConfirmation from "./components/checkout/OrderConfirm";
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserLayout from "./components/user/UserLayout";
import Profile from "./components/user/Profile";
import Purchases from "./components/user/Purchases";
import Settings from "./components/user/Settings";
import Layout from "./components/shared/Layout";
import Products from "./components/products/Products";
import FAQ from "./components/help/FAQ";
import HelpCenter from "./components/help/HelpCenter";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import Terms from "./components/legal/Terms";
import CookiePolicy from "./components/legal/CookiePolicy";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />}/>
            <Route path='/products' element={<Products />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/contact' element={<Contact />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/help' element={<HelpCenter />}/>
            <Route path='/faq' element={<FAQ />}/>
            <Route path='/privacy' element={<PrivacyPolicy />}/>
            <Route path='/terms' element={<Terms />}/>
            <Route path='/cookies' element={<CookiePolicy />}/>

            <Route element={<PrivateRouter isPublic={true} />}>
              <Route path='/login' element={<Login />}/>
              <Route path='/signup' element={<SignUp />}/>
            </Route>

            <Route element={<PrivateRouter isPublic={false} />}>
              <Route path='/checkout' element={<Checkout />}/>
              <Route path='/order-confirm' element={<OrderConfirmation />}/>
              <Route path="/user" element={<UserLayout />}>
                <Route path="profile" element={<Profile />} />
                <Route path="purchases" element={<Purchases />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center" />
    </GoogleOAuthProvider>
  );
}

export default App;
