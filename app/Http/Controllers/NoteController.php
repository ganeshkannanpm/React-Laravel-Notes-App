<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    /**
     * Display a listing of all notes.
     */
    public function index()
    {
        $notes = Note::all();
        return response()->json(['data' => $notes], 200);
    }

    /**
     * Store a newly created note in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $note = Note::create($validated);

        return response()->json([
            'message' => 'Note added successfully',
            'data'    => $note
        ], 201);
    }

    /**
     * Display the specified note.
     */
    public function show(Note $note)
    {
        return response()->json(['data' => $note], 200);
    }

    /**
     * Update the specified note in storage.
     */
    public function update(Request $request, Note $note)
    {
        $validated = $request->validate([
            'title'   => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
        ]);

        $note->update($validated);

        return response()->json([
            'message' => 'Note updated successfully',
            'data'    => $note
        ], 200);
    }

    /**
     * Remove the specified note from storage.
     */
    public function destroy(Note $note)
    {
        $note->delete();

        return response()->json([
            'message' => 'Note deleted successfully'
        ], 200);
    }
}
