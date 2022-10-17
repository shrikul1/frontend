import { Button, Card, Col, Form, Input, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { AdminGetAllClients, CreateclientAcc } from '../../redux/authSlice';
import { useFormik } from 'formik';

function ClientAccount() {
    const { client } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: "john doe",
            username: "john",
            email: "john@gmail.com",
            password: "12345",
        },
        validationSchema: yup.object({
            name: yup.string().required(),
            username: yup.string().required(),
            email: yup.string().required(),
            password: yup.string().required(),
        }),
        onSubmit: (values, actions) => {
            dispatch(CreateclientAcc(values))
        }
    })

    // toast.success("Admin logged in successfully!", { position: "top-center", theme: "dark" })

    useEffect(() => {
        if (client) {
            toast.success("Client-Account created successfully!")
        }
    }, [client]);
    useEffect(() => {
        dispatch(AdminGetAllClients())
    }, []);



    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {/* //name username email password */}
            <div className='create-client text-light'>
                <div className="container">

                    <form onSubmit={formik.handleSubmit} className="card-body">
                        <div className='fs-1 text-center' >Create New Client Account</div>
                        <br />
                        <div>
                            <label htmlFor="name" className="form-label">Enter Username</label>
                            <input type="text" className={formik.errors.name && formik.touched.name ? "form-control is-invalid" : "form-control"}
                                value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                id="name" placeholder="Enter Your Username"
                            />
                            <div className="invalid-feedback">Please choose a username.</div>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="username" className="form-label">Enter Username</label>
                            <input type="text" className={formik.errors.username && formik.touched.username ? "form-control is-invalid" : "form-control"}
                                value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                id="username" placeholder="Enter Your Username"
                            />
                            <div className="invalid-feedback">Please choose a username.</div>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="email" className="form-label">Enter Username</label>
                            <input type="text" className={formik.errors.email && formik.touched.email ? "form-control is-invalid" : "form-control"}
                                value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                id="email" placeholder="Enter Your Username"
                            />
                            <div className="invalid-feedback">Please choose a email.</div>
                        </div>
                        <br />
                        <div >
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className={formik.errors.password && formik.touched.password ? "form-control is-invalid" : "form-control"}
                                value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                id="password" placeholder="Enter Your Password"
                            />
                            <div className="invalid-feedback">Please choose a password.</div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-around">
                            <button type="submit" className="btn btn-primary mt-3 px-5" >Create Account</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default ClientAccount