import styles from "./HomeCarsFilter.module.scss";
import { ACTIONS } from "../../../reducers/filterReducer";

const HomeCarsFilter = ({ state, dispatch }) => {
    return (
        <div className={styles.filters}>
            <input
                className={styles.search_input}
                type="text"
                placeholder="Search by car name..."
                value={state.search}
                onChange={(e) =>
                    dispatch({
                        type: ACTIONS.SET_SEARCH,
                        payload: e.target.value,
                    })
                }
            />

            <select
                value={state.sort}
                onChange={(e) =>
                    dispatch({
                        type: ACTIONS.SET_SORT,
                        payload: e.target.value,
                    })
                }
            >
                <option value="default">Default</option>
                <option value="low-high">Low → High</option>
                <option value="high-low">High → Low</option>
            </select>

            <input
                type="number"
                placeholder="Min Price"
                className={`${styles.search_input} ${styles.price_filter}`}
                value={state.priceMin}
                onChange={(e) =>
                    dispatch({
                        type: ACTIONS.SET_PRICE_MIN,
                        payload: e.target.value,
                    })
                }
            />

            <input
                type="number"
                placeholder="Max Price"
                className={`${styles.search_input} ${styles.price_filter}`}
                value={state.priceMax}
                onChange={(e) =>
                    dispatch({
                        type: ACTIONS.SET_PRICE_MAX,
                        payload: e.target.value,
                    })
                }
            />

            <select
                value={state.transmission}
                onChange={(e) =>
                    dispatch({
                        type: ACTIONS.SET_TRANSMISSION,
                        payload: e.target.value,
                    })
                }
            >
                <option value="All">All Transmissions</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
            </select>

            <div>
                <p>Type</p>

                {
                    [
                        "Economy",
                        "Sedan",
                        "SUV",
                        "Luxury",
                    ].map((type) => (

                        <label key={type}>

                            <input
                                type="checkbox"

                                checked={
                                    state.types.includes(type)
                                }

                                onChange={() =>
                                    dispatch({
                                        type: ACTIONS.SET_TYPE,
                                        payload: type,
                                    })
                                }
                            />

                            {type}

                        </label>

                    ))
                }
            </div>

            <label>
                <input
                    type="checkbox"
                    checked={state.favoritesOnly}
                    onChange={(e) =>
                        dispatch({
                            type: ACTIONS.SET_FAVORITES_ONLY,
                            payload: e.target.checked,
                        })
                    }
                />
                Favorites Only
            </label>

            <label>
                <input
                    type="checkbox"
                    checked={state.availableOnly}
                    onChange={(e) =>
                        dispatch({
                            type: ACTIONS.SET_AVAILABLE,
                            payload: e.target.checked,
                        })
                    }
                />
                Available Only
            </label>
        </div>
    );
};

export default HomeCarsFilter;