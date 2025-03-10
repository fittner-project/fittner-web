/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Fittner API
 * Fittner API with Spring Boot
 * OpenAPI spec version: 1.0.0
 */
import {
  useInfiniteQuery,
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseInfiniteQueryResult,
  DefinedUseQueryResult,
  InfiniteData,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type {
  ApiResponseMessageListGroupedReservationMemberDto,
  ApiResponseMessageObject,
  ApiResponseMessageReservationColorResDto,
  GetUserReservationsParams,
  ReservationReqDto
} from '.././models'
import { axiosInstance } from '../../mutator/instance-wrapper';



/**
 * 트레이너가 수업을 등록하는 API 입니다.
 * @summary 트레이너가 수업 등록하는 API
 */
export const postUserReservation = (
    reservationReqDto: ReservationReqDto,
 signal?: AbortSignal
) => {
      
      
      return axiosInstance<ApiResponseMessageObject>(
      {url: `/api/v1/user/reservation`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: reservationReqDto, signal
    },
      );
    }
  


export const getPostUserReservationMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postUserReservation>>, TError,{data: ReservationReqDto}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postUserReservation>>, TError,{data: ReservationReqDto}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postUserReservation>>, {data: ReservationReqDto}> = (props) => {
          const {data} = props ?? {};

          return  postUserReservation(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostUserReservationMutationResult = NonNullable<Awaited<ReturnType<typeof postUserReservation>>>
    export type PostUserReservationMutationBody = ReservationReqDto
    export type PostUserReservationMutationError = unknown

    /**
 * @summary 트레이너가 수업 등록하는 API
 */
export const usePostUserReservation = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postUserReservation>>, TError,{data: ReservationReqDto}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof postUserReservation>>,
        TError,
        {data: ReservationReqDto},
        TContext
      > => {

      const mutationOptions = getPostUserReservationMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * 트레이너의 회원 수업 목록 리스트 API 입니다.
 * @summary 트레이너의 회원 수업 목록 리스트 API
 */
export const getUserReservations = (
    params: GetUserReservationsParams,
 signal?: AbortSignal
) => {
      
      
      return axiosInstance<ApiResponseMessageListGroupedReservationMemberDto>(
      {url: `/api/v1/user/reservations`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getGetUserReservationsQueryKey = (params: GetUserReservationsParams,) => {
    return [`/api/v1/user/reservations`, ...(params ? [params]: [])] as const;
    }

    
export const getGetUserReservationsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getUserReservations>>, GetUserReservationsParams['page']>, TError = unknown>(params: GetUserReservationsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserReservations>>, TError, TData, Awaited<ReturnType<typeof getUserReservations>>, QueryKey, GetUserReservationsParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUserReservationsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserReservations>>, QueryKey, GetUserReservationsParams['page']> = ({ signal, pageParam }) => getUserReservations({...params, page: pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserReservations>>, TError, TData, Awaited<ReturnType<typeof getUserReservations>>, QueryKey, GetUserReservationsParams['page']> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetUserReservationsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getUserReservations>>>
export type GetUserReservationsInfiniteQueryError = unknown


export function useGetUserReservationsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getUserReservations>>, GetUserReservationsParams['page']>, TError = unknown>(
 params: GetUserReservationsParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserReservations>>, TError, TData, Awaited<ReturnType<typeof getUserReservations>>, QueryKey, GetUserReservationsParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserReservations>>,
          TError,
          TData, QueryKey
        > , 'initialData'
      >, }

  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserReservationsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getUserReservations>>, GetUserReservationsParams['page']>, TError = unknown>(
 params: GetUserReservationsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserReservations>>, TError, TData, Awaited<ReturnType<typeof getUserReservations>>, QueryKey, GetUserReservationsParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserReservations>>,
          TError,
          TData, QueryKey
        > , 'initialData'
      >, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserReservationsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getUserReservations>>, GetUserReservationsParams['page']>, TError = unknown>(
 params: GetUserReservationsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserReservations>>, TError, TData, Awaited<ReturnType<typeof getUserReservations>>, QueryKey, GetUserReservationsParams['page']>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 트레이너의 회원 수업 목록 리스트 API
 */

export function useGetUserReservationsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getUserReservations>>, GetUserReservationsParams['page']>, TError = unknown>(
 params: GetUserReservationsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserReservations>>, TError, TData, Awaited<ReturnType<typeof getUserReservations>>, QueryKey, GetUserReservationsParams['page']>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetUserReservationsInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetUserReservationsQueryOptions = <TData = Awaited<ReturnType<typeof getUserReservations>>, TError = unknown>(params: GetUserReservationsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserReservations>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUserReservationsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserReservations>>> = ({ signal }) => getUserReservations(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getUserReservations>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetUserReservationsQueryResult = NonNullable<Awaited<ReturnType<typeof getUserReservations>>>
export type GetUserReservationsQueryError = unknown


export function useGetUserReservations<TData = Awaited<ReturnType<typeof getUserReservations>>, TError = unknown>(
 params: GetUserReservationsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserReservations>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserReservations>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserReservations<TData = Awaited<ReturnType<typeof getUserReservations>>, TError = unknown>(
 params: GetUserReservationsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserReservations>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserReservations>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserReservations<TData = Awaited<ReturnType<typeof getUserReservations>>, TError = unknown>(
 params: GetUserReservationsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserReservations>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 트레이너의 회원 수업 목록 리스트 API
 */

export function useGetUserReservations<TData = Awaited<ReturnType<typeof getUserReservations>>, TError = unknown>(
 params: GetUserReservationsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserReservations>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetUserReservationsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * 트레이너가 수업 등록할때 필요한 색상 리스트 API입니다.
 * @summary 트레이너가 수업 등록할때 필요한 색상 리스트 API
 */
export const getUserReservationColors = (
    
 signal?: AbortSignal
) => {
      
      
      return axiosInstance<ApiResponseMessageReservationColorResDto>(
      {url: `/api/v1/user/reservation/colors`, method: 'GET', signal
    },
      );
    }
  

export const getGetUserReservationColorsQueryKey = () => {
    return [`/api/v1/user/reservation/colors`] as const;
    }

    
export const getGetUserReservationColorsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getUserReservationColors>>>, TError = unknown>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserReservationColors>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUserReservationColorsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserReservationColors>>> = ({ signal }) => getUserReservationColors(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserReservationColors>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetUserReservationColorsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getUserReservationColors>>>
export type GetUserReservationColorsInfiniteQueryError = unknown


export function useGetUserReservationColorsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getUserReservationColors>>>, TError = unknown>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserReservationColors>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserReservationColors>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserReservationColorsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getUserReservationColors>>>, TError = unknown>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserReservationColors>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserReservationColors>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserReservationColorsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getUserReservationColors>>>, TError = unknown>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserReservationColors>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 트레이너가 수업 등록할때 필요한 색상 리스트 API
 */

export function useGetUserReservationColorsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getUserReservationColors>>>, TError = unknown>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserReservationColors>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetUserReservationColorsInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetUserReservationColorsQueryOptions = <TData = Awaited<ReturnType<typeof getUserReservationColors>>, TError = unknown>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserReservationColors>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUserReservationColorsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserReservationColors>>> = ({ signal }) => getUserReservationColors(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getUserReservationColors>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetUserReservationColorsQueryResult = NonNullable<Awaited<ReturnType<typeof getUserReservationColors>>>
export type GetUserReservationColorsQueryError = unknown


export function useGetUserReservationColors<TData = Awaited<ReturnType<typeof getUserReservationColors>>, TError = unknown>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserReservationColors>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserReservationColors>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserReservationColors<TData = Awaited<ReturnType<typeof getUserReservationColors>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserReservationColors>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserReservationColors>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserReservationColors<TData = Awaited<ReturnType<typeof getUserReservationColors>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserReservationColors>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 트레이너가 수업 등록할때 필요한 색상 리스트 API
 */

export function useGetUserReservationColors<TData = Awaited<ReturnType<typeof getUserReservationColors>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserReservationColors>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetUserReservationColorsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



