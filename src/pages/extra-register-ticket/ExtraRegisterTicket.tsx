import styles from "./ExtraRegisterTicket.module.scss";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";

import Row from "@/components/flex/Row";

import ExtraRegisterTicketFormView from "./components/extra-register-ticket-form-view/ExtraRegisterTicketFormView";

export default function RegisterTrainee() {
  return (
    <PaddingContainer>
      <div className={styles.container}>
        <Row justifyContent="space-between">
          <div className={styles.title}>이용권 추가 등록</div>
        </Row>
        <form className={styles.container}>
          <div className={styles.menu_container}>
            <ExtraRegisterTicketFormView />
          </div>
        </form>
      </div>
    </PaddingContainer>
  );
}
