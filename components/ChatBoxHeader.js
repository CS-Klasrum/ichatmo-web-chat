import { useContext } from "react";
import { ChatAppContext } from "../contexts/ChatApp.context";
import useRoomOnlineCheck from "../utils/useRoomOnlineCheck";
import Image from "next/image";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import styles from "./ChatBoxHeader.module.scss";

export default function ChatBoxHeader() {
  let { userInfo, socket, roomHeader } = useContext(ChatAppContext);
  const [isOnline] = useRoomOnlineCheck(
    userInfo.id,
    roomHeader.members,
    socket
  );

  return (
    <div className={styles["c-chatbox-header"]}>
      <button
        className={`${styles["c-chatbox-header__button"]} ${styles["c-chatbox-header__button--back"]}`}
      >
        <ArrowBackRoundedIcon
          className={styles["c-chatbox-header__button-icon"]}
        />
      </button>
      <div
        className={`${styles["c-chatbox-header__image-wrap"]} ${
          isOnline ? styles["c-chatbox-header__image-wrap--online"] : ""
        }`}
      >
        {roomHeader.image && (
          <Image
            className={styles["c-chatbox-header__image"]}
            src={roomHeader.image}
            alt="user pic"
            layout="fill"
            priority={true}
            //   placeholder="blur"
          />
        )}
      </div>
      <p className={styles["c-chatbox-header__name"]}>{roomHeader.name}</p>
      <button
        className={`${styles["c-chatbox-header__button"]} ${styles["c-chatbox-header__button--align-right"]}`}
      >
        <MenuOpenRoundedIcon
          className={styles["c-chatbox-header__button-icon"]}
        />
      </button>
    </div>
  );
}
