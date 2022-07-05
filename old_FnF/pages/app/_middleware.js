import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { supabase } from "../../libs/supabaseClient";

export function middleware(req, ev) {
  const { data: authListener } = supabase.auth.onAuthStateChange(
    (event, session) => {
      handleAuthChange(ev, session);
      if (event === "SIGNED_IN") {
        // dispatch({ type: "USER_LOGIN" });
        // if (accountSession && accountDetails) {
        //   router.push("/app/dashboard");
        //   console.log("allow to pass");
        // }

        return NextResponse.next();
      }
      if (event === "SIGNED_OUT") {
        dispatch({ type: "USER_LOGOUT" });
      }
    }
  );

  //   return new Response("Auth required", {
  //     status: 401,
  //     headers: {
  //       "WWW-Authenticate": 'Basic realm="Secure Area"',
  //     },
  //   });
}
