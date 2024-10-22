"use client";

import styles from "./RegisterComponent.module.scss";
import Image from "next/image";
import "@/styles/globals.css";
import { type FormEvent, useState } from "react";
import Spinner from "@/components/Spinner/Spinner";
import { toast } from "sonner";
import Link from "next/link";
import { signUpWithEmail } from "@/app/utils/signUp";

interface FormData {
    email: string;
    password: string;
    loading: boolean;
}

const RegisterComponent = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        loading: false,
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setFormData({ ...formData, loading: true });
        await signUpWithEmail(formData.email, formData.password)
            .then(() => {
                // These lines will execute if the login is successful
                toast.success("Login successful!");
            })
            .catch((error) => {
                // If it fails to log in, it shows an toast error
                toast.error(error.message);
            });

        setFormData({ ...formData, loading: false });
        setFormData({ email: "", password: "", loading: false });
    };

    return (
        <section className={styles.register__page__container}>
            <div className={styles.register__page__logo}>
                <Image
                    src="/BookmarkerLogo.svg"
                    alt="logo"
                    width={450}
                    height={150}
                    priority={true}
                />
            </div>
            <div className={styles.register__page__box}>
                <h2 className={styles.register__page__title}>Register</h2>
                <div className={styles.register__page__text}>
                    Start managing your bookmarks in one place by sign up your
                    account.
                </div>
                <div className={styles.register__page__social__buttons}>
                    <hr className={styles.register__page__separator} />
                    <form
                        className={styles.register__page__form}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            required={true}
                            placeholder="Email"
                            value={formData.email}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            required={true}
                            placeholder="Password"
                            value={formData.password}
                        />
                        <button
                            className={styles.register__page__social__button}
                            type="submit"
                        >
                            {formData.loading ? (
                                <Spinner />
                            ) : (
                                <Image
                                    src="/social/email.svg"
                                    alt="Email Logo"
                                    width={20}
                                    height={20}
                                    priority={true}
                                />
                            )}
                            Sign Up with Email
                        </button>
                    </form>
                </div>
                <Link
                    href="/auth/login"
                    className={styles.register__page__link}
                >
                    Already have an account? <b>Log in</b>
                </Link>
                <Link
                    href="/reset-password"
                    className={styles.register__page__link}
                >
                    Cannot log in? <b>Click to reset password</b>
                </Link>
            </div>
        </section>
    );
};

export default RegisterComponent;
