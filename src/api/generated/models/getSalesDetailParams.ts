/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Fittner API
 * Fittner API with Spring Boot
 * OpenAPI spec version: 1.0.0
 */
import type { FittnerPageable } from './fittnerPageable';

export type GetSalesDetailParams = {
/**
 * 예약시작월
 */
reservationStartMonth: string;
/**
 * 티켓ID
 */
ticketId: string;
pageable: FittnerPageable;
};