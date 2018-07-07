import React, {Fragment} from 'react';

import Parking from './Parking';

const ParkingList = ({parking=[], onChangeName=f=>f, onChangeZoneName=f=>f, onChangePlaceStatus=f=>f})=> {

return (

	<Fragment>
			
			{(parking.length === 0) ?
            <p>No Parking Listed.</p> :
            parking.map(item =>{
			return(
                <Parking key={item.id}
                       {...item}
                       onChangeName={(id, name) => onChangeName(item.id, name)}
					   onChangeZoneName = {onChangeZoneName}
					   onChangePlaceStatus = {onChangePlaceStatus}					
					/>)
		})
        }
		
		
        
    </Fragment>

)	
	

	
	
	
	
	
}
	 





export default ParkingList;
