import styles from "./Pagination.module.scss";

const Pagination = ({ currentPage, totalPages, onPageChange, }) => {

    const pages = []

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    if (totalPages <= 1) return null;

    return (
        <div className={styles.pagination}>

            <button
                className={styles.pageButton}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                ← Previous
            </button>

            <div className={styles.pageNumbers}>
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ""
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <div className={styles.pageInfo}>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
            </div>

            <button
                className={styles.pageButton}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next →
            </button>

        </div>
    );
};

export default Pagination;