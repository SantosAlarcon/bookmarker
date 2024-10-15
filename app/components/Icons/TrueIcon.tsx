import Image from "next/image";
import React from "react";

const TrueIcon = () => {
    return (
        <Image
            src="/icons/true-icon.svg"
            width={24}
            height={24}
            alt="True icon"
            priority
        />
    );
};

export default TrueIcon;
