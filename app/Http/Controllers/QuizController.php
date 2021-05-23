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

        return response()->json(['data' => $data], 200);
    }
 
}