import React,{useEffect,useState} from "react";

export default function Test_Backend(){
    const [backendData,setBackData] = useState([{}])
    //Because of Proxy setting we can just write the endpoints.
    useEffect(()=>{
        console.log("WEL")
        fetch("/api").then(
            response => response.json()
        ).then(
            data =>{
               setBackData(data) 
            }
        )
    },[])
        
    


return (
    
    <div >
        {(typeof backendData.users === 'undefined')? (
         <p>Loading...</p>   
        ): (
            backendData.users.map((user,i) => (
                <p key = {i}>{(user)}</p>
            ))
        )}


    </div> )

}