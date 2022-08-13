import React from 'react';
import useLatestData from "../utils/useLatestData";
import LoadingGrid from "../components/LoadingGrid";
import ItemGrid from "../components/ItemGrid";

function CurrentlySlicing({ slicemasters }){
    return(
        <div>
            <h2 className="center">
                <span className="mark tilt"> Slicemaster On</span>
            </h2>
            <p> Standing by, ready to slice up!</p>
            { !slicemasters && <LoadingGrid count={4} /> }
            {slicemasters && !slicemasters?.length && (
                <p> no is working right now.</p>
                )}
            {slicemasters?.length && <ItemGrid items={slicemasters}/>}
        </div>
    )
}

function HotSlices({hotSlices}){
    return(
        <div>
            <h2 className="center">
                <span className="mark tilt"> HotSlices</span>
            </h2>
            <p>Come on by, buy the slice </p>
            { !hotSlices && <LoadingGrid count={4} /> }
            {hotSlices && !hotSlices?.length && (
                <p> no slices available.</p>
            )}
            { hotSlices?.length && <ItemGrid items={hotSlices} />}
        </div>
    )
}

export default function HomePage() {

    const {slicemasters, hotSlices} =  useLatestData()
  return (
    <div className="center">
      <h1>The best Pizza in DownTown!</h1>
       <p>Open 11am to 11pm daily</p>
      <div>
          <CurrentlySlicing slicemasters={slicemasters}/>
          <HotSlices hotSlices={hotSlices} />
      </div>
    </div>
  );
}
