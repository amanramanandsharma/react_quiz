<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblQuizTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_quiz', function (Blueprint $table) {
            $table->id();
            $table->string('identifier');
            $table->string('title');
            $table->integer('user_id');
            $table->integer('best_time')->default(9999);
            $table->integer('best_time_user_id')->default(1);
            $table->integer('views')->default(0);
            $table->bigInteger('created_by');
            $table->bigInteger('updated_by');
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
        Schema::dropIfExists('tbl_quiz');
    }
}
