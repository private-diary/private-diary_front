import { AdviceDetailResponse } from "@/types/advice.type";

export async function AdviceDetail(worryId: string) {
  const res = await fetch(`${process.env.BACKEND_API_URL}/worry/${worryId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`고민글 상세 불러오기 실패: ${res.status}`);
  }

  const data: AdviceDetailResponse = await res.json();

  return data;
}
