import React,{useContext} from "react";
import  noteContext  from "../Context/Notes/noteContext";
const Noteitems = (props) => {
  const {deleteNote}=useContext(noteContext);
  const {note,updateNote} = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
          <p className="card-text">
            {note.description}
          </p>
          <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
          <i className="fa-regular fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitems;
