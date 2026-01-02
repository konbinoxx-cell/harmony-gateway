// 教会常用的赞美诗库
export const hymnLibrary = [
  {
    id: 'h001',
    title: '奇异恩典',
    originalTitle: 'Amazing Grace',
    key: 'C',
    tempo: 72,
    difficulty: 'easy',
    parts: {
      melody: 'C4 D4 E4 C4 E4 D4...',
      harmony: {
        soprano: 'E4 F4 G4 E4 G4 F4...',
        alto: 'C4 D4 E4 C4 E4 D4...',
        tenor: 'G3 A3 B3 G3 B3 A3...',
        bass: 'C3 D3 E3 C3 E3 D3...'
      }
    },
    lyrics: [
      { line: 1, text: '奇异恩典，何等甘甜' },
      { line: 2, text: '我罪已得赦免' }
    ],
    // 诗班指挥备注
    notes: '注意第二段转调，男高音声部要稳'
  },
  // 更多赞美诗...
]