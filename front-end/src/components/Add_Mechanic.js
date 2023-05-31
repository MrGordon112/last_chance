import { useState } from "react";

export default function Add_Mechanic() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    
    const name = event.target.name;
    const value = event.target.value;
     setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  }

  return (
    <form onSubmit={handleSubmit,(e) => {
        let response={name: "Viorel Burta",
        experience: "Very experienced",
        price: "high cost",
        age: 44333,
        description: "He has 20 years of experience"}
        
        fetch('/first_app/mechanics/',{method:"Post", body:JSON.stringify(response)})
        .then((response)=>{
            if(!response.ok){
                throw new Error('not deleted')
            }
        }
        ).catch((e)=>{console.log(e)});
    }}
    >
      <label>Enter mechanics name:
      <input 
        type="text" 
        name="name" 
        value={inputs.name || ""} 
        onChange={handleChange}
      />
        </label>
        <label>Enter mechanic's experience:
      <input 
        type="text" 
        name="experience" 
        value={inputs.experience || ""} 
        onChange={handleChange}
      />   
      </label>
      <label>Enter mechanic's price:
      <input 
        type="text" 
        name="price" 
        value={inputs.price || ""} 
        onChange={handleChange}
      />
       
      </label>
      <label>Enter mechanics age:
        <input 
          type="number" 
          name="age" 
          value={inputs.age || ""} 
          onChange={handleChange}
        />
        
        </label>
         <div>
        
         <label>Details:
        
         <textarea type="text" id="subject" 
         name="detail" placeholder="Write something.."
         value={inputs.detail || ""} 
          onChange={handleChange}></textarea>
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