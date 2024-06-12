import { useEffect, useRef, useState } from "react";

const useDebounceValue = (value: any, delay: number = 300): any => {
	const [debValue, setDebValue] = useState<any>();
	const timerRef = useRef();

	useEffect(() => {
		timerRef.current = setTimeout(() => setDebValue(value), delay);

		return () => {
			clearTimeout(timerRef.current);
		};
	}, [value, delay]);

	return debValue;
};
export default useDebounceValue;
