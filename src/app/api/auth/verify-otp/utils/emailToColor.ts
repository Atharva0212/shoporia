export function emailToColor({ email }:{email:string}) {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
        hash = email.charCodeAt(i) + ((hash << 5) - hash); 
        hash = hash & hash; // ensure 32-bit integer
    }
    const hex = (hash & 0x00FFFFFF).toString(16).toUpperCase().padStart(6, "0");

    return `#${hex}`;
}
