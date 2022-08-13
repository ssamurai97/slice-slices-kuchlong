import React from "react";
import {graphql} from "gatsby";
import Img from 'gatsby-image'
import styled from "styled-components"
import { Helmet} from "react-helmet";
import SEO from "../components/SEO";

const PizzaGrid = styled.div`
 display: grid;
 grid-gap: 2rem;
 grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
 
 li{
  display: flex;
 }

`;
export default function SinglePizzaPage({data : { pizza }}){
    return(
        <>
            <SEO title={pizza.name} image={pizza?.image?.asset?.fluid?.src}/>
        <PizzaGrid>
            <Helmet>
                <title>{pizza.name}</title>
            </Helmet>
            <Img fluid={pizza.image.asset.fluid} alt=""/>
            <div>
                <h2 className="mark">
                    {pizza.name}
                </h2>
                <ul>
                    {pizza.toppings.map((pizza) => (
                        <li key={pizza.id}>{pizza.name}</li>
                    ))}
                </ul>
            </div>
        </PizzaGrid>
        </>
    );
}

// this needs to by dynamic based on the slug passed in via context

export const query = graphql`
 query ($slug: String!){
     pizza : sanityPizza(slug: {current: {eq :$slug}}){
         name
         id
         image{
             asset{
                 fluid(maxWidth: 800){
                     ...GatsbySanityImageFluid
                 }
             }
         }
         toppings{
             name
             id
             vegetarian
         }
     }
 }
`;


