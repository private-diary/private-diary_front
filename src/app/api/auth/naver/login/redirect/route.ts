import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code || !state) {
      return NextResponse.json(
        { error: "code or state 없음" },
        { status: 400 }
      );
    }

    const tokenRes = await fetch("https://nid.naver.com/oauth2.0/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.NAVER_CLIENT_ID!,
        client_secret: process.env.NAVER_CLIENT_SECRET!,
        code,
        state,
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.json(
        { error: "Token fetch failed", tokenData },
        { status: 500 }
      );
    }

    const accessToken = tokenData.access_token;

    const userRes = await fetch("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = await userRes.json();

    const userInfo = {
      provider: "naver",
      providerId: userData.response.id,
    };

    // const backendRes = await fetch(`${process.env.BACKEND_API_URL}/api/auth/naver`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(userInfo),
    // });

    // const { token } = await backendRes.json();

    // const response = NextResponse.redirect(`${process.env.LOGIN_SUCCESS_REDIRECT_URL}?token=${token}`);
    // response.cookies.set("jwt", token, { path: "/" });

    // return response;

    return NextResponse.redirect("http://localhost:3000");
  } catch (err) {
    console.error("네이버 로그인 처리 오류:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
