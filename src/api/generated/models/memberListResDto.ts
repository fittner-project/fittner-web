/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Fittner API
 * Fittner API with Spring Boot
 * OpenAPI spec version: 1.0.0
 */
import type { MemberListResDtoMemberGender } from './memberListResDtoMemberGender';

/**
 * 응답 데이터
 */
export interface MemberListResDto {
  /** 회원 나이 */
  memberAge?: string;
  /** 회원 성별 */
  memberGender?: MemberListResDtoMemberGender;
  /** 회원 ID */
  memberId?: string;
  /** 회원 메모 */
  memberMemo?: string;
  /** 회원 이름 */
  memberName?: string;
  /** 회원 전화번호 */
  memberPhone?: string;
  /** 회원 총 수 */
  memberTotalCount?: number;
  /** 예약데이터가 있는지 유무 */
  reservation?: boolean;
}
