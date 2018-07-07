import React, {Fragment} from 'react';
import { Route, Link } from 'react-router-dom';
import ChangeName from './ChangeName';
import PlaceList from './PlaceList';

const Zone = ({id , zone_name='', places=[] , onChangeZoneName=f=>f, onChangePlaceStatus=f=>f})=> {
	
	const pathToLink = "/zones/"+id[0]+"/places/"+id;
	const pathBack =  "/zones/"+id[0];
	
	return (
      
		<Fragment>
             
          		<div className="card col-lg">
           		 <div className="card-body">
            	
             	 	<div className="card-header">Зона {zone_name}</div>
					<p className="card-text">Пожалуйста сделайте выбор места</p>
          		 	
					<div className="btn-group" role="group">
					<Link to= {pathBack} className="btn btn-secondary" >&#8656;</Link>
					<Link to={pathToLink} className="btn btn-primary">МЕСТА</Link>
					</div>
					 </div>
						<ChangeName 
					chid={id}
                    onChangeName={onChangeZoneName}

					/>
				 </div>   		
        		
			
			
			<Route path={pathToLink} render={(props)=>
			<PlaceList
				{...props}
				places={places}
				onChangePlaceStatus = {onChangePlaceStatus}
				/>}/>
			
			
    	</Fragment>
			
	
	
	)
	


}

	


export default Zone;
