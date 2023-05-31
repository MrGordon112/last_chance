import React, {useState, useEffect} from 'react'
import ItemCar from '../components/ItemCar'


const CarList = ()  => {
    
	
	    let[cars,setCars] = useState([])
	    
	    useEffect(() => {
	        getCars( )
	   
	    }, [])
	    
	    let getCars = async () => {
	       let response = await fetch('/first_app/cars/')
	       let data = await response.json()
	       console.log('DATA:',data)
	       setCars(data)
	    }
	    return (
		<div className="notes">
		<h1>cars</h1>
		<table>
			<tr>
				<th>id</th>
				<th>name</th>
				<th>price</th>
				<th>year</th>
				<th>carType</th>
			
			</tr>
				{cars.map((car, index) =>
				(<ItemCar   key={index} car={car}/>))  }
		</table>
		</div>
		)
};
export default CarList  