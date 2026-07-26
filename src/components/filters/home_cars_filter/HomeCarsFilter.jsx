import styles from "./HomeCarsFilter.module.scss";
import { ACTIONS } from "../../../reducers/filterReducer";

const HomeCarsFilter = ({ query, setQuery }) => {
    return (
        <div className={styles.filters}>
            <input
                className={styles.search_input}
                type="text"
                placeholder="Search by car name..."
                value={query.search}
                onChange={(e) =>
                    setQuery({
                        ...query,
                        search: e.target.value
                    })
                }
            />

            <select
                value={query.sort}
                onChange={(e) =>
                    setQuery({
                        ...query,
                        sort: e.target.value
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
                value={query.priceMin}
                onChange={(e) =>
                    setQuery({
                        ...query,
                        priceMin: e.target.value
                    })
                }
            />

            <input
                type="number"
                placeholder="Max Price"
                className={`${styles.search_input} ${styles.price_filter}`}
                value={query.priceMax}
                onChange={(e) =>
                    setQuery({
                        ...query,
                        priceMax: e.target.value
                    })
                }
            />

            <select
                value={query.transmission}
                onChange={(e) =>
                    setQuery({
                        ...query,
                        transmission: e.target.value
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
                                    query.types.includes(type)
                                }

                                onChange={() =>
                                    query.types.includes(type) ? 
                                    setQuery({
                                        ...query,
                                        types: query.types.filter(item => item !== type)
                                    }) : setQuery({
                                        ...query,
                                        types: [...query.types, type]
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
                    checked={query.favoritesOnly}
                    onChange={(e) =>
                        setQuery({
                            ...query,
                            favoritesOnly: e.target.checked
                        })
                    }
                />
                Favorites Only
            </label>

            <label>
                <input
                    type="checkbox"
                    checked={query.availableOnly}
                    onChange={(e) =>
                        setQuery({
                            ...query,
                            availableOnly: e.target.checked
                        })
                    }
                />
                Available Only
            </label>
        </div>
    );
};

export default HomeCarsFilter;