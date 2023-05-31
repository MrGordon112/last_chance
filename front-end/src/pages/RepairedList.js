import React, {useState, useEffect} from 'react'
import ItemRepaired from '../components/ItemRepaired'


const RepairedList = ()  => {
    
	
	    let[repaired,setRepaireds] = useState([])
	    
	    useEffect(() => {
	        getRepaireds( )
	   
	    }, [])
	    
	    let getRepaireds = async () => {
	       let response = await fetch('/first_app/repaireds/')
	       let data = await response.json()
	       console.log('DATA:',data)
	       setRepaireds(data)
	    }
	    return (
		<div className="notes">
		<h1>Repaireds</h1>
		
		<table>
		<tr>
				<th>id</th>
				<th>id car</th>
				<th>name car</th>
				<th>id mechanic</th>
				<th>name mechanic</th>
				<th>date</th>
				<th>price</th>
			</tr>
		{repaired.map((repaired, index) =>
		(<ItemRepaired   key={index} repaired={repaired}/>))  }
		</table>
		</div>
		)
};

export default RepairedList  