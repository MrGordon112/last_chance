import { useState } from "react";
import axios from 'axios';
export default function Add_Car() {
  const [inputs, setInputs] = useState({
    name:"",
    description:"",
    price:0,
    year:"",
    carType:0,
  });


   const handleSubmit=()=> {
        axios.post('/first_app/cars/',inputs)
        .then((response)=>{
            if(!response.ok){
                throw new Error('not added')
            }
        }
        ).catch((e)=>{console.log(e)});
    }




  return (
    <form onSubmit={handleSubmit}
    >
      <label>Enter car name:
      <input
        type="text"
        name="name"
        onChange={(event) => setInputs({...inputs, name: event.target.value})}
      />
        </label>
        <label>Enter year of fabrication:
      <input
        type="number"
        name="year"
         onChange={(event) => setInputs({...inputs, year: event.target.value})}
      />
      </label>
      <label>Enter car's price:
      <input
        type="number"
        name="price"
        onChange={(event) => setInputs({...inputs, price: event.target.value})}
      />

      </label>
      <label>Enter carType id:
        <input
          type="number"
          name="carType"
           onChange={(event) => setInputs({...inputs, carType: event.target.value})}
        />

        </label>
         <div>

         <label>Details:

         <textarea type="text" id="subject"
         name="detail" placeholder="Write something.."
          onChange={(event) => setInputs({...inputs, description: event.target.value})}
          />
        </label>
        </div>
        <input type="submit" />
    </form>
  )
}


/*
Click F12 and navigate to the "Console view"
to see the result when you submit the form.
*/