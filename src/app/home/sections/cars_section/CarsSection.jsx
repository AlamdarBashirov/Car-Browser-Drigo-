// import HomeCarCard from '../../../../components/cards/home_car_card/HomeCarCard'
// import HomeCarsFilter from '../../../../components/filters/home_cars_filter/HomeCarsFilter'
// import styles from './CarsSection.module.scss'
// import React, { useEffect, useState, useReducer, useMemo } from 'react'
// import { useSearchParams } from "react-router-dom";
// import useCars from "../../../../hooks/useCars"
// import useDebounce from "../../../../hooks/useDebounce";
// import { filterReducer, initialState, ACTIONS } from "../../../../reducers/filterReducer";
// import filterCars from "../../../../utils/filterCars";
// import sortCars from "../../../../utils/sortCars";
// import Pagination from "../../../../components/pagination/Pagination";
// import { useFavoritesContext } from "../../../../context/FavoritesContext"


// const CarsSection = () => {

//     const [searchParams, setSearchParams] = useSearchParams();

//     const { favorites } = useFavoritesContext();

//     const [state, dispatch] = useReducer(filterReducer, {
//         ...initialState,

//         search: searchParams.get("search") || "",

//         transmission: searchParams.get("transmission") || "All",

//         types: searchParams.get("types") ? searchParams.get("types").split(",") : [],

//         availableOnly: searchParams.get("available") === "true",

//         sort: searchParams.get("sort") || "default",

//         priceMin: searchParams.get("minPrice") || "",

//         priceMax: searchParams.get("maxPrice") || "",

//         favoritesOnly: searchParams.get("favorites") === "true",
//     });

//     const debouncedSearch = useDebounce(state.search, 300);
//     const debouncedMinPrice =
//         useDebounce(state.priceMin, 300);

//     const debouncedMaxPrice =
//         useDebounce(state.priceMax, 300);
//     const {
//         cars,
//         loading,
//         error,
//         retry,
//     } = useCars();

//     const filteredCars = useMemo(() => {
//         return filterCars(cars, {
//             search: debouncedSearch,
//             transmission: state.transmission,
//             types: state.types,
//             availableOnly: state.availableOnly,
//             priceMin: debouncedMinPrice,
//             priceMax: debouncedMaxPrice,
//             seats: state.seats,
//             favoritesOnly: state.favoritesOnly,
//             favorites,
//         });
//     }, [
//         cars,
//         debouncedSearch,
//         state.transmission,
//         state.types,
//         state.availableOnly,
//         debouncedMinPrice,
//         debouncedMaxPrice,
//         state.seats,
//         state.favoritesOnly,
//         favorites,
//     ]);

//     const sortedCars = useMemo(() => {
//         return sortCars(
//             filteredCars,
//             state.sort
//         );
//     }, [
//         filteredCars,
//         state.sort,
//     ]);

//     const CARS_PER_PAGE = 6;

//     const totalPages = Math.ceil(
//         sortedCars.length / CARS_PER_PAGE
//     );

//     const startIndex =
//         (state.page - 1) * CARS_PER_PAGE;

//     const paginatedCars =
//         sortedCars.slice(
//             startIndex,
//             startIndex + CARS_PER_PAGE
//         );

//     const resetFilters = () => {
//         dispatch({
//             type: ACTIONS.RESET,
//         });

//         setSearchParams({});
//     };

//     useEffect(() => {
//         const params = {};

//         if (debouncedSearch)
//             params.search = debouncedSearch;

//         if (state.transmission !== "All")
//             params.transmission = state.transmission;

//         if (state.types.length)
//             params.types = state.types.join(",");

//         if (state.availableOnly)
//             params.available = "true";

//         if (state.sort !== "default")
//             params.sort = state.sort;

//         if (debouncedMinPrice)
//             params.minPrice = debouncedMinPrice;

//         if (debouncedMaxPrice)
//             params.maxPrice = debouncedMaxPrice;

//         if (state.favoritesOnly)
//             params.favorites = "true";

//         if (state.page > 1)
//             params.page = state.page;

//         setSearchParams(params);

//     }, [
//         debouncedSearch,
//         debouncedMinPrice,
//         debouncedMaxPrice,
//         state.transmission,
//         state.types,
//         state.availableOnly,
//         state.sort,
//         setSearchParams,
//         state.favoritesOnly,
//         state.page  
//     ]);

//     if (loading) {
//         return (
//             <div className={styles.cars_section}>
//                 <h2>Loading cars...</h2>
//             </div>
//         );
//     }
//     if (error) {
//         return (
//             <div className={styles.cars_section}>
//                 <h2>{error}</h2>

//                 <button onClick={retry}>
//                     Retry
//                 </button>
//             </div>
//         );
//     }
//     return (

//         <>
//             <div className={styles.cars_section}>
//                 <HomeCarsFilter
//                     state={state}
//                     dispatch={dispatch}
//                 />
//                 <span>Showing {sortedCars.length} of {cars.length} cars</span>

//                 {
//                     sortedCars.length === 0 ? (
//                         <>
//                             <h3>No cars found.</h3>

//                             <button onClick={resetFilters}>
//                                 Reset Filters
//                             </button>
//                         </>
//                     ) : (
//                         <div className={styles.cars_section_container}>
//                             {
//                                 paginatedCars?.map((car) => (
//                                     <HomeCarCard key={car.id} car={car} />
//                                 ))
//                             }
//                             <Pagination
//                                 currentPage={state.page}
//                                 totalPages={totalPages}
//                                 onPageChange={(page) =>
//                                     dispatch({
//                                         type: ACTIONS.SET_PAGE,
//                                         payload: page,
//                                     })
//                                 }
//                             />  
//                         </div>
//                     )
//                 }
//             </div>
//         </>
//     )
// }

// export default CarsSection


import React, { useEffect, useState } from 'react'
import styles from './CarsSection.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getCarsThunk } from '../../../../redux/reducers/carsSlice'
import HomeCarCard from '../../../../components/cards/home_car_card/HomeCarCard'
import HomeCarsFilter from '../../../../components/filters/home_cars_filter/HomeCarsFilter'
import Pagination from '../../../../components/pagination/Pagination'
import { useNavigate, useSearchParams } from 'react-router-dom'

const CarsSection = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const params = {}
    const dispatch = useDispatch()

    const { cars, loading, error, totalCount } = useSelector((state) => state.cars)

    const [query,setQuery] = useState({
        search: searchParams.get("search") || "",
        transmission: searchParams.get("transmission") || "All",
        types: searchParams.get("types") 
            ? searchParams.get("types").split(",")
            : [],
        favoritesOnly: searchParams.get("favorites") === "true",
        availableOnly: searchParams.get("available") === "true",
        sort: searchParams.get("sort") || "default",
        priceMin: searchParams.get("priceMin") || "",
        priceMax: searchParams.get("priceMax") || "",
        page: Number(searchParams.get("page")) || 1,
        limit:4
    })

    const totalPages = Math.ceil(
        totalCount / query.limit
    )

    useEffect(() => {
        dispatch(getCarsThunk(query))
    }, [query])

    useEffect(() => {
        if(query.search){
            params.search = query.search
        }
        if(query.transmission !== "All"){
            params.transmission = query.transmission
        }
        if(query.sort !== "default"){
            params.sort = query.sort
        }
        if(query.page !== 1){
            params.page = query.page
        }
        if(query.availableOnly !== false){
            params.availableOnly = query.availableOnly
        }
        if(query.favoritesOnly !== false){
            params.favoritesOnly = query.favoritesOnly
        }
        if(query.priceMin){
            params.priceMin = query.priceMin
        }
        if(query.priceMax){
            params.priceMax = query.priceMax
        }
        if(query.types.length !== 0){
            // params.types = String(query.types)
            params.types = query.types.join(",")
        }
        setSearchParams(params)
    }, [query])
    
    return (
        <>
            <div className={styles.carsSection}>
                <div>
                    <HomeCarsFilter
                        query={query}
                        setQuery={setQuery}
                    />
                    {/* <span>Showing {cars.length} of {totalCount} cars</span> */}
                </div>
                <div className={styles.carsSectionContainer}>
                    {cars && cars.map((car) => {
                        return <HomeCarCard key={car.id} car={car} />
                    })}
                </div>
                <div>
                    <Pagination
                        currentPage={query.page}
                        totalPages={totalPages}
                        onPageChange={(page) =>
                            setQuery({
                                ...query,
                                page
                            })
                        }
                    />
                </div>
            </div>
        </>
    )
}

export default CarsSection