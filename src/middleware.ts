import {NextResponse, NextRequest} from 'next/server'


export default async function middleware(req: NextRequest) {
    const session = await req.cookies.get('next-auth.session-token')

    if (!session) {
        return NextResponse.redirect(new URL('http://localhost:3000/registration/signin', req.url))
    }
}

export const config = {
    matcher: [
        '/dashboard/:path*', 
    ]
}