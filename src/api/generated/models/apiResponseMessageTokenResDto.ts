/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Fittner API
 * Fittner API with Spring Boot
 * OpenAPI spec version: 1.0.0
 */
import type { ApiResponseMessageTokenResDtoError } from './apiResponseMessageTokenResDtoError';
import type { TokenResDto } from './tokenResDto';

export interface ApiResponseMessageTokenResDto {
  error?: ApiResponseMessageTokenResDtoError;
  /** 오류 코드 */
  errorCode?: string;
  /** 오류 메시지 */
  errorMessage?: string;
  /** 응답 메시지 */
  message?: string;
  result?: TokenResDto;
  /** 응답 코드 */
  status?: string;
}