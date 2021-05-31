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

class QuizController extends Controller{
 
    public function getQuizQuestions(Request $request){

        $quiz_id = DB::table('tbl_quiz')->where('identifier',$request->quiz_id)->value('id');
        $data = DB::table('tbl_quiz_questions')->select('identifier','answer','image','is_completed','time','title')->where('quiz_id',$quiz_id)->get();

        foreach ($data as $each_question) {
            $each_question->is_completed = $each_question->is_completed === 0 ? false : true;
        } 

        return response()->json(['data' => $data], 200);
    }
  
    public function submitScore(Request $request){

        $quiz_id = DB::table('tbl_quiz')->where('identifier',$request->quiz_id)->value('id');

        $total_time = 0;

        $completed = true;

        foreach ($request->data as $each_response) {
            $question_id = DB::table('tbl_quiz_questions')->where('identifier',$each_response['identifier'])->value('id');

            DB::table('tbl_quiz_responses')->insert([
                'identifier' => $this->generateUniqueIdentifier('tbl_quiz_responses'),
                'quiz_question_id' => $question_id,
                'time' => $each_response['time'],
                'is_completed' => $each_response['is_completed'],
                'created_by' => Auth::user()->id,
                'updated_by' => Auth::user()->id,
                'created_at' => Carbon::now("Asia/Kolkata"),
                'updated_at' => Carbon::now("Asia/Kolkata")
            ]);

            if($each_response['is_completed'] == false){
                    $completed = false;
            }

            $total_time += $each_response['time'];
        }

        DB::table('tbl_quiz_summary')->insert([
            'identifier' => $this->generateUniqueIdentifier('tbl_quiz_summary'),
            'quiz_id' => $quiz_id,
            'user_id' => Auth::user()->id,
            'time' => $total_time,
            'is_completed' => $completed,
            'created_by' => Auth::user()->id,
            'updated_by' => Auth::user()->id,
            'created_at' => Carbon::now("Asia/Kolkata"),
            'updated_at' => Carbon::now("Asia/Kolkata")
        ]);

        //Check if its a high Score
        $quiz_time = DB::table('tbl_quiz')->where('id',$quiz_id)->value('best_time');
            if($quiz_time > $total_time &&  $completed){
                    DB::table('tbl_quiz')
                        ->where('id', $quiz_id)
                        ->update(['best_time' => $total_time , 'best_time_user_id' => Auth::user()->id]);
            }

        // Update User's Total Score
            $this->updateUserRank(Auth::user()->id);

        return response()->json(['data' => true], 200);
    }
  
    public function getHighScoreForQuiz(Request $request){

        // $users_completed_all_quiz = [];

        // $quiz_scores = DB::table('tbl_quiz')->where('deleted_at',null)->count();

        // foreach ($quiz_scores as $each_top_score) {
        //     $user_count = DB::table('tbl_quiz_summary')->groupBy('user_id')->count();
        //     if($user_count === $quiz_scores){
        //         array_push($users_completed_all_quiz, );
        //     }
        // }


        return response()->json(['data' => 'true'], 200);
    }
 
}