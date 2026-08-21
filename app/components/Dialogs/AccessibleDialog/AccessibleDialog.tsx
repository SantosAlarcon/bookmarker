"use client";
import { useEffect, useRef, type ReactNode } from "react";

type AccessibleDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    titleId: string;
    descriptionId?: string;
    className?: string;
    children: ReactNode;
};

const AccessibleDialog = ({
    isOpen,
    onClose,
    titleId,
    descriptionId,
    className,
    children,
}: AccessibleDialogProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (isOpen && !dialog.open) {
            dialog.showModal();
        } else if (!isOpen && dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    return (
        <dialog
            ref={dialogRef}
            className={className}
            onClose={onClose}
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
        >
            {children}
        </dialog>
    );
};

export default AccessibleDialog;
