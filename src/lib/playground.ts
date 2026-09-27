export type PlaygroundItem = {
  slug: string;
  title: string;
  summary: string;
  kind: 'demo';
};
export const playground: PlaygroundItem[] = [
  {
    slug: 'bragg',
    title: 'X선 회절 피크 계산기',
    summary:
      '입방정 결정의 격자 상수와 X선 파장으로 브래그 법칙에 따른 회절 피크 위치를 계산합니다.',
    kind: 'demo',
  },
];
