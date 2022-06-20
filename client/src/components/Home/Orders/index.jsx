import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { orderName } from "../../../redux/actions";

function Orders () {
    const dispatch = useDispatch();
    let page = useSelector((state) => state.page)

    const handleSelectOrderName = (e) => {
        console.log('Order name changed');
        page = 1;
        dispatch(orderName(e.target.value));
    }



    return (
        <div>
            <div>
                <span>Order By Name</span>
                <select name="orderName" id="" onChange={(e) => handleSelectOrderName(e)}>
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>
            </div>
            <div>
                <span>Order By Population</span>
            </div>
        </div>
    )
}

export default Orders;