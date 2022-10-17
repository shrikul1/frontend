import { Card, Col, Row } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTransactions } from '../redux/userSlice';

function Transactions() {
    const { allTransactions, loading } = useSelector(state => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllTransactions())
    }, []);
    return (
        <div className='xyz'>

            <div className="container mt-5"><br />
                <div className='fs-1 text-center text-light' >
                    <strong >All Transactions</strong>
                </div>

                <div className='row'>
                    {loading && <div class="spinner-border text-primary"></div>}
                    {allTransactions && allTransactions.map(item => <div className='col-sm-6 mt-3'>
                        <div className='card'>
                            <div className="card-header">
                                {"Transaction-Id : " + item._id}
                            </div>
                            <div className="card-body cb">
                                {/* <p>From : {item.from}</p> */}
                                <p>To : {item.from}</p>
                                <p>Amount : {item.amount}</p>
                            </div>

                        </div>
                    </div>
                    ).reverse()}


                </div>
            </div>
        </div>
    )
}

export default Transactions