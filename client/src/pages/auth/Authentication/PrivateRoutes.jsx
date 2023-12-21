import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext';


const PrivateRoutes = ({ role }) => {
    const { auth } = useAuth();

    // console.log(auth.token, "auth token")

      // Check if authentication exists and user has the required role
  const isAuthorized = auth.token && auth.role === role;

  let destination;

  if(auth.role === "admin"){
    destination = "/auth/admin/login"
    }else{
        destination = "/auth/agent/login"
    }

    console.log(isAuthorized, "isAuthorized")


  
    return(

        isAuthorized ? <Outlet/> : <Navigate to={destination}/>
    )
}

export default PrivateRoutes