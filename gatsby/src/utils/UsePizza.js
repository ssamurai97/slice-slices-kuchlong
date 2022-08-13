import {useContext, useState} from "react";
import OrderContext from "../components/OrderContext";
import formatMoney from "./formatMoney";
import calculateOrderTotal from "./calculateOrderTotal";
import attachNamesAndPrices from "./attachNameAndPrices";


export default function usePizza({pizzas, values}){
    // create state to hold order
   // const [order, setOrder] = useState([]);
    // get rid of this state because we moved useState up to provider
    const [order, setOrder ] = useContext(OrderContext)

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    // make a function to add things to order
    function addToOrder(orderPizza){
        setOrder([...order, orderPizza]);
    }

    // remove things from order
    function removeFromOrder(index){
         // everyting before the item we want to remove
        setOrder([...order.slice(0, index),
        // everyting after the item we want to remove
            ...order.slice(index + 1),
        ])
    }

    //

    async function submitOrder(e){
         e.preventDefault();
         setLoading(true);
         //setMessage("go eat")
         setError(null)
         // gather all the data
        const body = {
            order: attachNamesAndPrices(order, pizzas),
            total: formatMoney(calculateOrderTotal(order, pizzas)),
            name: values.name,
            email: values.email,
            tallSmile: values.tallSmile,

        };

        const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        const text = JSON.parse(await res.text());

        if(res.status  >= 400 && res.status < 600 ){
            setLoading(false);
            setError(text.message)
        }else {
            setLoading(false)
            setMessage(`Success! Come on down for your order`)
        }
    }


    return {
        order,
        addToOrder,
        removeFromOrder,
        error,
        message,
        loading,
        submitOrder,
    }
}
