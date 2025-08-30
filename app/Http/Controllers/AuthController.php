<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'confirmed', Password::min(6)]
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        Auth::login($user);

        return response()->json(['message' => 'User registered successfully','user' => $user], 200);
    }

    public function login()
    {

        $userAttributes = request()->validate([
            'email' => ['required'],
            'password' => ['required', 'confirmed']
        ]);

        if (!Auth::attempt($userAttributes)) {
            throw ValidationException::withMessages(['email' => 'Credentials do not match']);
        }
        ;

        request()->session()->regenerate();

        return response()->json(['message' => "Login success"], 200);

    }

    public function destroy()
    {

        Auth::logout();
        return response()->json(['message' => "Logout success"], 200);
    }
}
