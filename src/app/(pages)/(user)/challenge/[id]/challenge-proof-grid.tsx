import { ChallengeProofGridProps } from "@/types/challenge.type";

export default function ChallengeProofGrid({
  proofImages,
}: ChallengeProofGridProps) {
  return (
    <div>
      <h3 className="text-primary font-semibold mt-6 mb-2">인증</h3>
      <div className="grid grid-cols-5 gap-2">
        {proofImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`proof-${i}`}
            className="aspect-square object-cover rounded border border-gray-300"
          />
        ))}
      </div>
    </div>
  );
}
