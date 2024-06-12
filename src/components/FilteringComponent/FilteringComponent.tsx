"use client";

import { type MutableRefObject, useRef, useState, useEffect } from "react";
import styles from "./FilteringComponent.module.scss"
import Image from "next/image";
import { motion } from "framer-motion";
import { filterStore } from "@/store/filterStore";
import useDebounceValue from "@/app/utils/hooks/useDebounceValue";

const FilteringComponent = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [filter, setFilter] = useState<string>("");
    const filterRef: MutableRefObject<string | null> = useRef<string>(null);
    const newFilterStore = filterStore((state) => state.setFilter)
    const debounceFilter = useDebounceValue(filter, 600)

    useEffect(() => {
        newFilterStore(debounceFilter)
    }, [debounceFilter])

	return (
        <div className={styles.filtering__container}>
            {isOpen && (
                <motion.input initial={{width: 0}} animate={{width: "100%"}} exit={{width: 0}} transition={{duration: 0.5}} type="text" ref={filterRef} onChange={() => setFilter(filterRef.current.value)} />
            )}
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
                <Image width={32} height={32} src="/icons/search-icon.svg" alt="Search icon" />
            </button>
        </div>
    );
};

export default FilteringComponent;
