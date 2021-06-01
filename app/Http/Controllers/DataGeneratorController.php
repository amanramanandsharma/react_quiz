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
        DB::table('tbl_quiz_summary')->truncate();
        DB::table('tbl_quiz_responses')->truncate();

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

        DB::table('tbl_quiz_questions')->insert([
            'identifier' => $this->generateUniqueIdentifier('tbl_quiz_questions'),
            'quiz_id' => $quiz_id,
            'title' => 'Q4',
            'answer' => 'Indoo Ki Jawani',
            'image' => 'https://cdn.bollywoodmdb.com/movies/largethumb/2020/indoo-ki-jawani/indoo-ki-jawani-4.jpg',
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
            'title' => 'Q5',
            'answer' => 'Shakuntala Devi',
            'image' => 'https://cdn.bollywoodmdb.com/movies/largethumb/2020/shakuntala-devi/shakuntala-devi-18.jpg',
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
            'title' => 'Q6',
            'answer' => 'Angrezi Medium',
            'image' => 'https://cdn.bollywoodmdb.com/movies/largethumb/2019/hindi-medium-2/angrezi-medium-8.jpg',
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
            'title' => 'Q7',
            'answer' => 'Thappad',
            'image' => 'https://cdn.bollywoodmdb.com/movies/largethumb/2020/thappad/thappad-12.jpg',
            'time' => 0,
            'is_completed' => 0,
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => Carbon::now("Asia/Kolkata"),
            'updated_at' => Carbon::now("Asia/Kolkata")
        ]);

        //  ----------------------------------- Second Quiz -------------------------------------


        $quiz_id_2 = DB::table('tbl_quiz')->insertGetId([
            'identifier' => $this->generateUniqueIdentifier('tbl_quiz'),
            'title' => 'Quiz 2',
            'user_id' => 2,
            'created_by' => 2,
            'updated_by' => 2,
            'created_at' => Carbon::now("Asia/Kolkata"),
            'updated_at' => Carbon::now("Asia/Kolkata")
        ]);

        DB::table('tbl_quiz_questions')->insert([
            'identifier' => $this->generateUniqueIdentifier('tbl_quiz_questions'),
            'quiz_id' => $quiz_id_2,
            'title' => 'Q1',
            'answer' => 'Pagglait',
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


        DB::table('tbl_quiz_questions')->insert([
            'identifier' => $this->generateUniqueIdentifier('tbl_quiz_questions'),
            'quiz_id' => $quiz_id_2,
            'title' => 'Q5',
            'answer' => 'Saina',
            'image' => 'https://cdn.bollywoodmdb.com/movies/largethumb/2018/saina/saina-18.jpg',
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
            'title' => 'Q6',
            'answer' => 'The Big Bull',
            'image' => 'https://cdn.bollywoodmdb.com/movies/largethumb/2020/the-big-bull-an-unreal-story/the-big-bull-11.jpg',
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
            'title' => 'Q7',
            'answer' => 'Roohi',
            'image' => 'https://cdn.bollywoodmdb.com/movies/largethumb/2020/rooh-afza/roohi-10.jpg',
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
            'title' => 'Q8',
            'answer' => 'Dolly Kitty Aur Woh Chamakte Sitare',
            'image' => 'https://cdn.bollywoodmdb.com/movies/largethumb/2019/dolly-kitty-aur-woh-chamakte-sitare/dolly-kitty-aur-woh-chamakte-sitare-4.jpg',
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