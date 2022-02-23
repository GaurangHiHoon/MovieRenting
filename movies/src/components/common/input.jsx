import React from 'react';
const Input = ({name,label,value,onChange,type}) => {
    
    return (<div className="form-group" style={{"margin":"0em"}}>
    <label htmlFor={name}>{label}</label>
    <input
      value={value}
      id={name}
      onChange={onChange}
      type={type}
      className="form-control"
    />
  </div>  );
}
 
export default Input;