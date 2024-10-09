import React,{useContext} from 'react';
import noteContext from '../Context/Notes/noteContext';
export default function Alert() {
  const {alert}=useContext(noteContext)
    const capitalize=(word)=>{
        let lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
    }
  return (<>
    {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalize(alert.type)}</strong>: {alert.msg}
         {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
    </div>}
    </>
  
  )
}
