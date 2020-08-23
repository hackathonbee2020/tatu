<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserConversationTable extends Migration
{

    /**
     * Run the migrations.
     * @table user_conversation
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_conversation', function (Blueprint $table) {
            $table->uuid('user_id')->index();
            $table->uuid('conversation_id')->index();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('conversation_id')
                ->references('id')
                ->on('conversations')
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
        Schema::dropIfExists('user_conversation');
    }
}
