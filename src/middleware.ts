import {NextResponse, NextRequest} from 'next/server'


export default async function middleware(req: NextRequest) {
    const session = await req.cookies.get('next-auth.session-token')

    if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('http://localhost:3000/user/registration/signin', req.url))
    } else if (session && req.nextUrl.pathname.startsWith('/user/registration')) {
        return NextResponse.redirect(new URL('http://localhost:3000/dashboard/home', req.url))
    }
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/user/registration/:path*' 
    ]
}