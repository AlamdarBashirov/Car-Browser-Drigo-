const filterCars = (cars, filters) => {
    return cars.filter((car) => {

        const nameMatch =
            car.name
                .toLowerCase()
                .includes(filters.search.toLowerCase());

        const transmissionMatch =
            filters.transmission === "All" ||
            car.transmission === filters.transmission;

        const typeMatch =
            filters.types.length === 0 ||
            filters.types.includes(car.type);

        const availableMatch =
            !filters.availableOnly ||
            car.available;

        const minPriceMatch =
            !filters.priceMin ||
            car.pricePerDay >= Number(filters.priceMin);

        const maxPriceMatch =
            !filters.priceMax ||
            car.pricePerDay <= Number(filters.priceMax);
        
        const favoriteMatch =
            !filters.favoritesOnly ||
            filters.favorites.includes(car.id);

        return (
            nameMatch &&
            transmissionMatch &&
            typeMatch &&
            availableMatch &&
            minPriceMatch &&
            maxPriceMatch&&
            favoriteMatch
        );
    });
};

export default filterCars;