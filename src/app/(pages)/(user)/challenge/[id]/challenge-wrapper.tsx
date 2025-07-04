"use client";

import { convertDate } from "@/utils/shared/date.util";
import ChallengeHeader from "./challenge-header";
import ChallengeSurvivors from "./challenge-survivors";
import ChallengeProofGrid from "./challenge-proof-grid";
import ChallengeSummary from "./challenge-summary";
import { ChallengeDetileResponse } from "@/types/challenge.type";
import { ChallengeDetail } from "@/lib/client/challenge.client.api";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";
import { useEffect, useState } from "react";

export default function ChallengeWrapper({
  id,
  initial,
}: {
  id: string;
  initial: ChallengeDetileResponse;
}) {
  const jwt = getJwtFromCookie();
  const [data, setData] = useState<ChallengeDetileResponse>(initial);

  useEffect(() => {
    if (!jwt) {
      return;
    }
    refetch();
  }, []);

  const refetch = async () => {
    const reload = await ChallengeDetail(id, jwt);
    setData(reload);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div className="flex-1 flex flex-col gap-6">
        <ChallengeHeader
          status={data.status}
          title={data.title}
          description="챌린지에 참여하고 인증샷을 올려보세요!"
          creatorMemberId={0}
          startDate={convertDate(data.startDate)}
          endDate={convertDate(data.endDate)}
          official={data.official}
          totalParticipants={data.totalParticipants}
        />

        <ChallengeSurvivors
          avatars={data.memberImageList}
          extraCount={Math.max(
            data.totalParticipants - data.memberImageList.length,
            0
          )}
        />
        {data.joined && data.status !== "BEFORE" && (
          <ChallengeProofGrid proofImages={data.challengeArticlesThumbnail} />
        )}
      </div>

      <div className="w-full lg:w-[280px] shrink-0">
        <ChallengeSummary challengeId={id} {...data} onRefetch={refetch} />
      </div>
    </div>
  );
}
