<?php

namespace App\Http\Controllers;
use App\Models\Note;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getUsers(){

        return User::all();
    }

    public function getNotes(){

        return Note::with('user')->get();
    }
}
