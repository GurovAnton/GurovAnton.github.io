import React from 'react';


const ChangeName = ({chid, onChangeName=f=>f }) => {
	let Input;
	
	
	return (
		<div className="input-group mb-3">
  			<input type="text" ref={(input)=>{Input=input}} className="form-control" placeholder="Новое название" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
  			<div className="input-group-append">
    			<button className="btn btn-outline-secondary" onClick = {()=>{onChangeName(chid, Input.value); Input.value=""}} type="button">Изменить</button>
  			</div>
		</div>
	)
	
	
	
	
	
	
}

export default ChangeName