import { useState } from "react";
import axios from 'axios';
export default function Add_CarType() {
  const [inputs, setInputs] = useState({
    name:"",
    revenue:0,
    nationality:"",
    year:"",
    description:"",
  });


   const handleSubmit=()=> {
        axios.post('/first_app/carTypes/',inputs)
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
      <label>Enter carType name:
      <input
        type="text"
        name="name"
        onChange={(event) => setInputs({...inputs, name: event.target.value})}
      />
      </label>
      <label>Enter carType revenue:
        <input
          type="number"
          name="revenue"
           onChange={(event) => setInputs({...inputs, revenue: event.target.value})}
        />
        </label>

        <label>Enter carType's nationality:
      <input
        type="text"
        name="nationality"
         onChange={(event) => setInputs({...inputs, nationality: event.target.value})}
      />
      </label>

      <label>Enter carType's founded year :
      <input
        type="text"
        name="year"
        onChange={(event) => setInputs({...inputs, year: event.target.value})}
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