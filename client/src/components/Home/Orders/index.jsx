import React from "react";
import { useDispatch } from "react-redux"; 
import { orderName, setPage, orderPopulation } from "../../../redux/actions";

function Orders () {
    const dispatch = useDispatch();

    const handleSelectOrderName = (e) => {
        console.log('Order name changed');
        dispatch(setPage(1))
        dispatch(orderName(e.target.value));
    }

    const handleSelectOrderPop = (e) => {
        console.log('Order Pop changed')
        dispatch(orderPopulation(e.target.value))
        dispatch(setPage(1));
    }

    return (
        <div className="orders-container">
            <div>
                <span>Order By Name</span>
                <select name="orderName" id="" onChange={(e) => handleSelectOrderName(e)}>
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>
            </div>
            <div>
                <span>Order By Population</span>
                <select name="orderPop"  id="" onChange={(e) => handleSelectOrderPop(e)}>
                    <option value="mintomax">Min to Max Pop</option>
                    <option value="maxtomin">Max to Min Pop</option>
                </select>
            </div>
        </div>
    )
}

export default Orders;