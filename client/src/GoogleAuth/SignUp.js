import React, {useEffect} from "react";
import useFetch from "../hooks/useFetch"

function SignUp() {
    const {handleGoogleAuth, loading, error} = useFetch(
        "/signup"
      ); 

    useEffect(() => {
        if (window.Google) {
            
        }
    })
}

export default SignUp
