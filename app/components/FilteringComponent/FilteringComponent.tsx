"use client";

import "@/app/i18n/client";
import styles from "./FilteringComponent.module.scss";
import { filterStore } from "@/store/filterStore";
import useDebounceValue from "@/app/utils/hooks/useDebounceValue";
import tooltipStyles from "../../styles/tooltip.module.css";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";
import { localeStore } from "@/app/store/localeStore";
import { bookmarksStore } from "@/app/store/bookmarksStore";
import { type MutableRefObject, useRef, useState, useEffect } from "react";
import Image from "next/image";

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
		<search className={styles.filtering__container}>
			<input
				type="search"
				placeholder={t("filter")}
				aria-label={t("filter")}
				// @ts-ignore
				ref={filterRef}
				// @ts-ignore
				onChange={() => setFilter(filterRef.current.value)}
			/>
			<button
				type="button"
				id="search-tooltip"
				tabIndex={-1}
				aria-hidden="true"
			>
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
					alt=""
					className={styles.filtering__container__icon}
				/>
			</button>
		</search>
	) : (
		<span
			className={styles.filtering__container__skeleton}
			aria-hidden="true"
		/>
	);
};

export default FilteringComponent;
