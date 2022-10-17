import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from "yup"
import { adminClientUpdate, AdminGetAllClients } from '../../redux/authSlice';

const EditClient = () => {
    const dispatch = useDispatch()
    const { allClients, adminUpdateClient, loading } = useSelector(state => state.auth)
    const [client, setClient] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: ""
        },
        validationSchema: yup.object({
            username: yup.string().required(),
            name: yup.string().required(),
            email: yup.string().required()
        }),
        onSubmit: (values, actions) => {
            dispatch(adminClientUpdate({ ...values, _id: client._id }))
            setClient(false)
        }
    })

    useEffect(() => {
        dispatch(AdminGetAllClients())
    }, [adminUpdateClient])

    useEffect(() => {
        if (adminUpdateClient) {
            toast.success("Client Updated Successfully ")
        }
    }, [adminUpdateClient])


    return (<>
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

        <div className='edit-client'>
            <div className="container">
                <div className='fs-1 text-center text-light pb-5'>Update Client</div>
                <div className="row">
                    {loading && <div class="spinner-border text-primary"></div>}
                    <div className='col-sm-6'>

                        <ul className='list-group'>
                            {
                                allClients.map((item, i) =>
                                    <li
                                        className={`list-group-item ${item.name === client.name && "bg-primary text-light"}`}
                                        onClick={e => { setClient(item) }}
                                        key={i}>{item.name}</li>
                                )
                            }
                        </ul>
                    </div>
                    <div className='col-sm-6'>
                        {client && <form onSubmit={formik.handleSubmit} className="card-body">
                            <div>
                                <div className='d-flex justify-content-between'>
                                    <label htmlFor="name" className="form-label">Enter Name</label>
                                    <strong>Previous Name : {client.name}</strong>
                                </div>
                                <input type="text" className={formik.errors.name && formik.touched.name ? "form-control is-invalid" : "form-control"}
                                    value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    id="name" placeholder="Enter Name"
                                    name='name'
                                />
                                <div className="invalid-feedback">Please choose a username.</div>
                            </div>
                            <br />
                            <div>
                                <div className='d-flex justify-content-between'>
                                    <label htmlFor="username" className="form-label">Enter Username</label>
                                    <strong>Previous Username : {client.username}</strong>
                                </div>
                                <input type="text" className={formik.errors.username && formik.touched.username ? "form-control is-invalid" : "form-control"}
                                    value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    id="username" placeholder="Enter Username"
                                    name='username'
                                />
                                <div className="invalid-feedback">Please choose a username.</div>
                            </div>
                            <br />
                            <div >
                                <div className='d-flex justify-content-between'>
                                    <label htmlFor="email" className="form-label">Enter Email</label>
                                    <strong>Previous Name : {client.email}</strong>
                                </div>
                                <input type="text" className={formik.errors.email && formik.touched.email ? "form-control is-invalid" : "form-control"}
                                    value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    id="email" placeholder="Enter Email"
                                    name='email'
                                />
                                <div className="invalid-feedback">Please choose a email.</div>
                            </div>
                            <br />
                            <div className="d-flex justify-content-around">
                                <button type='submit' className="btn btn-primary mt-3 px-5">Update Client</button>
                            </div>
                        </form>
                        }
                    </div>
                </div>
            </div>

        </div>
    </>
    );
}

export default EditClient;
