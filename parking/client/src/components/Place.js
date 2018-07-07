import React from 'react';


const Place = ({id, free, zoneId, onChangePlaceStatus=f=>f}) => {
const red = free? 'card place text-white  bg-success':'card place text-white bg-danger';
   return (
    	
         <div key={id} className={red} onClick={()=>onChangePlaceStatus(id, zoneId)}>
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-fw fa-shopping-cart"></i>
              </div>
              <div className="mr-5">{free ? "free" : "nope"}</div>
            </div>
      	</div>
   
    );
}

export default Place;
