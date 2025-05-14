<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OfferController extends Controller
{
    public function index()
    {
        return Inertia::render('Offers/Index', [
            'offers' => Offer::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Offers/Create');
    }

    public function store(Request $request)
    {
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
        return Inertia::render('Offers/Edit', [
            'offer' => $offer
        ]);
    }

    public function update(Request $request, Offer $offer)
    {
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
        $offer->delete();
        return redirect()->route('offers.index');
    }
}
