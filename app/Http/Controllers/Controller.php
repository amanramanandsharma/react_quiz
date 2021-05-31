<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use DB;
use App\User;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function generateUniqueIdentifier($table) {

        switch ($table) {

            case 'users':
                $prefix = 'GZ-USR'; /*Sygence Hospital Number*/
                break;

            case 'tbl_quiz':
                $prefix = 'GZ-TBQZ'; /*Sygence Hospital Number*/
                break;


            case 'tbl_quiz_questions':
                $prefix = 'GZ-TBQQ'; /*Sygence Hospital Number*/
                break;

            case 'tbl_quiz_responses':
                $prefix = 'GZ-TBQR'; /*Sygence Hospital Number*/
                break;

            case 'tbl_quiz_summary':
                $prefix = 'GZ-TBQS'; /*Sygence Hospital Number*/
                break;

            default:
                # code...
                break;
        }

        $id = DB::table($table)->max('id') + 1;
        $string = $prefix.date('ymdHis').$id;

        return strtoupper(str_replace(' ', '', $string));
    }

    public function getUserRank($user_id) {

        $user_score = DB::select('
            SELECT id, name, score, FIND_IN_SET( score, (    
            SELECT GROUP_CONCAT( score
            ORDER BY score DESC ) 
            FROM users )
            ) AS rank
            FROM users
            WHERE id =  ? ', [$user_id]);

        return $user_score[0]->rank;
    }

    public function updateUserRank($user_id) {
        
        // Get total Number of correct answers
            $correct_questions = DB::table('tbl_quiz_responses')->where('created_by',$user_id)->where('is_completed',1)->count();

        // Get total time for the correct answers
            $total_time_taken = DB::table('tbl_quiz_responses')->where('created_by',$user_id)->where('is_completed',1)->sum('time');

        // Total Quizzes
            $total_quizzes = DB::table('tbl_quiz')->count();

        // Total Quizzes completed
            $total_completed = DB::table('tbl_quiz_summary')->where('user_id',$user_id)->where('is_completed',1)->count();

        // Additional points for total completed quizzes
            $quiz_bonus = ($total_completed/$total_quizzes)*10;

        //Calculate Score
            $score = (($correct_questions/$total_time_taken)*10) + $quiz_bonus;

        // Update score
            DB::table('users')->where('id', $user_id)->update(['score' => $score]);

        return true;
        
    }
}
