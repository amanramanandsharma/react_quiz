<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblQuizQuestionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_quiz_questions', function (Blueprint $table) {
            $table->id();
            $table->string('identifier');
            $table->integer('quiz_id');
            $table->string('title')->nullable();
            $table->string('answer');
            $table->text('image');
            $table->integer('time')->default(0);
            $table->integer('is_completed')->default(0);
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
        Schema::dropIfExists('tbl_quiz_questions');
    }
}
