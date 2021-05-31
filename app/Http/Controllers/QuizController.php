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
        $data = DB::table('tbl_quiz_questions')->select('identifier','answer','image','is_completed','time','title')->where('quiz_id',$quiz_id)->inRandomOrder()->get();

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
  
    public function getQuizAnsweredDetails(Request $request){

        $quiz_id = DB::table('tbl_quiz')->where('identifier',$request->quiz_id)->value('id');
        $questions_ids = DB::table('tbl_quiz_questions')->select('id','title','image','answer')->where('quiz_id',$quiz_id)->get();

        foreach ($questions_ids as $each_question) {
            $each_response = DB::table('tbl_quiz_responses')->where('quiz_question_id',$each_question->id)->where('created_by',Auth::user()->id)->first();
            $each_question->time = $each_response->time;
            $each_question->is_completed = $each_response->is_completed;
        }

        $quiz_name = DB::table('tbl_quiz')->where('identifier',$request->quiz_id)->value('title');
        $stats = DB::table('tbl_quiz_summary')->where('quiz_id',$quiz_id)->where('user_id',Auth::user()->id)->select('time',DB::raw('DATE_FORMAT(created_at, "%D %b %Y") as completed_at'))->first();
        $stats->name = $quiz_name;

        return response()->json(['data' => $questions_ids,'stats' => $stats], 200);
    }
 
}