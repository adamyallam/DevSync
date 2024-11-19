import {NextResponse, NextRequest} from 'next/server'
import { getToken } from "next-auth/jwt"; 

export default async function middleware(req: NextRequest) {
    const session = await getToken({ req });

    if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/user/registration/signin', req.nextUrl.origin));
    } else if (session && req.nextUrl.pathname.startsWith('/user/registration')) {
        return NextResponse.redirect(new URL('/dashboard/home', req.nextUrl.origin));
    }
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/user/registration/:path*' 
    ]
}