import { Button } from 'antd';
// import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from '../redux/userSlice';
import { adminLogoutAction } from '../redux/authSlice';

function Navbar() {
    const { login } = useSelector(state => state.users)
    const { adLogin } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    // useEffect(() => {
    //     if (login && login.username) {

    //         navigate("/MoneyTransfer")
    //     }
    // }, [login])

    return (
        <>
            <nav className="navbar navbar-expand-md fixed-top bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Banking-Application  <i className="bi bi-coin"></i></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav ">
                            {
                                login && login.username && <div className="dropdown">
                                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                                        {login.username}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><button type='text' onClick={e => dispatch(logoutAction())} className="dropdown-item">Logout</button></li>
                                    </ul>
                                </div>
                            }
                            {
                                adLogin && adLogin.username && <div className="dropdown">
                                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                                        {adLogin.username}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><button type='text' onClick={e => dispatch(adminLogoutAction())} className="dropdown-item">Logout</button></li>
                                    </ul>
                                </div>
                            }

                            <Link to="/" className="nav-link">Home</Link>
                            {!login && !adLogin && <Link to="/login" className="nav-link active">Login</Link>}
                            {login && <>
                                <Link to="/account" className="nav-link">Account</Link>
                                <Link to="/transactions" className="nav-link">Transactions</Link>
                                <Link to="/moneytransfer" className="nav-link">Money-Transfer</Link>
                                <Link to="/changepassword" className="nav-link">Change Password</Link>
                            </>
                            }
                            {adLogin && <>
                                <Link to="/allclients" className="nav-link">All Clients</Link>
                                <Link to="/caccount" className="nav-link">Create Client</Link>
                                <Link to="/editclient" className="nav-link">Update Client</Link>
                            </>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar