import { Button, Card, Col, Form, Input, Row } from 'antd'
import React, { useEffect } from 'react'
import * as yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clientChangePassword, clientUpdate, logoutAction } from '../redux/userSlice'
import { useFormik } from 'formik';

export default function Account() {
  const { login, clientInfoUpdated, ChangePassword } = useSelector(state => state.users)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      username: login.username, email: login.email, password: "12345"
    },
    validationSchema: yup.object({
      username: yup.string().required(),
      password: yup.string().required(),
      email: yup.string().required(),
    }),
    onSubmit: (details, actions) => {
      dispatch(clientUpdate(details))
    }
  })

  return (
    <>
      <div className="acc">
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col-sm-6 offset-sm-3 text-light">

              <form onSubmit={formik.handleSubmit} className="card-body">
                <div className="text-center fs-1">User Account</div>
                <div className="inpt1">


                  <div className=''>
                    <label htmlFor="username" className="form-label fs-4">Username</label>
                    <input type="text" className={formik.errors.username && formik.touched.username ? "form-control is-invalid" : "form-control"}
                      value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      id="username" placeholder="Enter Your username" />
                    <div className="invalid-feedback">Please choose a username.</div>
                  </div>
                  <div >
                    <label htmlFor="email" className="form-label fs-4">email</label>
                    <input type="email" className={formik.errors.email && formik.touched.email ? "form-control is-invalid" : "form-control"}
                      value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      id="email" placeholder="Enter Your email"
                    />
                    <div className="invalid-feedback">Please choose a password.</div>
                  </div>
                  <div >
                    <label htmlFor="password" className="form-label fs-4">Password</label>
                    <input type="password" className={formik.errors.password && formik.touched.password ? "form-control is-invalid" : "form-control"}
                      value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      id="password" placeholder="Enter Your Password"
                    />

                  </div>
                  <div className="d-flex justify-content-around">
                    <button type="submit" className="btn update  mt-3 px-5" >Update Details</button>
                  </div>
                </div>
              </form>

            </div>

          </div>

        </div>






      </div>
    </>
  )
}
