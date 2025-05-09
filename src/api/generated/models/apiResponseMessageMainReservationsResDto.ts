/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Fittner API
 * Fittner API with Spring Boot
 * OpenAPI spec version: 1.0.0
 */
import type { ApiResponseMessageMainReservationsResDtoError } from './apiResponseMessageMainReservationsResDtoError';
import type { MainReservationsResDto } from './mainReservationsResDto';

export interface ApiResponseMessageMainReservationsResDto {
  error?: ApiResponseMessageMainReservationsResDtoError;
  /** 오류 코드 */
  errorCode?: string;
  /** 오류 메시지 */
  errorMessage?: string;
  /** 응답 메시지 */
  message?: string;
  result?: MainReservationsResDto;
  /** 응답 코드 */
  status?: string;
}
