import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.JWT_SECRET })

	const { pathname } = req.nextUrl
// if user is logged in 
	if (pathname.startsWith("/_next")) return NextResponse.next();

	if (pathname.includes('/api/auth') || token) {
		return NextResponse.next()
	}
// if user is logged out or doesn't have a token redirects to login screen.

	if (!token && pathname !== '/login') {
		const loginUrl = new URL('/login', req.url)
		return NextResponse.redirect(loginUrl)
	}

	secureCookie: process.env.NEXTAUTH_URL?.startsWith("https://") ?? !!process.env.VERCEL_URL 
}