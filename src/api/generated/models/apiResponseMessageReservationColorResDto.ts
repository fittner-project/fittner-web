/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Fittner API
 * Fittner API with Spring Boot
 * OpenAPI spec version: 1.0.0
 */
import type { ApiResponseMessageReservationColorResDtoError } from './apiResponseMessageReservationColorResDtoError';
import type { ReservationColorResDto } from './reservationColorResDto';

export interface ApiResponseMessageReservationColorResDto {
  error?: ApiResponseMessageReservationColorResDtoError;
  /** 오류 코드 */
  errorCode?: string;
  /** 오류 메시지 */
  errorMessage?: string;
  /** 응답 메시지 */
  message?: string;
  result?: ReservationColorResDto;
  /** 응답 코드 */
  status?: string;
}
