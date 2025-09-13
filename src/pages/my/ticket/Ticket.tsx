import Input from "@/components/input/Input";
import styles from "./Ticket.module.scss";
import { useForm } from "react-hook-form";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import TicketFilter from "./components/ticket-filter/TicketFilter";
import TicketList from "./components/ticket-list/TicketList";
import { useGetUserTickets } from "@/api/generated/이용권/이용권";
import { useSearch } from "@/hooks/useSearch";
import Skeleton from "@/components/skeleton/Skeleton";
import classNames from "classnames";
import { useTicketActiveFilterStore } from "./stores/ticketActiveFilter";

export default function Ticket() {
  const { register, watch } = useForm();
  const filters = [
    "전체",
    "이용전",
    "이용중",
    "환불",
    "양도하기",
    "양도받기",
    "기간만료",
  ];
  const activeFilter = useTicketActiveFilterStore(
    (state) => state.activeFilter
  );
  const setActiveFilter = useTicketActiveFilterStore(
    (state) => state.setActiveFilter
  );
  const filterToCodeMap: { [key: string]: string } = {
    전체: "TOTAL",
    이용전: "STOP",
    이용중: "ING",
    환불: "REFUND",
    양도하기: "ASSIGN_TO",
    양도받기: "ASSIGN_FROM",
    기간만료: "AFTER",
  };
  const { data: ticketsData, isLoading } = useGetUserTickets({
    ticketCode: filterToCodeMap[activeFilter],
  });
  const searchValue = watch("searchValue");
  const { filteredData } = useSearch({
    data: ticketsData?.result,
    searchFields: ["memberName", "ticketId"],
    searchValue,
  });

  const tickets = ticketsData?.result;

  return (
    <div className={styles.container}>
      <PaddingContainer>
        <Input
          inputType="default-search"
          placeholder="회원이름 또는 회원번호를 검색해주세요"
          style={{ height: "4.8rem" }}
          {...register("searchValue")}
        />
      </PaddingContainer>
      <TicketFilter
        filters={filters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <PaddingContainer>
        {isLoading ? (
          <Skeleton
            width={10}
            height={2.2}
            borderRadius={1}
            style={{ marginBottom: "0.9rem" }}
          />
        ) : (
          <div className={styles.ticket_count}>
            <p>전체 </p>
            <p className={styles.ticket_count_value}>{tickets?.length}명</p>
          </div>
        )}
        <div
          className={classNames(styles.scroll_container, {
            [styles.loading_finished]: !isLoading,
          })}
        >
          <TicketList tickets={filteredData} isLoading={isLoading} />
        </div>
      </PaddingContainer>
    </div>
  );
}
