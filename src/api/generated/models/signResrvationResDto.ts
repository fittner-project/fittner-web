/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Fittner API
 * Fittner API with Spring Boot
 * OpenAPI spec version: 1.0.0
 */
import type { SignResrvationDto } from './signResrvationDto';

/**
 * 응답 데이터
 */
export interface SignResrvationResDto {
  /** 예약 데이터 */
  reservationList?: SignResrvationDto[];
  /** 예약 총갯수 */
  reservationTotalCnt?: string;
}
