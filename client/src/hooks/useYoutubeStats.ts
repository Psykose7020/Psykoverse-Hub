import { useState, useEffect } from "react";

let cachedSubscribers: number | null = null;

export function useYoutubeStats() {
  const [subscribers, setSubscribers] = useState<number | null>(cachedSubscribers);
  
  useEffect(() => {
    if (cachedSubscribers !== null) {
      setSubscribers(cachedSubscribers);
      return;
    }
    
    fetch("/api/youtube/stats")
      .then(res => res.json())
      .then(data => {
        cachedSubscribers = data.subscribers;
        setSubscribers(data.subscribers);
      })
      .catch(() => {
        cachedSubscribers = 340;
        setSubscribers(340);
      });
  }, []);
  
  return subscribers;
}
