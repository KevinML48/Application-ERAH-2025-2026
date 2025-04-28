<?php

namespace App\Policies;

use App\Models\Lecture;
use App\Models\User;

class LecturePolicy
{
    /**
     * Qui peut voir la liste ? (optionnel)
     */
    public function viewAny(User $user): bool
    {
        return true; // ou selon ton besoin
    }

    /**
     * Qui peut voir une lecture ?
     */
    public function view(User $user, Lecture $lecture): bool
    {
        return true; // ou selon ton besoin
    }

    /**
     * Qui peut créer une lecture ?
     */
    public function create(User $user): bool
    {
        return $user->can('manage users');
    }

    /**
     * Qui peut modifier une lecture ?
     */
    public function update(User $user, Lecture $lecture): bool
    {
        return $user->can('manage users');
    }

    /**
     * Qui peut supprimer une lecture ?
     */
    public function delete(User $user, Lecture $lecture): bool
    {
        return $user->can('manage users');
    }

    /**
     * Qui peut restaurer une lecture ?
     */
    public function restore(User $user, Lecture $lecture): bool
    {
        return $user->can('manage users');
    }

    /**
     * Qui peut forcer la suppression ?
     */
    public function forceDelete(User $user, Lecture $lecture): bool
    {
        return $user->can('manage users');
    }
}
