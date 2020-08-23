<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConversationsTable extends Migration
{

    /**
     * Run the migrations.
     * @table conversations
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conversations', function (Blueprint $table) {
            $table->uuid('id')->index();
            $table->string('user_id');
            $table->uuid('conversation_id')->nullable();
            $table->uuid('user_department_id')->nullable();
            $table->uuid('agent_id')->nullable();
            $table->uuid('channel_id')->index()->nullable();
            $table->uuid('department_id')->index()->nullable();
            $table->uuid('cliente_id')->index();
            $table->string('user_name');
            $table->string('user_cpf');
            $table->string('user_telefone')->nullable();
            $table->string('user_foto')->nullable();
            $table->string('user_email')->nullable();
            $table->string('status', 2)->default('01');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('channel_id')
                ->references('id')
                ->on('channels')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('department_id')
                ->references('id')
                ->on('departments')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('cliente_id')
                ->references('id')
                ->on('clientes')
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
        Schema::dropIfExists('conversations');
    }
}
