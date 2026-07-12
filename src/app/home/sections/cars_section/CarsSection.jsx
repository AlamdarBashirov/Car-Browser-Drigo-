import HomeCarCard from '../../../../components/cards/home_car_card/HomeCarCard'
import HomeCarsFilter from '../../../../components/filters/home_cars_filter/HomeCarsFilter'
import styles from './CarsSection.module.scss'
import React, { useEffect, useState, useReducer, useMemo } from 'react'
import { useSearchParams } from "react-router-dom";
import useCars from "../../../../hooks/useCars"
import useDebounce from "../../../../hooks/useDebounce";
import { filterReducer, initialState, ACTIONS } from "../../../../reducers/filterReducer";
import filterCars from "../../../../utils/filterCars";
import sortCars from "../../../../utils/sortCars";


const CarsSection = () => {

    const [searchParams, setSearchParams] = useSearchParams();


    const [state, dispatch] = useReducer(filterReducer, {
        ...initialState,
    
        search: searchParams.get("search") || "",
    
        transmission: searchParams.get("transmission") || "All",
    
        type: searchParams.get("type") || "All",
    
        availableOnly:searchParams.get("available") === "true",
    
        sort:searchParams.get("sort") || "default",
    
        priceMin:searchParams.get("minPrice") || "",
    
        priceMax:searchParams.get("maxPrice") || "",
    });

    const debouncedSearch = useDebounce(state.search, 300);
    const debouncedMinPrice =
        useDebounce(state.priceMin, 300);

    const debouncedMaxPrice =
        useDebounce(state.priceMax, 300);
    const {
        cars,
        loading,
        error,
        retry,
    } = useCars();

    const filteredCars = useMemo(() => {
        return filterCars(cars, {
            search: debouncedSearch,

            transmission: state.transmission,

            type: state.type,

            availableOnly: state.availableOnly,

            priceMin: debouncedMinPrice,

            priceMax: debouncedMaxPrice,
        });

    }, [
        cars,
        debouncedSearch,
        state.transmission,
        state.type,
        state.availableOnly,
        debouncedMinPrice,
        debouncedMaxPrice,
    ]);

    const sortedCars = useMemo(() => {
        return sortCars(
            filteredCars,
            state.sort
        );
    }, [
        filteredCars,
        state.sort,
    ]);

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
    
        if (debouncedMinPrice)
            params.minPrice = debouncedMinPrice;
    
        if (debouncedMaxPrice)
            params.maxPrice = debouncedMaxPrice;
    
        setSearchParams(params);
    
    }, [
        debouncedSearch,
        debouncedMinPrice,
        debouncedMaxPrice,
        state.transmission,
        state.type,
        state.availableOnly,
        state.sort,
        setSearchParams,
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