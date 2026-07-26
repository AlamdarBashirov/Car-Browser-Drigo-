import styles from "./Pagination.module.scss";

const Pagination = ({ currentPage, totalPages, onPageChange, }) => {

    const pages = []

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    if (totalPages <= 1) return null;

    return (
        <div className={styles.pagination}>

            <div>
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

            <div>
                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default Pagination;