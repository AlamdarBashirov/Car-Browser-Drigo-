const sortCars = (cars, sort) => {

    const sorted = [...cars];

    switch (sort) {

        case "low-high":
            return sorted.sort(
                (a, b) => a.pricePerDay - b.pricePerDay
            );

        case "high-low":
            return sorted.sort(
                (a, b) => b.pricePerDay - a.pricePerDay
            );

        default:
            return sorted;
    }

};

export default sortCars;