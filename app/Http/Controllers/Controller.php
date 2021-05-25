<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use DB;

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
}
