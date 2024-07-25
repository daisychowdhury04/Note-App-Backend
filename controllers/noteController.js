import Note from '../models/Note.js';

// Get all notes for a specific user
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve notes', error });
  }
};

// Get a single note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.user.toString() !== req.userId) return res.status(403).json({ message: 'Not authorized' });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve note', error });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = new Note({
      title,
      content,
      user: req.userId
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create note', error });
  }
};

// Update an existing note
export const updateNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.user.toString() !== req.userId) return res.status(403).json({ message: 'Not authorized' });

    note.title = title;
    note.content = content;
    await note.save();

    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update note', error });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    if (note.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await note.deleteOne(); // Use deleteOne() instead of remove()
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



