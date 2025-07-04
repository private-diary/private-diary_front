// [시, 분, 초] -> 총 초
export const timeArrayToSeconds = ([h, m, s]: number[]) =>
  h * 3600 + m * 60 + s;

// 총 초 -> [시, 분, 초]
export const secondsToTimeArray = (seconds: number): number[] => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s];
};

// 초 -> "1시간 03분 05초"
export const formatTimeArray = ([h, m, s]: number[]): string => {
  const pad = (n: number) => n.toString().padStart(2, "0");

  const parts = [];
  if (h > 0) parts.push(`${h}시간`);
  if (m > 0 || h > 0) parts.push(`${pad(m)}분`);
  parts.push(`${pad(s)}초`);

  return parts.join(" ");
};

export const getTimeDiffText = (target: number[]) => {
  const [y, m, d, h = 0, min = 0, s = 0] = target;
  const now = new Date();
  const start = new Date(y, m - 1, d, h, min, s);

  const diff = start.getTime() - now.getTime();

  if (diff <= 0) {
    return "곧";
  }

  const diffSeconds = Math.floor(diff / 1000);
  const days = Math.floor(diffSeconds / 86400);
  const hours = Math.floor((diffSeconds % 86400) / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);

  return `${days > 0 ? `${days}일 ` : ""}${hours}시간 ${minutes}분 뒤에`;
};
