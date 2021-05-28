<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('socialLogin', 'AuthController@socialLogin');

Route::get('data-generator/populateQuizAndQuestions', 'DataGeneratorController@populateQuizAndQuestions');

Route::group(['middleware' => ['auth:api']], function(){

    // ======================== Q U I Z =================================================================
        Route::get('quiz/getLatestQuiz', 'QuizController@getLatestQuiz');
        Route::get('quiz/getQuizList', 'QuizController@getQuizList');
        Route::post('quiz/getQuizQuestions', 'QuizController@getQuizQuestions');
        Route::post('quiz/submitScore', 'QuizController@submitScore');
        Route::get('quiz/getHighScoreForQuiz', 'QuizController@getHighScoreForQuiz');
        
});
