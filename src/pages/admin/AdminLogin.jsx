// import React, { useEffect } from 'react'
import { Button, Card, Col, Input, Form, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { json, Link, useNavigate } from "react-router-dom";
import { adminLogin } from "../../redux/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from "formik";
import * as yup from "yup";
import { loginUser } from "../../redux/userSlice";


function Adminlogin() {
    const { adLogin } = useSelector((state) => state.auth);
    const { login } = useSelector((state) => state.users);
    const [switchform, setswitchform] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: "admin",
            password: "123"
        },
        validationSchema: yup.object({
            username: yup.string().required(),
            password: yup.string().required()
        }),
        onSubmit: (values, actions) => {
            // if (switchform) {
            dispatch(adminLogin(values))
            // } else {
            //     dispatch(loginUser(values))
            // }
        }
    })

    useEffect(() => {
        if (adLogin) {
            navigate("/caccount");
        }
        if (login && login.username) {
            navigate("/MoneyTransfer")
        }
    }, [adLogin, login])

    return (<>
        <ToastContainer />
        <div className="background adminlogin">
            <div className="container" >
                <div className="row" >
                    <div className="col-md-6">
                        <div className="d-grid justify-content-center text-light">
                            <p className="fs-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, dolor!</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam officiis asperiores alias. Nihil consectetur porro, cupiditate, vel reiciendis ullam tempora nulla laudantium excepturi exercitationem esse illo, fugiat veniam odit ex.</p>
                        </div>
                    </div>
                    <div className="col-md-5 offset-md-1">
                        <div className="card">
                            <div className="card-header fs-5 d-flex justify-content-around bg-dark text-light">
                                {/* <button onClick={e => setswitchform(true)}
                                    className={`btn ${switchform && "bg-success"} text-light`}>Admin Login</button>
                                <button onClick={e => setswitchform(false)}
                                    className={`btn ${!switchform && "bg-success"} text-light`}>Client Login</button> */}
                                <div className="fs-3">Admin Login</div>
                            </div>
                            <form onSubmit={formik.handleSubmit} className="card-body">
                                <div>
                                    <label htmlFor="username" className="form-label">Enter Username</label>
                                    <input type="text" className={formik.errors.username && formik.touched.username ? "form-control is-invalid" : "form-control"}
                                        value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        id="username" placeholder="Enter Your Username"
                                    />
                                    <div className="invalid-feedback">Please choose a username.</div>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className={formik.errors.password && formik.touched.password ? "form-control is-invalid" : "form-control"}
                                        value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        id="password" placeholder="Enter Your Password"
                                    />
                                    <div className="invalid-feedback">Please choose a password.</div>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <button type="submit" className="btn btn-primary mt-3 px-5" >Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Adminlogin