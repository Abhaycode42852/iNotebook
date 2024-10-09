import React,{useContext, useState} from 'react';
import noteContext from "../Context/Notes/noteContext";

const AddNote = () => {
    const {addNote}= useContext(noteContext)
    const [note,setNote]=useState({title:"",description:"",tag:""})

    //handling Submit
    const handlesubmit=(e)=>{
        e.preventDefault();
        addNote(note);
        setNote({title:"",description:"",tag:""})
    }

    //changing the note state
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }


  return (
    <div>
      <div className='container my-3'>
            <h2>Add a Note</h2>
            <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">title</label>
    <input type="text" className="form-control" minLength={3} id="title"  name="title" onChange={onChange} required={true} />
    </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">description</label>
    <input type="text" className="form-control" minLength={5} id="description" name="description" onChange={onChange} required={true}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">tag</label>
    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
  </div>
  
  <button type="submit" disabled={note.title.length<3||note.description.length<5} className="btn btn-primary" onClick={handlesubmit}>Add Note</button>
</form>
    </div>
    </div>
  )
}

export default AddNote
