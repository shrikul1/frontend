import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useFormik, yupToFormErrors } from "formik"
import * as yup from "yup"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./../css/login.css"


import { loginUser } from "../redux/userSlice";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const formik = useFormik({
        initialValues: {
            username: "kate@gmail.com",
            password: "123"
        },
        validationSchema: yup.object({
            username: yup.string().required(),
            password: yup.string().required()
        }),
        onSubmit: (values, actions) => {
            console.log();
            dispatch(loginUser(values))
        }
    })
    const { login } = useSelector(state => state.users)
    const { adminLogin } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (login && login.username) {
            navigate("/MoneyTransfer")
        }

    }, [login])
    useEffect(() => {
        if (adminLogin && adminLogin.username) {

            navigate("/caccount")
        }

    }, [adminLogin])






    return (
        <>
            <ToastContainer />
            <div className="background1">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 offset-sm-3 text-light">
                            <div className=''>
                                <form onSubmit={formik.handleSubmit} className="card-body">
                                    <div className="text-center fs-1">Login</div>
                                    <div className='mt-2'>
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" className={formik.errors.username && formik.touched.username ? "form-control is-invalid" : "form-control"}
                                            value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                            id="username" placeholder="Enter Your username
                                            "
                                        />
                                        <div className="invalid-feedback">Please choose a username.</div>
                                    </div>
                                    <div >
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className={formik.errors.password && formik.touched.password ? "form-control is-invalid" : "form-control"}
                                            value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                            id="password" placeholder="Enter Your Password"
                                        />
                                        <div className="invalid-feedback">Please choose a password.</div>
                                    </div>
                                    <div className="d-flex justify-content-around">
                                        <button type="submit" className="btn update  mt-3 px-5">Login</button>
                                    </div>
                                    <Link to="/adminlogin">
                                        <button type="button" class="btn  update">

                                            Admin
                                        </button>
                                    </Link>



                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login