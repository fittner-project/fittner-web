/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Fittner API
 * Fittner API with Spring Boot
 * OpenAPI spec version: 1.0.0
 */
import type { AssignInfo } from './assignInfo';
import type { MemberInfo } from './memberInfo';
import type { RefundInfo } from './refundInfo';
import type { TicketInfo } from './ticketInfo';

/**
 * 응답 데이터
 */
export interface TicketDetailResDto {
  assignInfo?: AssignInfo;
  memberInfo?: MemberInfo;
  refundInfo?: RefundInfo;
  ticketInfo?: TicketInfo;
}
