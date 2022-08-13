import React from "react";
import {ItemsGrid, ItemStyles} from "../styles/Grid";

export default function LoadingGrid({count}){
    return(
        <ItemsGrid>
            {Array.from({length: count},(_, i) => (
                <ItemStyles key={`loading-${i}`}>
                <p>
                    <span className="mark">loading...</span>
                </p>
                <img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
                     className="loading"
                     alt="loading"
                     width="500"
                     height="400"
                />

                </ItemStyles>
            ))}
        </ItemsGrid>
    )
}
