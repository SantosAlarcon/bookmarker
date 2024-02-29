import ResetPassword from '@/components/Auth/ResetPassword/ResetPassword';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ResetPasswordPage = async () => {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();

    if (data?.session) {
        redirect('/');
    }

    return (
        <>
            <head>
                <title>Reset password - Bookmarker</title>
            </head>
            <ResetPassword />
        </>
    )

}

export default ResetPasswordPage;
