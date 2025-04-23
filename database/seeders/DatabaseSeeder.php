<?php

namespace Database\Seeders;

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Création des rôles
        $adminRole = Role::create(['name' => 'admin']);
        $userRole = Role::create(['name' => 'user']);

        // 2. Création des permissions
        $permissions = [
            'access dashboard',
            'manage users',
            'edit settings'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // 3. Attribution des permissions
        $adminRole->givePermissionTo($permissions);
        $userRole->givePermissionTo('access dashboard');

        // 4. Création de l'admin
        User::factory()->create([
            'name' => 'Administrateur',
            'email' => 'admin@exemple.com',
            'password' => bcrypt('password')
        ])->assignRole('admin');

        // 5. Création d'un utilisateur de test
        User::factory()->create([
            'name' => 'Utilisateur Test',
            'email' => 'user@exemple.com',
            'password' => bcrypt('password')
        ])->assignRole('user');

        // 6. Création d'utilisateurs aléatoires (optionnel)
        User::factory(8)->create()->each(function ($user) {
            $user->assignRole('user');
        });
    }
}
