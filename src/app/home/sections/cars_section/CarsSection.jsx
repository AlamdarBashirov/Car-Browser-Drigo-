import HomeCarCard from '../../../../components/cards/home_car_card/HomeCarCard'
import HomeCarsFilter from '../../../../components/filters/home_cars_filter/HomeCarsFilter'
import styles from './CarsSection.module.scss'
import React, { useEffect, useState, useReducer } from 'react'
import { useSearchParams } from "react-router-dom";
import useCars from "../../../../hooks/useCars"
import useDebounce from "../../../../hooks/useDebounce";
import { filterReducer, initialState, ACTIONS } from "../../../../reducers/filterReducer";


const CarsSection = () => {

    const [searchParams, setSearchParams] = useSearchParams();


    const [state, dispatch] = useReducer(filterReducer, {
        ...initialState,

        search: searchParams.get("search") || "",

        transmission: searchParams.get("transmission") || "All",

        type: searchParams.get("type") || "All",

        availableOnly:
            searchParams.get("available") === "true",

        sort:
            searchParams.get("sort") || "default",
    });

    const debouncedSearch = useDebounce(state.search, 300);
    const {
        cars,
        loading,
        error,
        retry,
    } = useCars();

    const filteredCars = cars.filter((car) => {

        const nameMatch =
            car.name.toLowerCase().includes(debouncedSearch.toLowerCase());

        const transmissionMatch =
            state.transmission === "All" ||
            car.transmission === state.transmission;

        const typeMatch =
            state.type === "All" ||
            car.type === state.type;

        const availableMatch =
            !state.availableOnly ||
            car.available;

        return (
            nameMatch &&
            transmissionMatch &&
            typeMatch &&
            availableMatch
        );
    });

    const sortedCars = [...filteredCars].sort((a, b) => {

        if (state.sort === "low-high")
            return a.pricePerDay - b.pricePerDay;

        if (state.sort === "high-low")
            return b.pricePerDay - a.pricePerDay;

        return 0;
    });

    const resetFilters = () => {
        dispatch({
            type: ACTIONS.RESET,
        });

        setSearchParams({});
    };

    useEffect(() => {

        const params = {};

        if (debouncedSearch)
            params.search = debouncedSearch;

        if (state.transmission !== "All")
            params.transmission = state.transmission;

        if (state.type !== "All")
            params.type = state.type;

        if (state.availableOnly)
            params.available = "true";

        if (state.sort !== "default")
            params.sort = state.sort;

        setSearchParams(params);

    }, [
        debouncedSearch,
        state.transmission,
        state.type,
        state.availableOnly,
        state.sort,
    ]);

    if (loading) {
        return (
            <div className={styles.cars_section}>
                <h2>Loading cars...</h2>
            </div>
        );
    }
    if (error) {
        return (
            <div className={styles.cars_section}>
                <h2>{error}</h2>

                <button onClick={retry}>
                    Retry
                </button>
            </div>
        );
    }
    return (

        <>
            <div className={styles.cars_section}>
                <HomeCarsFilter
                    state={state}
                    dispatch={dispatch}
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