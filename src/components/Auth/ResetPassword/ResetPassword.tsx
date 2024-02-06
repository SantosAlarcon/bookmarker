'use client';

import { FormEvent, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import styles from "./ResetPassword.module.scss"
import Image from 'next/image';
import { toast } from 'sonner';
import Spinner from '@/components/Spinner/Spinner';

const ResetPassword = () => {

    const supabase = createClientComponentClient();
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function resetPassword(email: string, event: FormEvent) {
        event.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/update-password`,
        });

        if (error) {
            console.error("ERROR: ", error);
        } else {
            toast.info("A link was sent to your email to reset your password.");
        }
        setLoading(false);
        setEmail("");
    }

    return (
        <div className={styles.reset__password__container}>
            <Image className={styles.reset__password__logo} src="/BookmarkerLogo.svg" alt="Bookmarker logo" width="450" height="150" priority />

            <div className={styles.reset__password__box}>
                <h2 className={styles.reset__password__title}>Reset Password</h2>

                <p className={styles.reset__password__text}>Please enter the email address you used to register to this application to reset your password.</p>

                <form className={styles.reset__password__form} onSubmit={(e) => resetPassword(email, e)}>
                    <label htmlFor="email" className={styles.reset__password__label}>Enter valid email address</label>
                    <input
                        className={styles.reset__password__input}
                        id="email"
                        name="email"
                        placeholder="Email"
                        type="email"
                        required
                        value={email}
                        // @ts-ignore
                        onChange={() => setEmail(event.target.value)}
                    />
                    <button className={styles.reset__password__button} type="submit" disabled={email ? false : true}>
                        {loading ? <Spinner /> : "Reset password"}
                    </button>
                </form>
                <Link href="/auth/login" className={styles.reset__password__link}>
                    Remember your password? <b>Sign in.</b>
                </Link>
            </div>
        </div>
    );
};

export default ResetPassword;
