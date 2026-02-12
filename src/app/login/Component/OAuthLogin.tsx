import axios from "axios";
import { GoogleLoginResponse } from "../../api/auth/google/login/route";
import { Button } from "../../Components/Button";
import Image from "next/image";

export function OAuthLogin(){
  return(<GoogleLoginButton/>)
}

function GoogleLoginButton(){
  async function handleGoogleLogin(){
    const {data}=await axios<GoogleLoginResponse>("/api/auth/google/login");
    if(data.success){
      console.log(data.responseData.url);
      
      window.location.href=data.responseData.url;
      return;
    }
  }
  return(
    <Button onClick={handleGoogleLogin} className="border rounded-lg flex items-center gap-2" aria-label="Login with google">
      <Image src={"/icons/google.svg"} alt="" width={20} height={20} className="w-5 h-5"/>
      Continue with Google
    </Button>
  )
}