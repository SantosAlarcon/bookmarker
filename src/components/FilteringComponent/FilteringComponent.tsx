"use client";

import { type MutableRefObject, useRef, useState, useEffect } from "react";
import styles from "./FilteringComponent.module.scss";
import Image from "next/image";
import { filterStore } from "@/store/filterStore";
import useDebounceValue from "@/app/utils/hooks/useDebounceValue";
import tooltipStyles from "../../styles/tooltip.module.scss";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";

const FilteringComponent = () => {
	const [filter, setFilter] = useState<string>("");
	const filterRef: MutableRefObject<string | null> = useRef<string>(null);
	const newFilterStore = filterStore((state) => state.setFilter);
	const debounceFilter = useDebounceValue(filter, 600);
	const { t } = useTranslation("header");

	useEffect(() => {
		newFilterStore(debounceFilter);
	}, [debounceFilter]);

	return (
		<div className={styles.filtering__container}>
			<input
				initial={{ width: 0 }}
				animate={{ width: "revert-layer" }}
				exit={{ width: 0 }}
				transition={{ duration: 0.5 }}
				type="text"
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
				<Image width={32} height={32} src="/icons/search-icon.svg" alt="Search icon" />
			</button>
		</div>
	);
};

export default FilteringComponent;
