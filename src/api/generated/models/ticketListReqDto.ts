/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Fittner API
 * Fittner API with Spring Boot
 * OpenAPI spec version: 1.0.0
 */

export interface TicketListReqDto {
  /**
   * 티켓상태
   * @pattern TOTAL|ING|STOP|ASSIGN_TO|ASSIGN_FROM|REFUND|BEFORE|AFTER
   */
  ticketStatus: string;
}