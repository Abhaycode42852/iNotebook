import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const host = "http://localhost:5000";

  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  //Get All Notes
  const getNotes = async () => {
    const authToken = localStorage.getItem("auth-token");
    //API call
    const url = `${host}/api/notes/fetchAllNotes`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      // console.error(error.message);
      showAlert(error.message, "danger");
    }
  };

  //Add a new Note
  const addNote = async ({ title, description, tag }) => {
    const authToken = localStorage.getItem("auth-token");
    //API call
    try {
      const url = `${host}/api/notes/addNote`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      setNotes(notes.concat(json.note));
      showAlert(json.Success, "success");
    } catch (error) {
      console.error(error);
      showAlert(error.message, "danger");
    }
  };

  //Delete a note
  const deleteNote = async (id) => {
    const authToken = localStorage.getItem("auth-token");
    //API call
    const url = `${host}/api/notes/deleteNote/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      showAlert(json.Success, "success");
    } catch (error) {
      console.error(error.message);
      showAlert(error.message, "danger");
    }

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    const authToken = localStorage.getItem("auth-token");
    //TODO API call
    const url = `${host}/api/notes/updateNote/${id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      showAlert(json.Success, "success");
    } catch (error) {
      console.error(error.message);
      showAlert(error.message, "danger");
    }

    let newNotes = JSON.parse(JSON.stringify(notes));
    //logic to edit
    for (let i = 0; i < newNotes.length; i++) {
      var element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        addNote,
        showAlert,
        alert,
        deleteNote,
        getNotes,
        editNote,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
