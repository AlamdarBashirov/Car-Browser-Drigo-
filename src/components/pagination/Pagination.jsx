import styles from "./Pagination.module.scss";

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {

    if (totalPages <= 1) return null;

    return (
        <div className={styles.pagination}>

            <button
                disabled={currentPage === 1}
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
            >
                Previous
            </button>

            <span>
                {currentPage} / {totalPages}
            </span>

            <button
                disabled={currentPage === totalPages}
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
            >
                Next
            </button>

        </div>
    );
};

export default Pagination;