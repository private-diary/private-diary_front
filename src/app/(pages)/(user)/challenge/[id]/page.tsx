import ChallengeHeader from "./challenge-header";
import ChallengeSurvivors from "./challenge-survivors";
import ChallengeProofGrid from "./challenge-proof-grid";

import { ChallengeDetail } from "@/lib/server/challenge.server.api";
import { getJwtFromServerCookie } from "@/utils/server/jwt.server.util";
import { convertDate } from "@/utils/shared/date.util";
import ChallengeSummary from "./challenge-summary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const jwt = await getJwtFromServerCookie();
  const data = await ChallengeDetail(id, jwt);

  return {
    title: `모각 | ${data.title}`,
    description: `${data.title} 챌린지에서 인증샷을 올려 함께하세요.`,
  };
}

export default async function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const jwt = await getJwtFromServerCookie();

  const data = await ChallengeDetail(id, jwt);
  return (
    <div className="max-w-screen-xl mx-auto px-8 py-10">
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
          <ChallengeSummary challengeId={id} {...data} />
        </div>
      </div>
    </div>
  );
}
