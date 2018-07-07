import React, {Fragment} from 'react';
import {Route, Link} from 'react-router-dom';
import ChangeName from './ChangeName';
import ZoneList from './ZoneList';


const Parking = ({id, name='', zones =[], onChangeName=f=>f, onChangeZoneName=f=>f,onChangePlaceStatus=f=>f })=> {
const pathToLink = '/zones/'+id;

	return (
	<Fragment>
		<div className="row">
		<div className="card">
  			
  			<div className="card-body">
    		<h5 className="card-header">{name}</h5>
    		<p className="card-text">Пожалуйста сделайте выбор зоны парковки</p>
			<div className="btn-group" role="group">
			<Link to= "/" className="btn btn-secondary" >&#8656;</Link>
			<Link to={pathToLink} className="btn btn-primary" >ЗОНЫ</Link>
				
			</div>
			</div>
			<ChangeName 
					chid={id}
                    onChangeName={onChangeName}

					/>
	    </div>
			<Route path={pathToLink} render={(props)=><ZoneList
					{...props}
					pid={id}
					zones={zones}
					onChangeZoneName = {onChangeZoneName}
					onChangePlaceStatus = {onChangePlaceStatus}
					/>}/>
		</div>
		
			
	
	</Fragment>	
       
	
	
	)
	


}

	
	
export default Parking;