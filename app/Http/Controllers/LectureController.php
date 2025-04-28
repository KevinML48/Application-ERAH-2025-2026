<?php

namespace App\Http\Controllers;

use App\Models\Lecture;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class LectureController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            'auth',
            new Middleware('can:update,lecture', only: ['edit', 'update']),
            new Middleware('can:delete,lecture', only: ['destroy']),
        ];
    }

    public function index()
    {
        // Charge la relation user pour chaque lecture
        $lectures = Lecture::with('user')->orderBy('created_at', 'desc')->get();
        return Inertia::render('Lectures/Index', [
            'lectures' => $lectures,
        ]);
    }

    public function show(Lecture $lecture)
    {
        $lecture->load('user');
        return Inertia::render('Lectures/Show', [
            'lecture' => $lecture,
        ]);
    }

    public function create()
    {
        return Inertia::render('Lectures/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|max:255',
            'media_url' => 'nullable|url',
            'description' => 'required',
            'published_at' => 'nullable|date',
            'image' => 'nullable|image|max:2048',
        ]);
        $data['user_id'] = auth()->id();
    
        // Si une image est uploadée, on la stocke et on met le chemin dans media_url
        if ($request->hasFile('image')) {
            $data['media_url'] = $request->file('image')->store('lectures', 'public');
        }
    
        Lecture::create($data);
    
        return redirect()->route('lectures.index');
    }

    public function edit(Lecture $lecture)
    {
        $lecture->load('user');
        return Inertia::render('Lectures/Edit', [
            'lecture' => $lecture,
            'user' => auth()->user(),
        ]);
    }

    public function update(Request $request, Lecture $lecture)
    {
        $data = $request->validate([
            'title' => 'required|max:255',
            'media_url' => 'nullable|url',
            'description' => 'required',
            'published_at' => 'nullable|date',
            'image' => 'nullable|image|max:2048',
        ]);
    
        if ($request->hasFile('image')) {
            if ($lecture->media_url && !str_starts_with($lecture->media_url, 'http')) {
                \Storage::disk('public')->delete($lecture->media_url);
            }
            $data['media_url'] = $request->file('image')->store('lectures', 'public');
        } elseif (empty($data['media_url'])) {
            $data['media_url'] = $lecture->media_url;
        }
    
        $lecture->update($data);
    
        return redirect()->route('lectures.index');
    }        

    public function destroy(Lecture $lecture)
    {
        // Supprime l'image si elle existe
        if ($lecture->image_path) {
            \Storage::disk('public')->delete($lecture->image_path);
        }
        $lecture->delete();
        return redirect()->route('lectures.index');
    }
}
