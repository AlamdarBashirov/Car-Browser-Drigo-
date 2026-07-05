import styles from "./HomeCarsFilter.module.scss";

const HomeCarsFilter = ({
    search,
    setSearch,
    transmission,
    setTransmission,
    type,
    setType,
    availableOnly,
    setAvailableOnly,
    sort,
    setSort
}) => {
    return (
        <div className={styles.filters}>
            <input
                className={styles.search_input}
                type="text"
                placeholder="Search by car name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
                <option value="default">Default</option>
                <option value="low-high">Low to High</option>
                <option value="high-low">High → Low</option>
            </select>
            <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
            >
                <option value="All">All Transmissions</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
            </select>
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="All">All Types</option>
                <option value="Economy">Economy</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
            </select>
            <label>
                <input
                    type="checkbox"
                    checked={availableOnly}
                    onChange={(e) => setAvailableOnly(e.target.checked)}
                />
                Available Only
            </label>
        </div>
    );
};

export default HomeCarsFilter;