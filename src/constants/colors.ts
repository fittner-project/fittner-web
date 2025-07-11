const COLORS = {
  // 무채색 계열
  grey_1: "var(--grey-type-a, #f2f4f6)",
  grey_2: "var(--grey-type-b, #b0b8c1)",
  grey_3: "var(--grey-type-c, #7f848d)",
  grey_4: "var(--grey-type-d, #4d5662)",

  // 브랜드 컬러
  primary_1: "var(--primary-a, #4c6aff)",
  primary_2: "var(--primary-b, #d8e2ff)",
  sub_1: "var(--sub-a, #ff8194)",
  sub_2: "var(--sub-b, #ffe5eb)",

  // 텍스트 컬러
  text_1: "var(--text-type-a, #191f28)",
  text_2: "var(--text-type-b, #ffffff)",
  text_3: "var(--text-type-c, #b0b8c1)",
  text_4: "var(--text-type-d, #7f848d)",
  text_5: "var(--text-type-e, #4d5662)",
  text_6: "var(--text-type-f, #4c6aff)",
  text_7: "var(--text-type-g, #ff8194)",
} as const;

export type ColorKey = keyof typeof COLORS;
export default COLORS;
