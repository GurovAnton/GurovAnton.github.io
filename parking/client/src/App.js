import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ParkingList from './components/ParkingList';

class App extends Component {
  constructor(props){
	  super(props);
	  this.state={data:[]};
	  this.changeParkName = this.changeParkName.bind(this);
	  this.changeZoneName = this.changeZoneName.bind(this);
	  this.changePlaceStatus = this.changePlaceStatus.bind(this);
	  this.sendState=this.sendState.bind(this);
  }
	
	
  changeParkName(id, name){
	 if(name){
		 this.setState(prevState => ({
		data: prevState.data.map(parking=>{
		
			return(
			 (parking.id !== id) ?
                    parking :
                    {
                        ...parking,
                        name
                    }
		)
		})  
	  }))
	 }
	  
  }
	changeZoneName(id, zone_name){
		 if(zone_name){
		const newItems = { ...this.state};
		let zoneNumber, parkingNumber;
		
		 newItems.data.map((item, indexP)=>
				item.zones.map((zone, indexZ)=>{
			 	if (zone.id === id){ 
					parkingNumber = indexP
					zoneNumber = indexZ
				}
				
			 
			 
		 }));
			
		newItems.data[parkingNumber].zones[zoneNumber].zone_name=zone_name;
		this.setState({data: newItems.data});
		console.log(parkingNumber, zoneNumber, newItems );}
	}
	changePlaceStatus(id, zoneId){
		const newItems = { ...this.state};
		let zoneNumber, parkingNumber, placeNumber;
		
			
		 newItems.data.map((item, indexP)=>
				item.zones.map((zone, indexZ)=>{
			 	if (zone.id === zoneId){ 
					zoneNumber=indexZ;
					parkingNumber=indexP;
					zone.places.map((place, indexPlace)=>{
						if(place.id===id){
							placeNumber=indexPlace;
						}

					})
				}
			
			 
			 
		 }));
		newItems.data[parkingNumber].zones[zoneNumber].places[placeNumber].free = !newItems.data[parkingNumber].zones[zoneNumber].places[placeNumber].free
		this.setState({data: newItems.data})
		
		
	}
	
	
 componentWillMount() {
  
  fetch('/data')
  .then(res=> res.json())
  .then((data) => {this.setState({data});
    
				   
});
	 
 }
sendState(){
let  sendData = JSON.stringify(this.state.data);

 fetch('/data', {  
    method: 'post',
	  headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: sendData
  }).then(function(res){ console.log(res) })
.catch(function(res){ console.log(res) })
		 

}

  render(){
    const {changeParkName} = this
	const {changeZoneName} = this
	const {changePlaceStatus} = this
	const {sendState} = this
	const {data} = this.state
    return (
		
		<div className="app">
			<Header/>
			<button className="btn btn-warning"onClick={()=>{sendState()}}>Сохранить изменения</button>
			<Route path='/' render = {(props) => <ParkingList {...props} parking = {data}
				 	  onChangeName = {changeParkName}
				 	  onChangeZoneName = {changeZoneName}
				 	  onChangePlaceStatus = {changePlaceStatus}
				 />   } />
			
			
			
		</div>
         
      );
  }
}

export default App;
