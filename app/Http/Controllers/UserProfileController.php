<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Auth\Authenticatable;
use Carbon\Carbon;
use DB;
use Socialite;
use App\Models\SocialIdentity;

//Import Base Controller
use App\Http\Controllers\Controller;

use App\User;

class UserProfileController extends Controller {

    
    public function getUserInformation(Request $request){

        $data = $this->getQuizInformation(Auth::user()->id);
        return response()->json(['data' => $data], 200);
    }

    public function getQuizInformation($user_id){

    $data = DB::table('users')->select('name','image',DB::raw('DATE_FORMAT(created_at, "%D %b %Y") as joined_on'))->where('id',$user_id)->first();
    $data->rank = $this->getUserRank($user_id);

    $quiz_stats = [];

    //Quiz Completion
        // Total Quizzes
            $total_quizzes = DB::table('tbl_quiz')->count();
        // Total Quizzes completed
            $total_completed = DB::table('tbl_quiz_summary')->where('user_id',$user_id)->where('is_completed',1)->count();

        $collect = collect([]);
        $collect->put('id', 1);
        $collect->put('title', 'Quizzes Completion');
        $collect->put('value', ceil(($total_completed/$total_quizzes)*100).'%');
        array_push($quiz_stats,$collect);

    //Total Correct Answer - total correct answer/total questions attempted
        // Get total Number of correct answers
            $correct_answers = DB::table('tbl_quiz_responses')->where('created_by',$user_id)->where('is_completed',1)->count();
        // Get total Number of correct answers
            $attempted_questions = DB::table('tbl_quiz_responses')->where('created_by',$user_id)->count();

            $collect = collect([]);
            $collect->put('id', 2);
            $collect->put('title', 'Correct Answers');

            if($attempted_questions){
                $collect->put('value', ceil(($correct_answers/$attempted_questions)*100).'%');
            }else{
                $collect->put('value', '0%');
            }

            array_push($quiz_stats,$collect);

    //Average Quiz Time
        $avg_quiz_time = DB::table('tbl_quiz_summary')->where('user_id',$user_id)->where('is_completed',1)->avg('time');
        $avg_quiz_time = $avg_quiz_time. 's';

    //Average Answer Time
        // Get total Number of correct answers
        $avg_answer_time = DB::table('tbl_quiz_responses')->where('created_by',$user_id)->where('is_completed',1)->avg('time');

        $collect = collect([]);
        $collect->put('id', 3);
        $collect->put('title', 'Average Answer Time');
        $collect->put('value', ceil($avg_answer_time). 's');
        array_push($quiz_stats,$collect);

        $data->quiz_stats = $quiz_stats;

        return $data;
    }



}