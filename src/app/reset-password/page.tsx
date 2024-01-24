import ResetPassword from '@/components/Auth/ResetPassword/ResetPassword';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Head from 'next/head';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ResetPasswordPage = async() => {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();

    if (data?.session) {
        redirect('/');
    }

    return ( 
            <>
            <Head>
               <title>Reset password - Bookmarker</title> 
            </Head>
            <ResetPassword />
            </>
    )

}

export default ResetPasswordPage;
