import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const Read = () => {

const [data,setData] = useState();

async function getData(){


  const response = await fetch("http://localhost:5000");

  const result=await response.json();
  if(!response.ok){
    console.log(result.error);
    //setError(result.error);
  }
  if(response.ok){

    setData(result);

  }
}

const handleDelete = async (id)=>{
  const temp=id;
  const ur="http://localhost:5000/"


  const newString = ur.concat(temp)


  const response = await fetch(newString , {  
    method :"DELETE"
  });
  const result = await response.json();

  if(!response.ok){
    console.log("result.error");
    //setError(result.error);
  }
  if(response.ok){

    //setError("removed");

    getData();

  }




}




useEffect(()=>{
  getData();
},[]);
console.log(data);



  return (
    <div className="container my-2">
      <h2 className="text-center"> All Employees</h2>
      <div className='row'>

      {data&&data.map((ele)=>(

<div key={ele._id} className='col-3'>

<div className="card" >
<div className="card-body">
<h5 className="card-title">{ele.name}</h5>
<h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
<p className="card-text">{ele.age}</p>
<a href="#" className="card-link" onClick={()=>{handleDelete(ele._id)}}>Delete</a>
<Link to={`/${ele._id}`} className="card-link">Edit</Link>
</div>
</div>





   
</div>



      ))}


      </div>



    </div>
  )
}
