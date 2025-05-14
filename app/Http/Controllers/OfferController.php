<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class OfferController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            'auth',
            // Seules ces méthodes sont réservées aux admins :
            new Middleware('role:admin', only: ['create', 'store', 'edit', 'update', 'destroy']),
        ];
    }

    public function index()
    {
        // Accessible à tous les utilisateurs connectés
        return Inertia::render('Offers/Index', [
            'offers' => Offer::latest()->get(),
            'isAdmin' => auth()->user()?->hasRole('admin'), // Pour le front
        ]);
    }

    public function create()
    {
        // Accessible uniquement aux admins
        return Inertia::render('Offers/Create');
    }

    public function store(Request $request)
    {
        // Accessible uniquement aux admins
        $validated = $request->validate([
            'titre' => 'required|max:255',
            'description' => 'required',
            'poste' => 'required|max:255',
        ]);
        Offer::create($validated);
        return redirect()->route('offers.index');
    }

    public function edit(Offer $offer)
    {
        // Accessible uniquement aux admins
        return Inertia::render('Offers/Edit', [
            'offer' => $offer
        ]);
    }

    public function update(Request $request, Offer $offer)
    {
        // Accessible uniquement aux admins
        $validated = $request->validate([
            'titre' => 'required|max:255',
            'description' => 'required',
            'poste' => 'required|max:255',
        ]);
        $offer->update($validated);
        return redirect()->route('offers.index');
    }

    public function destroy(Offer $offer)
    {
        // Accessible uniquement aux admins
        $offer->delete();
        return redirect()->route('offers.index');
    }
}
