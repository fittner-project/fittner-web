/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Fittner API
 * Fittner API with Spring Boot
 * OpenAPI spec version: 1.0.0
 */
import type { ApiResponseMessageListMemberDetailResDtoError } from './apiResponseMessageListMemberDetailResDtoError';
import type { MemberDetailResDto } from './memberDetailResDto';

export interface ApiResponseMessageListMemberDetailResDto {
  error?: ApiResponseMessageListMemberDetailResDtoError;
  /** 오류 코드 */
  errorCode?: string;
  /** 오류 메시지 */
  errorMessage?: string;
  /** 응답 메시지 */
  message?: string;
  /** 응답 데이터 */
  result?: MemberDetailResDto[];
  /** 응답 코드 */
  status?: string;
}