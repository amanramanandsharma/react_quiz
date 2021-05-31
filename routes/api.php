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

    
    // ======================== H O M E =================================================================
        Route::get('home/getLatestQuiz', 'HomeController@getLatestQuiz');
        Route::get('home/getQuizList', 'HomeController@getQuizList');
        Route::get('home/getTopScorers', 'HomeController@getTopScorers');

    // ======================== Q U I Z =================================================================
        Route::post('quiz/getQuizQuestions', 'QuizController@getQuizQuestions');
        Route::post('quiz/submitScore', 'QuizController@submitScore');
        Route::get('quiz/getHighScoreForQuiz', 'QuizController@getHighScoreForQuiz');
        Route::post('quiz/getQuizAnsweredDetails', 'QuizController@getQuizAnsweredDetails');
        
    // ======================== U S E R -  P R O F I L E =================================================================
        Route::get('user-profile/getUserInformation', 'UserProfileController@getUserInformation');
        
        
});
