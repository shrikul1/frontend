import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as yup from "yup"
import { clientChangePassword } from '../redux/userSlice'

function ChangePassword() {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
        },
        validationSchema: yup.object({

            oldpassword: yup.string().required(),
            newpassword: yup.string().required(),

        }),
        onSubmit: (details, actions) => {

            dispatch(clientChangePassword(details))
        }
    })

    return (
        <>
            <div className='asd changepass'>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 offset-sm-3">

                            <form onSubmit={formik.handleSubmit} className="card-body">
                                <div className="text-center fs-1">Change Password</div>
                                <div className="inpt1">


                                    <div className='mt-4'>
                                        <label htmlFor="oldpassword" className="form-label fs-4">oldpassword</label>
                                        <input type="password" className={formik.errors.oldpassword && formik.touched.oldpassword ? "form-control is-invalid" : "form-control"}
                                            value={formik.values.oldpassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                            id="oldpassword" placeholder="Enter Your oldpassword" />

                                    </div>
                                    <div >
                                        <label htmlFor="newpassword" className="form-label fs-4">newpassword</label>
                                        <input type="password" className={formik.errors.newpassword && formik.touched.newpassword ? "form-control is-invalid" : "form-control"}
                                            value={formik.values.newpassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                            id="newpassword" placeholder="Enter Your newpassword"
                                        />

                                    </div>
                                    <div className="d-flex justify-content-around">
                                        <button type="submit" className="btn update mt-4 px-5" >Update Password</button>
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

export default ChangePassword