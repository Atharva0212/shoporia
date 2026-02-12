import { useCompleteProfileModal } from "@/src/hooks/useCompleteProfileModal";
import Image from "next/image";

export function ProfileAvatar({
  initial,
  avatarBg,
}: {
  initial: string|undefined;
  avatarBg: string|undefined;
}){
  const {openCompleteProfileModal}=useCompleteProfileModal()
  if(!initial||!avatarBg){    
    return(
    <button 
    onClick={openCompleteProfileModal}
    aria-label="Update your profile"
      className="w-12 h-12 rounded-full flex items-center justify-center bg-inverse"
    >
      <Image
       src={"/icons/user.svg"}
        alt=""
        width={20}
        height={20}
        className="w-5 h-5"
        />
    </button>  
    )
  }
  return(
    <button 
    onClick={openCompleteProfileModal}
    aria-label="Update your profile"
      className="w-12 h-12 rounded-full flex items-center justify-center"
      style={{ backgroundColor: `${avatarBg}66` }}
    >
      {initial.toUpperCase()}
    </button>
  )
}