import React from 'react';
import Img from "gatsby-image";
import useForm from "../utils/useForm";
import SEO from '../components/SEO';
import { graphql } from 'gatsby';
import calculatePrices from "../utils/calculatePizzaPrice";
import formatMoney from "../utils/formatMoney";
import OrderStyles from '../styles/OrderStyles'
import MenuItemStyles from "../styles/MenuItemStyles";
import usePizza from "../utils/UsePizza";
import PizzaOrder from "../components/PizzaOrder";
import calculatePizzaPrices from "../utils/calculatePizzaPrice";
import calculateOrderTotal from "../utils/calculateOrderTotal";


export default function OrderPage({ data}) {

    const pizzas = data.pizzas.nodes
    const { values, updateValue} = useForm({
        name: '',
        email: '',
        tallSmile: '',
    })

    const { order, addToOrder,
        removeFromOrder
        , error,
        loading,
        message,
        submitOrder} = usePizza({
        pizzas,
        values: values
    })

    if(message){
        return <p> {message} </p>
    }
  return (
    <>
        <SEO title={`Order a Pizza`} />
         <OrderStyles onSubmit={submitOrder} >
             <fieldset disabled={loading}>
                 <legend>Your info</legend>
                 <label htmlFor="name"> Name</label>
                 <input type="text"
                        name="name"
                        value={values.name}
                 onChange={updateValue}/>
                 <label htmlFor="email"> Email</label>
                 <input type="email" name="email"
                        value={values.email}
                        onChange={updateValue}/>
                 <input className="tallSmile" type="tallSmile" name="tallSmile"
                        value={values.tallSmile}
                        onChange={updateValue}/>
             </fieldset>
             <fieldset disabled={loading} className="menu">
                 <legend>Menu</legend>
                 {pizzas.map((pizza) => (
                     <MenuItemStyles key={pizza.id}>
                         <Img  width="50"
                               height="50"
                               fluid={pizza.image.asset.fluid}
                         alt={pizza.name} />
                         <div>
                         <h2>{pizza.name}</h2>
                         </div>
                         <div>
                             {['S', 'M', 'L'].map((size) => (
                                 <button key={size} type="button" onClick={() => addToOrder({id: pizza.id, size: size})}>
                                     {size}
                                     {formatMoney(calculatePizzaPrices(pizza.price, size))}</button>
                             ))}
                         </div>
                     </MenuItemStyles>
                 ))}
             </fieldset>
             <fieldset disabled={loading} className="order">
                 <legend>Order</legend>
                 <PizzaOrder order={order}  removeFromOrder={removeFromOrder} pizzas={pizzas}/>
             </fieldset>
             <fieldset disabled={loading} >
                 <h3> your total is {formatMoney(calculateOrderTotal(order, pizzas))}</h3>
                 <div>
                     {error ? <p> Error: {error} </p> : '' }
                 </div>
                 <button type="submit" disabled={loading} >
                     { loading ? 'Place Order...' : 'Order Ahead'}
                 </button>
             </fieldset>
         </OrderStyles>
    </>
  );
}


export const query = graphql`
  query {
    pizzas: allSanityPizza{
    nodes{
       name
       id
       slug {current }
       price
       image{
         asset{
           fluid(maxWidth: 100){
            ...GatsbySanityImageFluid
           }
         }
       }
     }  
    }
  }
`
