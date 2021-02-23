import React from 'react'
import {TextField,
         
} from '@material-ui/core'

const Input = (props) => {




    const{name,label,onChange,value,InputProps,type,id}=props
    
    return (
        <TextField 
        autoComplete="off"
        name={name}
        label={label}
       onChange={onChange}
        value={value}
        InputProps={InputProps}
        type={type}
        id={id}
        required
        />
    )
}

export default Input
