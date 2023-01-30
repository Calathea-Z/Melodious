import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req) {
    //If user logged-in get token and or if they are trying to log in let them try if not send back to login screen.
    // const url = req.nextUrl.clone();
    const token = await getToken({ req, secret: process.env.JWT_SECRET});
    // const { pathname } = req.nextUrl

    if (req.nextUrl.pathname.startsWith('//api/auth') || token ) {
        return NextResponse.next();
    }


    if(!token && req.nextUrl.pathname !== '/login' ) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}