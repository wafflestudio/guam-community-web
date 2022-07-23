import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { firebaseConfig } from "../constants/constants";

export async function middleware(request: NextRequest) {
  //   const { pathname } = request.nextUrl;
  //   const { name } = request.page;
  //   if (pathname.startsWith("/profile") || name?.includes("[postId]")) {
  //     firebase.initializeApp(firebaseConfig);
  //     if (!getAuth().currentUser) {
  //       return NextResponse.redirect(new URL("/login", request.url));
  //     }
  //   }
}
