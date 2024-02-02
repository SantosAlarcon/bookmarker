import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import styles from "./private.module.scss"

import { createClient } from '@/app/utils/supabase/server'
import { UserMetadata } from '@supabase/supabase-js'
import TrueIcon from '@/components/Icons/TrueIcon'
import FalseIcon from '@/components/Icons/FalseIcon'

export default async function PrivatePage() {

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.auth.getUser()
    const metadata: UserMetadata | undefined = data.user?.user_metadata

    console.log(metadata);

    // If there is no user or session active, redirect to the main page.
    if (error || !data?.user) {
        redirect('/')
    }

    return (<section className={styles.user__info__container}>
        <h1 className={styles.user__info__title}>User information</h1>
        <div className={styles.user__info__avatar}>
	    <picture>
		<img className={styles.user__info__avatar__img} alt={metadata?.full_name} src={metadata?.picture} />
	    </picture>
        </div>
        <div className={styles.user__info__data__grid}>
                <span className={styles.user__info__data__grid__field__name}>Full Name:</span>
                <span className={styles.user__info__data__grid__field__value}>{metadata?.full_name}</span>
                <span className={styles.user__info__data__grid__field__name}>Email:</span>
                <span className={styles.user__info__data__grid__field__value}>{metadata?.email}</span>
                <span className={styles.user__info__data__grid__field__name}>Verified by email:</span>
                <span className={styles.user__info__data__grid__field__value}>{metadata?.email_verified ? <TrueIcon /> : <FalseIcon />}</span>
                <span className={styles.user__info__data__grid__field__name}>Creation date:</span>
                <span className={styles.user__info__data__grid__field__value}>{new Date(data.user.created_at).toLocaleString("es", {day:"numeric", month:"long", year:"numeric"})}</span>
                <span className={styles.user__info__data__grid__field__name}>Last login date:</span>
                <span className={styles.user__info__data__grid__field__value}>{new Date(data.user.last_sign_in_at!).toLocaleString("es", {day:"numeric", month:"long", year:"numeric", hour:"numeric", minute:"numeric"})}</span>
        </div>
    </section>)
}
