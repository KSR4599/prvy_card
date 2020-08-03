import React,{useCallback,useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios';

export default function ProtectedRoute(props)
{
    const [isAuthenticated,setAuthentication] = useState('');

    const Component = this.props.component;
     
    const checkAuth= useCallback(async () => {
        let url = "http://localhost:8013/get_user/"
  
        axios({
          method: "GET",
          withCredentials: true,
          url: url,
        }).then((res) => {
          if(res.status == 200){
  
           window.alert("success");
            setAuthentication(true);
          } else {
            console.log("Error in Logging out the user!");
          }
    
        })
  
      })

   
      useEffect(() =>{
        checkAuth();
      });
   
      

       

        
    }
