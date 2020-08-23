<?php

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->delete();

        // TODO: Este usuário está dando problema com o passport.
        $user = User::create([
            'name'     => 'Tok',
            'email'    => 'contato@tok.com',
            'password' => '123456'
        ]);

        \Bouncer::assign('master')->to($user);
    }
}
