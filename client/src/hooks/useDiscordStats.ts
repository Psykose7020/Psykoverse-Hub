import { useState, useEffect } from "react";

let cachedMembers: number | null = null;

export function useDiscordStats() {
  const [members, setMembers] = useState<number | null>(cachedMembers);
  
  useEffect(() => {
    if (cachedMembers !== null) {
      setMembers(cachedMembers);
      return;
    }
    
    fetch("/api/discord/stats")
      .then(res => res.json())
      .then(data => {
        cachedMembers = data.members;
        setMembers(data.members);
      })
      .catch(() => {
        cachedMembers = 180;
        setMembers(180);
      });
  }, []);
  
  return members;
}
