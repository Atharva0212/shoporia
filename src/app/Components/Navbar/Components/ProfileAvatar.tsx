import { useCompleteProfileModal } from "@/src/hooks/useCompleteProfileModal";

export function ProfileAvatar({
  initial,
  avatarBg,
}: {
  initial: string;
  avatarBg: string;
}){
  const {openCompleteProfileModal}=useCompleteProfileModal()
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