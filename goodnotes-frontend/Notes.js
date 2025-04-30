import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notes({ username, onLogout }) {
const [notes, setNotes] = useState([]);
const [newNote, setNewNote] = useState({ title: '', content: '' });
const [searchQuery, setSearchQuery] = useState('');

// Fetch notes when component mounts
useEffect(() => {
axios.get(`http://localhost:5281/api/notes/${username}`)
.then(response => {
setNotes(response.data);
})
.catch(error => console.error('Error fetching notes:', error));
}, [username]);

// Handle adding a new note
const handleAddNote = (e) => {
e.preventDefault();
if (newNote.title && newNote.content) {
axios.post('http://localhost:5281/api/notes', {
...newNote,
username
})
.then(response => {
setNotes([...notes, response.data]);
setNewNote({ title: '', content: '' });
})
.catch(error => console.error('Error adding note:', error));
}
};

// Handle deleting a note
const handleDeleteNote = (id) => {
axios.delete(`http://localhost:5281/api/notes/${id}`)
.then(() => {
setNotes(notes.filter(note => note.id !== id));
})
.catch(error => console.error('Error deleting note:', error));
};

// Filter notes based on search query
const filteredNotes = notes.filter(note =>
note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
note.content.toLowerCase().includes(searchQuery.toLowerCase())
);

return (
<div className="notes">
<h2>Welcome, {username}</h2>
<button onClick={onLogout}>Logout</button>

<h3>Your Notes</h3>

{/* Search bar */}
<input
type="text"
placeholder="Search notes..."
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
style={{ marginBottom: '10px', padding: '5px', fontSize: '16px' }}
/>

<form onSubmit={handleAddNote}>
<input
type="text"
placeholder="Note Title"
value={newNote.title}
onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
required
/>
<textarea
placeholder="Note Content"
value={newNote.content}
onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
required
/>
<button type="submit">Add Note</button>
</form>

<ul>
{filteredNotes.length > 0 ? (
filteredNotes.map((note) => (
<li key={note.id}>
<h4>{note.title}</h4>
<p>{note.content}</p>
<button onClick={() => handleDeleteNote(note.id)}>Delete</button>
</li>
))
) : (
<p>No notes found</p>
)}
</ul>
</div>
);
}

export default Notes;
