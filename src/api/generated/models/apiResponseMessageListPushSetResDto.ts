/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Fittner API
 * Fittner API with Spring Boot
 * OpenAPI spec version: 1.0.0
 */
import type { ApiResponseMessageListPushSetResDtoError } from './apiResponseMessageListPushSetResDtoError';
import type { PushSetResDto } from './pushSetResDto';

export interface ApiResponseMessageListPushSetResDto {
  error?: ApiResponseMessageListPushSetResDtoError;
  /** 오류 코드 */
  errorCode?: string;
  /** 오류 메시지 */
  errorMessage?: string;
  /** 응답 메시지 */
  message?: string;
  /** 응답 데이터 */
  result?: PushSetResDto[];
  /** 응답 코드 */
  status?: string;
}
