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

class HomeController extends Controller {

    
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
                        ->join('users', 'tbl_quiz.best_time_user_id', 'users.id')
                        ->get();

        foreach ($data as $each_quiz) {
            $is_completed = DB::table('tbl_quiz_summary')->where('quiz_id',$each_quiz->id)->where('user_id',Auth::user()->id)->first();
            if($is_completed){
                $each_quiz->id = $each_quiz->identifier;
                $each_quiz->is_completed = $is_completed->is_completed;
                $each_quiz->time = $is_completed->time;
                $each_quiz->best_time_user_id = null;
            }else{
                $each_quiz->id = $each_quiz->identifier;
                $each_quiz->is_completed = false;
                $each_quiz->time = 0;
                $each_quiz->best_time_user_id = null;
            }
            
        }
        
        return response()->json(['data' => $data], 200);
    }

    public function getTopScorers(Request $request){

        $user_score = DB::select('
        SELECT identifier, image ,name, score, FIND_IN_SET( score, (    
        SELECT GROUP_CONCAT( score
        ORDER BY score DESC ) 
        FROM users )
        ) AS rank
        FROM users LIMIT 10');
        
        return response()->json(['data' => $user_score], 200);
    }


}