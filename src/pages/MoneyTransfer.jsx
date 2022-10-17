import { Button, Card, Col, Form, Input, Row } from 'antd'
import { useFormik } from 'formik';
import * as yup from "yup"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { transaction } from '../redux/userSlice';
import { Link } from 'react-router-dom';
// 1665652484987
function MoneyTransfer() {
    const { transactionStatus } = useSelector(state => state.users)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            username: "",
            account: "",
            amount: ""
        },
        validationSchema: yup.object({
            username: yup.string().required(),
            account: yup.string().required(),
            amount: yup.string().required(),
        }),
        onSubmit: (values, actions) => {
            dispatch(transaction(values))

        }
    })
    useEffect(() => {
        if (transactionStatus)
            toast.success("transaction successfull !", { position: "top-center", theme: "dark" });

    }, [transactionStatus])


    return (
        <div className='color'>

            <ToastContainer />


            <div className="container mt-5 fixed-top">
                <div className="row">

                    <div className="col-sm-8 offset-sm-2 text-light pt-5">
                        <h1 className='text-light'>Money Transfer: <i class="bi bi-currency-exchange"></i></h1>

                        <form onSubmit={formik.handleSubmit} className="card-body">

                            <h2 className='text-light'>To:</h2>
                            <div className="inpt1">

                                <div className=''>
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className={formik.errors.username && formik.touched.username ? "form-control is-invalid" : "form-control"}
                                        value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        id="username" placeholder="Enter Your username"
                                        name="username"
                                    />
                                    <div className="invalid-feedback">Please choose a username.</div>
                                </div>
                                <br />
                                <div >
                                    <label htmlFor="account number" className="form-label">Account Number</label>
                                    <input type="text" className={formik.errors.account && formik.touched.account ? "form-control is-invalid" : "form-control"}
                                        value={formik.values.account} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        id="account" placeholder="Enter Your account number"
                                    />

                                </div>
                                <br />
                                <div >
                                    <label htmlFor="amount" className="form-label">Amount</label>
                                    <input type="text" className={formik.errors.amount && formik.touched.amount ? "form-control is-invalid" : "form-control"}
                                        value={formik.values.amount} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        id="amount" placeholder="Enter Your Amount"
                                    />

                                </div>
                            </div>
                            <div className="d-flex justify-content-around">
                                <button type="submit" className="btn update mt-3 px-4" >Transfer Funds</button>
                            </div>
                            {/* <Link to="/adminlogin">
                                                <button type="button" class="btn btn-primary">

                                                    Admin
                                                </button>
                                            </Link> */}



                        </form>


                    </div>
                </div>

            </div>





        </div >
    )
}

export default MoneyTransfer