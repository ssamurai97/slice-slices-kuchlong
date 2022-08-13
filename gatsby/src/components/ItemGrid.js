import React from "react";
import { ItemsGrid } from '../styles/Grid';
import {ItemStyles} from "../styles/Grid";
export default function ItemGrid({ items }) {
  return (
      <ItemsGrid>
          {items.map((item) => (
              <ItemStyles key={item._id}>
                  <p>
                      <span className="mark">{item.name}</span>
                  </p>
                  <img src={`${item.image.asset.url}?w=500&h=400&fit=crop`} alt={item.name}
                   style={{ background: `url(${item.image.asset.metadata.lqip})`, backgroundSize: 'cover'}}/>

              </ItemStyles>
          ))}
      </ItemsGrid>
  )
}
