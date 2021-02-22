import React from 'react';
import Loader from "react-loader-spinner";

const Spinner = (props) => {
    return (
        <div style={{position:'absolute', top:'20%',left:'45%'}}> <Loader {...props}/></div>
       
    )
}

export default Spinner
