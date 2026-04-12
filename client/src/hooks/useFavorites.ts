import { useState, useEffect, useCallback, useRef } from "react";

const STORAGE_KEY = "psykoverse_favoris";

function checkLocalStorageAvailable(): boolean {
  try {
    const test = "__psyko_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const storageRef = useRef(true);

  useEffect(() => {
    const available = checkLocalStorageAvailable();
    storageRef.current = available;
    setStorageAvailable(available);

    if (available) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const toggleFavorite = useCallback((link: string) => {
    setFavorites(prev => {
      const newFavs = prev.includes(link)
        ? prev.filter(f => f !== link)
        : [...prev, link];

      if (storageRef.current) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs));
        } catch {
          // ignore write errors
        }
      }

      return newFavs;
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    if (storageRef.current) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  }, []);

  const isFavorite = useCallback(
    (link: string) => favorites.includes(link),
    [favorites]
  );

  return { favorites, toggleFavorite, clearFavorites, isFavorite, storageAvailable };
}
