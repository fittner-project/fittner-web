/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Fittner API
 * Fittner API with Spring Boot
 * OpenAPI spec version: 1.0.0
 */

export interface PaginationInfo {
  /** 현재 페이지 번호 */
  currentPageNo?: number;
  /** 빈 페이지 여부 */
  empty?: boolean;
  /** 마지막 페이지 여부 */
  endPage?: boolean;
  /** 시작 페이지 번호 */
  firstPage?: number;
  /** 마지막 페이지 번호 */
  lastPage?: number;
  /** 페이지 수 */
  pageSize?: number;
  /** 페이지 당 레코드 수 */
  recordsPerPage?: number;
  /** 시작 페이지 여부 */
  startPage?: boolean;
  /** 전체 페이지 수 */
  totalPageCount?: number;
  /** 전체 레코드 수 */
  totalRecordCount?: number;
}
