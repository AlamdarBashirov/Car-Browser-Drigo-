import { useEffect, useState } from "react";

const STORAGE_KEY = "favoriteCars";

const useFavorites = () => {

    const [favorites, setFavorites] = useState(() => {

        const saved = localStorage.getItem(STORAGE_KEY);

        return saved ? JSON.parse(saved) : [];

    });

    useEffect(() => {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(favorites)
        );

    }, [favorites]);

    const toggleFavorite = (id) => {

        setFavorites((prev) =>

            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]

        );

    };

    const isFavorite = (id) => {

        return favorites.includes(id);

    };

    return {

        favorites,

        toggleFavorite,

        isFavorite,

    };

};

export default useFavorites;