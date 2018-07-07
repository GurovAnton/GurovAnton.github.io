import React, {Fragment} from 'react';

import Zone from './Zone';

const ZoneList = ({...props, zones=[], onChangeZoneName=f=>f, onChangePlaceStatus=f=>f })=> {
	


return (
	
	<Fragment>
        {(zones.length === 0) ?
            <p>No Zones Listed.</p> :
            zones.map(item =>{
			return(
                <Zone key={item.id}
                    {...item}
                    onChangeZoneName={(id, name) => onChangeZoneName(item.id, name)}
					onChangePlaceStatus = {onChangePlaceStatus}			
					/>)
		})
        }
    </Fragment>

)	
	

	
	
	
	
	
	
}
	 

export default ZoneList;
