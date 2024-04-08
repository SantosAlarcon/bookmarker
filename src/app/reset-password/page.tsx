import ResetPassword from '@/components/Auth/ResetPassword/ResetPassword';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Metadata } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	    title: "Reset password - Bookmarker",
}

const ResetPasswordPage = async () => {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();
    const {t} = useTranslation('reset-password');
    metadata.title = t('page-title');

    if (data?.session) {
        redirect('/');
    }


    return (
        <>
            <ResetPassword />
        </>
    )

}

export default ResetPasswordPage;
