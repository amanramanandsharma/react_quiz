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

    public function getLatestQuiz(Request $request){

        $data = DB::table('tbl_quiz')
                        ->select('tbl_quiz.identifier','title', DB::raw('DATE_FORMAT(tbl_quiz.updated_at, "%D %b %Y") as update_date'),'users.name','users.image','tbl_quiz.created_at as created_at')
                        ->join('users', 'tbl_quiz.user_id', 'users.id')
                        ->latest()->first();

        return response()->json(['data' => $data], 200);
    }
 
    public function getQuizList(Request $request){

        $data = DB::table('tbl_quiz')
                        ->select('tbl_quiz.id','tbl_quiz.identifier','title','best_time','best_time_user_id', DB::raw('DATE_FORMAT(tbl_quiz.updated_at, "%D %b %Y") as update_date'),'users.name','users.image')
                        ->join('users', 'tbl_quiz.user_id', 'users.id')
                        ->get();

        foreach ($data as $each_quiz) {
            $is_completed = DB::table('tbl_quiz_summary')->where('id',$each_quiz->id)->where('user_id',Auth::user()->id)->first();
            if($is_completed ){
                $each_quiz->id = $each_quiz->identifier;
                $each_quiz->is_completed = $is_completed->is_completed;
                $each_quiz->time = $is_completed->time;
            }else{
                $each_quiz->id = $each_quiz->identifier;
                $each_quiz->is_completed = false;
                $each_quiz->time = 0;
            }
            
        }
        
        return response()->json(['data' => $data], 200);
    }
 
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

            $total_time += $each_response['time'];
        }

        DB::table('tbl_quiz_summary')->insert([
            'identifier' => $this->generateUniqueIdentifier('tbl_quiz_summary'),
            'quiz_id' => $quiz_id,
            'user_id' => Auth::user()->id,
            'time' => $total_time,
            'is_completed' => $request->completed,
            'created_by' => Auth::user()->id,
            'updated_by' => Auth::user()->id,
            'created_at' => Carbon::now("Asia/Kolkata"),
            'updated_at' => Carbon::now("Asia/Kolkata")
        ]);

        return response()->json(['data' => true], 200);
    }
 
}