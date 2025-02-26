export const infiniteQueryKeys = {
  NOTICES: () => ["notices"],
  REVENUE_TRAINEE_ALL: (activeDate: string) => [
    "revenue_trainee_all",
    activeDate,
  ],
  REVENUE_TRAINEE_DETAIL: (activeFilter: string) => [
    "revenue_trainee_detail",
    activeFilter,
  ],
  SIGNATURE_RESERVATION: (activeDate: string) => [
    "signature_reservation",
    activeDate,
  ],
  SIGNATURE_RESERVATION_DETAIL: (ticketId: string) => [
    "signature_reservation_detail",
    ticketId,
  ],
};
