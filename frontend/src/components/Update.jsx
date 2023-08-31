
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

export const Update = () => {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);



  const {id}=useParams();
  const navigate=useNavigate();
 
  const getUser=async ()=>{

   
    console.log(id)

    const response =await fetch(`http://localhost:5000/${id}`);

    const result = await response.json();

  if(!response.ok){
    console.log("result.error");
    //setError(result.error);
  }
  if(response.ok){

   console.log("update user", result)
   setName(result.name);
   setEmail(result.email);
   setAge(result.age);
   

  }


  }


  const manageUpdate = async(e)=>{

//e.prventDefault();
const updated={name,email,age}
const response = await fetch(`http://localhost:5000/${id}` , {
method:"PATCH",
body : JSON.stringify(updated),

headers: {
  "Content-Type" : "application/json",

},

});
const  result= await response.json();
if(!response.ok){
  console.log(result.error);
  //setError(result.error);
}

if(response.ok){
  navigate("/all");
 
 
}



}


  useEffect(()=>{
    getUser();
  },[]);



  return (
    <div className='container my-2'>
      

        <h2 className='text-center'>Edit The Data</h2>


        <form onSubmit={manageUpdate}>
        <div className="mb-3">
    <label  className="form-label">Name</label>
    <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)   }/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Email address</label>
    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)   } />
   
  </div>
  <div className="mb-3">
    <label  className="form-label">Age</label>
    <input type="number" className="form-control" value={age} onChange={(e)=>setAge(e.target.value)   }/>
  </div>
 

  <button type="submit" className="btn btn-primary">Submit</button>
</form>






    </div>
  )
}
