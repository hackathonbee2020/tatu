<?php

use Illuminate\Database\Seeder;

class AbilitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            [
                'name'	=>	'master',
                'title' =>	'Master'
            ],
            [
                'name'	=>	'admin',
                'title' =>	'Admin'
            ],
            [
                'name'	=>	'manager',
                'title' =>	'Manager'
            ],
            [
                'name'	=>	'agente',
                'title' =>	'Agente'
            ],
        ];

        foreach ($roles as $role) {
            \Bouncer::role()->firstOrCreate([
                'name'  => $role['name'],
                'title' => $role['title'],
            ]);
        }
    }
}
