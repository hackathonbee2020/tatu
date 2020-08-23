<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserDepartmentTable extends Migration
{

    /**
     * Run the migrations.
     * @table user_department
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_department', function (Blueprint $table) {
            $table->uuid('user_id')->index();
            $table->uuid('department_id')->index();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('department_id')
                ->references('id')
                ->on('departments')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_department');
    }
}
