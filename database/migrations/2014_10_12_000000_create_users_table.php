<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('identifier');
            $table->string('name');
            $table->string('email')->unique();
            $table->float('score')->default(0);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('image')->nullable();
            $table->bigInteger('contact')->nullable();
            $table->string('type')->nullable();
            $table->rememberToken();
            $table->bigInteger('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
