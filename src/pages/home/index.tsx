import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import dockerLogo from "@/assets/Docker.svg";
import { button } from "@/assets/motion";
import reactLogo from "@/assets/react.svg";
import { useUserStore } from "@/store/user";

import HomeStyle from "./index.module.scss";
import { useLogin } from "@/api/generated/auth-controller/auth-controller";

const publicPath = import.meta.env.VITE_PUBLIC_PATH;
function Home() {
  const { num, changeNum } = useUserStore();
  const navigate = useNavigate();
  const goAboutPage = () => {
    navigate("/about");
  };
  const { mutate: login } = useLogin({
    mutation: {
      onSuccess: (data) => {
        console.log(data);
      },
    },
  });

  // useEffect(() => {
  //   login({
  //     data: {
  //       trainerEmail: "test@test.com",
  //     },
  //   });
  // }, []);

  return (
    <div className={HomeStyle.home}>
      <motion.div
        initial={{ translateY: -300 }}
        whileInView={{ translateY: 0 }}
        transition={{ type: "spring" }}
      >
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} alt="React logo" />
        </a>
        <a href="https://forums.docker.com/" target="_blank" rel="noreferrer">
          <img src={dockerLogo} className={HomeStyle.logo} alt="Docker logo" />
        </a>
      </motion.div>
      <motion.div
        initial={{ translateY: 300 }}
        whileInView={{ translateY: 0 }}
        transition={{ type: "spring" }}
      >
        <h1>Vite + React</h1>
        <div className={HomeStyle.card}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <motion.button {...button} onClick={changeNum}>
            UserStore&apos;s count is {num}
          </motion.button>
          <p>안</p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <motion.button {...button} onClick={goAboutPage}>
          click to jump to the about page
        </motion.button>
        <br />
        <motion.button style={{ marginTop: "80px" }}>welcome</motion.button>
      </motion.div>
    </div>
  );
}

export default Home;
