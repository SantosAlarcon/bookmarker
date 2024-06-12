import { useEffect, useRef, useState } from "react";

type DebounceProps = {
	value: any;
	delay: number;
};

const useDebounceValue = ({ value, delay = 500 }: DebounceProps) => {
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
