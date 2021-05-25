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

class DataGeneratorController extends Controller{
 
    public function populateQuizAndQuestions(Request $request){

        DB::table('tbl_quiz')->truncate();
        DB::table('tbl_quiz_questions')->truncate();

        $quiz_id = DB::table('tbl_quiz')->insertGetId([
                'identifier' => $this->generateUniqueIdentifier('tbl_quiz'),
                'title' => 'Quiz 1',
                'user_id' => 1,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => Carbon::now("Asia/Kolkata"),
                'updated_at' => Carbon::now("Asia/Kolkata")
        ]);

        DB::table('tbl_quiz_questions')->insert([
            'identifier' => $this->generateUniqueIdentifier('tbl_quiz_questions'),
            'quiz_id' => $quiz_id,
            'title' => 'Q1',
            'answer' => 'Hera Pheri',
            'image' => 'https://www.filmcompanion.in/wp-content/uploads/2020/03/film-comapnion-hera-pheri-inline-image-1.jpg',
            'time' => 0,
            'is_completed' => 0,
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => Carbon::now("Asia/Kolkata"),
            'updated_at' => Carbon::now("Asia/Kolkata")
        ]);

        DB::table('tbl_quiz_questions')->insert([
            'identifier' => $this->generateUniqueIdentifier('tbl_quiz_questions'),
            'quiz_id' => $quiz_id,
            'title' => 'Q2',
            'answer' => 'Judwa 2',
            'image' => 'https://cdn.bollywoodmdb.com/movies/largethumb/2020/coolie-no-1/coolie-no-1-37.jpg',
            'time' => 0,
            'is_completed' => 0,
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => Carbon::now("Asia/Kolkata"),
            'updated_at' => Carbon::now("Asia/Kolkata")
        ]);
        
        DB::table('tbl_quiz_questions')->insert([
            'identifier' => $this->generateUniqueIdentifier('tbl_quiz_questions'),
            'quiz_id' => $quiz_id,
            'title' => 'Q3',
            'answer' => 'Sooryavanshi',
            'image' => 'https://cdn.bollywoodmdb.com/movies/largethumb/2020/sooryavanshi/sooryavanshi-7.jpg',
            'time' => 0,
            'is_completed' => 0,
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => Carbon::now("Asia/Kolkata"),
            'updated_at' => Carbon::now("Asia/Kolkata")
        ]);


        $quiz_id_2 = DB::table('tbl_quiz')->insertGetId([
            'identifier' => $this->generateUniqueIdentifier('tbl_quiz'),
            'title' => 'Quiz 2',
            'user_id' => 1,
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => Carbon::now("Asia/Kolkata"),
            'updated_at' => Carbon::now("Asia/Kolkata")
        ]);

        DB::table('tbl_quiz_questions')->insert([
            'identifier' => $this->generateUniqueIdentifier('tbl_quiz_questions'),
            'quiz_id' => $quiz_id_2,
            'title' => 'Q1',
            'answer' => 'PPagglait',
            'image' => 'https://cdn.bollywoodmdb.com/movies/largethumb/2020/pagglait/pagglait-20.jpg',
            'time' => 0,
            'is_completed' => 0,
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => Carbon::now("Asia/Kolkata"),
            'updated_at' => Carbon::now("Asia/Kolkata")
        ]);

        DB::table('tbl_quiz_questions')->insert([
            'identifier' => $this->generateUniqueIdentifier('tbl_quiz_questions'),
            'quiz_id' => $quiz_id_2,
            'title' => 'Q2',
            'answer' => 'Torbaaz',
            'image' => 'https://cdn.bollywoodmdb.com/movies/largethumb/2018/torbaaz/torbaaz-1.jpg',
            'time' => 0,
            'is_completed' => 0,
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => Carbon::now("Asia/Kolkata"),
            'updated_at' => Carbon::now("Asia/Kolkata")
        ]);
        
        DB::table('tbl_quiz_questions')->insert([
            'identifier' => $this->generateUniqueIdentifier('tbl_quiz_questions'),
            'quiz_id' => $quiz_id_2,
            'title' => 'Q3',
            'answer' => 'Gulabo Sitabo',
            'image' => 'https://cdn.bollywoodmdb.com/movies/largethumb/2019/gulabo-sitabo/gulabo-sitabo-8.jpg',
            'time' => 0,
            'is_completed' => 0,
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => Carbon::now("Asia/Kolkata"),
            'updated_at' => Carbon::now("Asia/Kolkata")
        ]);

        DB::table('tbl_quiz_questions')->insert([
            'identifier' => $this->generateUniqueIdentifier('tbl_quiz_questions'),
            'quiz_id' => $quiz_id_2,
            'title' => 'Q4',
            'answer' => 'Sardar Ka Grandson',
            'image' => 'https://cdn.bollywoodmdb.com/movies/largethumb/2021/sardar-ka-grandson/sardar-ka-grandson-3.jpg',
            'time' => 0,
            'is_completed' => 0,
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => Carbon::now("Asia/Kolkata"),
            'updated_at' => Carbon::now("Asia/Kolkata")
        ]);
        
        return response()->json(['data' => 'success'], 200);
    }
 
}