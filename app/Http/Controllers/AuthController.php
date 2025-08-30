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

        $token = $user->createToken('auth_token')->plainTextToken;

        Auth::login($user);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function login()
    {

        $userAttributes = request()->validate([
            'email' => ['required','email'],
            'password' => ['required']
        ]);

        if (!Auth::attempt($userAttributes)) {
            throw ValidationException::withMessages([
                'email' => 'The provided credentials do not match our records.'
            ]);
        };

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        request()->session()->regenerate();

        return response()->json([
            'message' => 'Login success',
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'user'         => $user,
        ], 200);

    }

    public function destroy(Request $request)
    {

        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => "Logout success"], 200);
    }
}
