import React,{useContext, useEffect, useRef,useState} from 'react';
import noteContext from "../Context/Notes/noteContext";
import Noteitems from './noteItems';
import AddNote from './AddNote';

const Notes = (props) => {
  const ref=useRef();
  const refClose=useRef();
    const {notes,getNotes,editNote}= useContext(noteContext);
    const [note,setNote]=useState({title:"",description:"",tag:"",_id:""});
    const updateNote=(currentNote)=>{
      ref.current.click();
      setNote({title:currentNote.title,description:currentNote.description,tag:currentNote.tag,_id:currentNote._id})
    }
    //handling Submit
    const handlesubmit=()=>{
      editNote(note._id,note.title,note.description,note.tag)
      refClose.current.click();
  }

  //changing the note state
  const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
  }
  
  useEffect(()=>{
    if(localStorage.getItem('auth-token')){
      getNotes()
      // eslint-disable-next-line
}},[])
    
  return (
    <>
    <AddNote/>
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">title</label>
    <input type="text" className="form-control" minLength={3} id="title" value={note.title} name="title" onChange={onChange} required={true}/>
    </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">description</label>
    <input type="text" className="form-control" minLength={5} id="description" value={note.description} name="description" onChange={onChange} required={true}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">tag</label>
    <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange}/>
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.title.length<3||note.description.length<5} className="btn btn-primary" onClick={handlesubmit}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-3">
                <h2>Your Note</h2>
                
                  {notes.length===0 && <div className="container"> NO NOTES TO DISPLAY </div>}
                
                {notes.map((note)=>{
                    return <Noteitems note={note} updateNote={updateNote} key={note._id}/>
                })}
            </div>
            </>
  )
}

export default Notes
