import { SignResrvationDto } from "@/api/generated/models";
import styles from "./SignatureReservationList.module.scss";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import SignatureReservationCard from "./signature-reservation-card/SignatureReservationCard";
import Skeleton from "@/components/skeleton/Skeleton";

interface SignatureReservationListProps {
  signatureReservations: SignResrvationDto[] | undefined;
  isLoading: boolean;
}

export default function SignatureReservationList({
  signatureReservations,
  isLoading,
}: SignatureReservationListProps) {
  return (
    <PaddingContainer>
      <div className={styles.container}>
        <div className={styles.count}>
          {isLoading ? (
            <Skeleton width={10} height={2.2} borderRadius={1} />
          ) : (
            <>
              <p>수업목록</p>
              <p>{signatureReservations?.length}건</p>
            </>
          )}
        </div>
        <div className={styles.scroll_container}>
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <SignatureReservationCardSkeleton key={index} />
              ))
            : signatureReservations?.map((signatureReservation) => (
                <SignatureReservationCard
                  key={signatureReservation.reservationId}
                  signatureReservation={signatureReservation}
                />
              ))}
        </div>
      </div>
    </PaddingContainer>
  );
}

function SignatureReservationCardSkeleton() {
  return (
    <Skeleton
      width="100%"
      style={{ minHeight: "7.7rem", padding: "1.2rem 1.5rem" }}
      borderRadius={1}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "1.2rem" }}>
          <Skeleton
            width={1}
            height={5.3}
            borderRadius={1}
            backgroundColor="skeleton_2"
          />

          <div>
            <Skeleton
              width={15}
              height={2.2}
              borderRadius={1}
              backgroundColor="skeleton_2"
            />
            <Skeleton
              width={15}
              height={2.2}
              borderRadius={1}
              backgroundColor="skeleton_2"
              style={{ marginTop: "0.7rem" }}
            />
          </div>
        </div>
        <Skeleton
          width={2.5}
          height={2.5}
          borderRadius={100}
          backgroundColor="skeleton_2"
        />
      </div>
    </Skeleton>
  );
}
