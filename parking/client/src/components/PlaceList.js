import React from 'react';

import Place from './Place';

const PlaceList = ({...props, places=[],onChangePlaceStatus=f=>f })=> {
	const pathArray = props.location.pathname.split('/');
const zoneId = pathArray[pathArray.length - 1];
	console.log(zoneId);
	
return (
	
		<div>

        {(places.length === 0) ?
            <p>No Places Listed.</p> :
            places.map(item =>{
			return(
                <Place key={item.id}
                       {...item}
						zoneId={zoneId}
						onChangePlaceStatus={(id=0, zoneId) => onChangePlaceStatus(id, zoneId)}
					/>)
		})
        }
    	</div>
		
)		
}
	 

export default PlaceList;
