import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './pages/Login';
import 'react-toastify/dist/ReactToastify.css';
// import { Navbar } from "./components/Navbar"
import 'antd/dist/antd.min.css'; // or 'antd/dist/antd.less'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
// import Register from "./pages/Register";
import Account from "./pages/Account";
import MoneyTransfer from "./pages/MoneyTransfer";
import Transactions from "./pages/Transactions";
import LoginOnly from "./pages/LoginOnly";
import Adminlogin from "./pages/admin/AdminLogin";
import ClientAccount from "./pages/admin/CreateClient";
import AdminOnly from "./pages/admin/AdminOnly";
import ClientDetails from "./pages/admin/AllClients";
import PageNotFound from "./pages/PageNotFound";
import "./css/application.css"
import EditClient from "./pages/admin/EditClient";
import "./css/login.css"
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <BrowserRouter >
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/adminlogin" element={<Adminlogin />}></Route>

        <Route path="/account" element={<LoginOnly element={<Account />} />}></Route>
        <Route path="/transactions" element={<LoginOnly element={<Transactions />} />}></Route>
        <Route path="/moneytransfer" element={<LoginOnly element={<MoneyTransfer />} />}></Route>
        <Route path="/changepassword" element={<LoginOnly element={<ChangePassword />} />}></Route>

        <Route path="/allclients" element={<AdminOnly element={<ClientDetails />} />}></Route>
        <Route path="/editclient" element={<AdminOnly element={<EditClient />} />}></Route>
        <Route path="/caccount" element={<AdminOnly element={<ClientAccount />} />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
