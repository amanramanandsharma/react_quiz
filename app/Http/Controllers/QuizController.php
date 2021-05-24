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

    public function getQuizList(Request $request){

        $data = DB::table('tbl_quiz')
                        ->select('tbl_quiz.identifier','title','best_time','best_time_user_id', DB::raw('DATE_FORMAT(tbl_quiz.updated_at, "%D %b %Y") as update_date'),'users.name','users.image')
                        ->join('users', 'tbl_quiz.user_id', 'users.id')
                        ->get();

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
        } 

        return response()->json(['data' => true], 200);
    }
 
}