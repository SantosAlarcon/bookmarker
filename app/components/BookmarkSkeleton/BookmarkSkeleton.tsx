import React from "react";
import styles from "./BookmarkSkeleton.module.scss";

const BookmarkSkeleton = () => {
    return (
        <div aria-hidden="true" className={styles.bookmark__skeleton__container} />
    );
};

export default BookmarkSkeleton;
