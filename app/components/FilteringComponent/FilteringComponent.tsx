"use client";

import "@/app/i18n/client";
import { type MutableRefObject, useRef, useState, useEffect } from "react";
import styles from "./FilteringComponent.module.scss";
import Image from "next/image";
import { filterStore } from "@/store/filterStore";
import useDebounceValue from "@/app/utils/hooks/useDebounceValue";
import tooltipStyles from "../../styles/tooltip.module.css";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";
import { localeStore } from "@/app/store/localeStore";
import { bookmarksStore } from "@/app/store/bookmarksStore";

const FilteringComponent = () => {
    const [isFetched, setIsFetched] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>("");
    const filterRef: MutableRefObject<string | null> = useRef<string>(null);
    const newFilterStore = filterStore((state) => state.setFilter);
    const debounceFilter = useDebounceValue(filter, 300);
    const fetched = bookmarksStore((state) => state.fetched);

    // @ts-ignore
    const lang: string = localeStore.getState().locale;

    const { t } = useTranslation("header", { lng: lang });

    useEffect(() => {
        newFilterStore(debounceFilter);
    }, [debounceFilter]);

    useEffect(() => {
        if (fetched) {
            setIsFetched(true);
        }
    }, [fetched]);

    return isFetched ? (
        <div className={styles.filtering__container}>
            <input
                initial={{ width: 0 }}
                animate={{ width: "revert-layer" }}
                exit={{ width: 0 }}
                transition={{ duration: 0.5 }}
                type="text"
                placeholder={t("filter")}
                aria-label={t("filter")}
				role="search"
                // @ts-ignore
                ref={filterRef}
                // @ts-ignore
                onChange={() => setFilter(filterRef.current.value)}
            />
            <button type="button" id="search-tooltip">
                <Tooltip
                    anchorSelect="#search-tooltip"
                    place="bottom"
                    variant="info"
                    className={tooltipStyles.custom__tooltip}
                    content={t("search-tooltip")}
                />
                <Image
                    width={32}
                    height={32}
                    src="/icons/search-icon.svg"
                    alt="Search icon"
                    className={styles.filtering__container__icon}
                />
            </button>
        </div>
    ) : (
        <span className={styles.filtering__container__skeleton} />
    );
};

export default FilteringComponent;
