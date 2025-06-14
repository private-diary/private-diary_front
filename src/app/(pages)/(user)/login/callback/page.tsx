"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Loading from "@/app/loading";

export default function AuthCallbackPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const memberId = params.get("memberId");

    if (memberId) {
      localStorage.setItem("memberId", memberId);
    }

    window.dispatchEvent(new Event("member:changed"));
    router.replace("/");
  }, [params, router]);

  return <Loading />;
}
