import React, { useEffect, useState, useNavigation } from 'react';
import { useHistory } from "react-router-dom";

const RegisterButton = () => {

const navigation = useHistory()

return(
    <button className='btn btn-warning' onClick={() => (navigation.push('/register'))}>Regístrate</button>

)
}

export default RegisterButton