import HomeCarCard from '../../../../components/cards/home_car_card/HomeCarCard'
import cars from "../../../../data/cars.json";
import HomeCarsFilter from '../../../../components/filters/home_cars_filter/HomeCarsFilter'
import styles from './CarsSection.module.scss'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";


const CarsSection = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState(
        searchParams.get("search") || ""
    );
    
    const [debouncedSearch, setDebouncedSearch] = useState(
        searchParams.get("search") || ""
    );
    
    const [transmission, setTransmission] = useState(
        searchParams.get("transmission") || "All"
    );
    
    const [type, setType] = useState(
        searchParams.get("type") || "All"
    );
    
    const [availableOnly, setAvailableOnly] = useState(
        searchParams.get("available") === "true"
    );
    
    const [sort, setSort] = useState(
        searchParams.get("sort") || "default"
    );

    const filteredCars = cars.filter((car) => {

        const nameMatch =
            car.name.toLowerCase().includes(debouncedSearch.toLowerCase());

        const transmissionMatch =
            transmission === "All" ||
            car.transmission === transmission;

        const typeMatch =
            type === "All" ||
            car.type === type;

        const availableMatch =
            !availableOnly ||
            car.available;

        return (
            nameMatch &&
            transmissionMatch &&
            typeMatch &&
            availableMatch
        );
    });

    const sortedCars = [...filteredCars].sort((a, b) => {

        if (sort === "low-high")
            return a.pricePerDay - b.pricePerDay;

        if (sort === "high-low")
            return b.pricePerDay - a.pricePerDay;

        return 0;
    });

    const resetFilters = () => {
        setSearch("");
        setDebouncedSearch("");
        setTransmission("All");
        setType("All");
        setAvailableOnly(false);
        setSort("default");
    
        setSearchParams({});
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {

        const params = {};
    
        if (debouncedSearch)
            params.search = debouncedSearch;
    
        if (transmission !== "All")
            params.transmission = transmission;
    
        if (type !== "All")
            params.type = type;
    
        if (availableOnly)
            params.available = "true";
    
        if (sort !== "default")
            params.sort = sort;
    
        setSearchParams(params);
    
    }, [
        debouncedSearch,
        transmission,
        type,
        availableOnly,
        sort
    ]);

    return (
        <>
            <div className={styles.cars_section}>
                <HomeCarsFilter
                    search={search}
                    setSearch={setSearch}
                    transmission={transmission}
                    setTransmission={setTransmission}
                    type={type}
                    setType={setType}
                    availableOnly={availableOnly}
                    setAvailableOnly={setAvailableOnly}
                    sort={sort}
                    setSort={setSort}

                />
                <span>Showing {sortedCars.length} of {cars.length} cars</span>

                {
                    sortedCars.length === 0 ? (
                        <>
                            <h3>No cars found.</h3>

                            <button onClick={resetFilters}>
                                Reset Filters
                            </button>
                        </>
                    ) : (
                        <div className={styles.cars_section_container}>
                            {
                                sortedCars?.map((car) => (
                                    <HomeCarCard key={car.id} car={car} />
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default CarsSection