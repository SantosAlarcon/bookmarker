import { useEffect, useRef, useState } from "react";

const useDebounceValue = (value: any, delay: number = 300): any => {
    const [debValue, setDebValue] = useState<any>();
    const timerRef = useRef(null);

    useEffect(() => {
        // @ts-ignore
        timerRef.current = setTimeout(() => setDebValue(value), delay);

        return () => {
			// @ts-ignore
            clearTimeout(timerRef.current);
        };
    }, [value, delay]);

    return debValue;
};
export default useDebounceValue;
