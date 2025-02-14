export const infiniteQueryKeys = {
  NOTICES: () => ["notices"],
  REVENUE_TRAINEE_ALL: (activeDate: string) => [
    "revenue_trainee_all",
    activeDate,
  ],
};
