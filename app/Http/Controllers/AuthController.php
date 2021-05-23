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

class AuthController extends Controller{
 
    public function socialLogin(Request $request)
    {

        try {
            $user = Socialite::driver($request->provider)->userFromToken($request->accessToken);
        } catch (Exception $e) {
            return response()->json(['data' => "Oauth Unsuccessfull"], 401);
        }
 
        $authUser = $this->findOrCreateUser($user, $request->provider,$request->accessToken);

        Auth::login($authUser, true);

        $user = Auth::user();
        $success['name'] =  $user->name;
        $success['email'] = $user->email;
        $success['id'] =  $user->id;
        $success['image'] =  $user->image;

        //Roles
        if($user->type == "SYSTEM_ADMIN"){
            $token_roles = ["ADMIN","EXPERT"];
        }else{
            $token_roles = [$user->type];
        }
            $success['roles'] =  $user->type;

        //Assigning the Highest Role to the User Token Scope
            $success['token'] =  $user->createToken('Code4Prod', $token_roles)->accessToken;

        return response()->json(['data' => $success], 200);
    }
 
 
    public function findOrCreateUser($providerUser, $provider,$accessToken)
    {
        $account = SocialIdentity::whereProviderName($provider)
                   ->whereProviderId($providerUser->getId())
                   ->first();
 
        if ($account) {
            return $account->user;
        } else {
            $user = User::whereEmail($providerUser->getEmail())->first();
            
            if (! $user) {
                $user = User::create([
                    'identifier' => $this->generateUniqueIdentifier('users'),
                    'email' => $providerUser->getEmail(),
                    'name'  => $providerUser->getName(),
                    'image' => $providerUser->getAvatar(),
                    'contact' => '0000000000000',
                    'type' => 'USER' 
                ]);
            }
 
            $user->identities()->create([
                'provider_id'   => $providerUser->getId(),
                'provider_name' => $provider,
                'access_code' => $accessToken,
            ]);
 
            return $user;
        }
    }

}