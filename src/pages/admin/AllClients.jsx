import { Button, Card, Col, Form, Input, List, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { adminClientUpdate, AdminGetAllClients } from '../../redux/authSlice'

function ClientDetails() {
    const dispatch = useDispatch()
    const { allClients, adminUpdateClient, loading } = useSelector(state => state.auth)
    const [client, setClient] = useState(false)
    const [sort, setSort] = useState("")

    useEffect(() => {
        dispatch(AdminGetAllClients())
    }, [adminUpdateClient])

    const handleUpdate = (data) => {
        dispatch(adminClientUpdate({ ...data, _id: client._id }))
    }
    return (
        <>
            <ToastContainer />
            <div className='client-details'>
                <div className="container">
                    <div className='fs-1 text-center pb-3 text-light' >All Clients</div>
                    {loading && <div class="spinner-border text-primary"></div>}
                    <div className='row'>
                        <div>
                            <input className='form-control'
                                onChange={e => { setSort(e.target.value) }} type="text" placeholder='Enter Name to Search' />
                            <br />
                        </div>
                        <div className='col-sm-6'>
                            <ul className='list-group'>
                                {
                                    allClients.filter(item => item.name.toLowerCase().includes(sort.toLowerCase())).map((item, i) =>
                                        <li
                                            className={`list-group-item ${item.name === client.name && "bg-primary text-light"}`}
                                            onClick={e => { setClient(item) }}
                                            key={i}>{item.name}</li>
                                    )
                                }
                            </ul>
                        </div>
                        <div className='col-sm-6'>
                            {client && <div className='card'>
                                <div className="card-header bg-dark text-light">{"Account-No : " + client.account}</div>
                                <div className="card-body">
                                    <p>Name : {client.name}</p>
                                    <p>Username : {client.username}</p>
                                    <p>Email : {client.email}</p>
                                    <p>Balance : {client.balance}</p>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>








        </>
    )
}

export default ClientDetails