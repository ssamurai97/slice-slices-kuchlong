import React from "react";
import {graphql, Link, useStaticQuery} from "gatsby";
import styled from 'styled-components';

const ToppingStyles = styled.div`
display: flex;
flex-wrap: wrap;
gap: 1rem;
margin-bottom: 4rem;
a {
display: grid;
grid-template-columns: auto 1fr;
grid-gap: 0 1rem;
align-items: center;
padding: 5px;
background: var(--grey);
border-radius: 2px;
.count{
background: white;
padding: 2px 5px;
}
&[aria-current="page"]{
background: var(--yellow);
}
}
`;
const countPizzaIntoToppings = (pizzas) =>{

    const counts = pizzas.map((pizza) => pizza.toppings)
        .flat()
        .reduce((acc, topping) =>{
        const existToppings= acc[topping.id];
        if(existToppings){
            existToppings.count += 1;
        }else {
            acc[topping.id] = {
                id: topping.id,
                name: topping.name,
                count: 1,
            };
        }
            return acc
    },{})
    //sort them base on their count
    return Object.values(counts).sort((a, b) => b.count - a.count);
}
export default function ToppingsFilter ({activeTopping}){
    const {toppings, pizzas } = useStaticQuery(graphql`
        query {
           toppings: allSanityTopping{
                nodes{
                    name
                    id
                    vegetarian
                }
            }

            pizzas: allSanityPizza{
                nodes{
                    toppings{
                        name
                        id
                    }
                }
            }
        }
    `)

    const toppingWithCounts = countPizzaIntoToppings(pizzas.nodes);
    return(
        <ToppingStyles>
            <Link to="/pizzas">
                <span className="name">all</span>
                <span className="count">{pizzas.nodes.length}</span>
            </Link>
            <p>{activeTopping}</p>
            {toppingWithCounts.map((topping) => (
                <Link to={`/topping/${topping.name}`} key={topping.id}>
                    <span className="name">{topping.name}</span>
                    <span className="count">{topping.count}</span>
                </Link>
            ))}
        </ToppingStyles>
    )
}