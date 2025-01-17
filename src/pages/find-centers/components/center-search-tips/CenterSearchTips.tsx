import styles from "./CenterSearchTips.module.scss";

function CenterSearchTips() {
  const tips = [
    {
      title: "센터명",
      content: "아워피트니스",
    },
    {
      title: "센터 주소",
      content: "서울특별시 관악구 신림동 111-22",
    },
    {
      title: "센터명 + 센터 주소",
      content: "아워피트니스 방배점",
    },
  ];

  return (
    <div className={styles.container}>
      <p className={styles.title}>이렇게 검색해보세요!</p>
      <div className={styles.tips}>
        {tips.map((tip) => (
          <div key={tip.title} className={styles.tip}>
            <p className={styles.tip_title}>{tip.title}</p>
            <p className={styles.tip_content}>{tip.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CenterSearchTips;
