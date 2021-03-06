import styles from "./Chat.module.scss";
import Image from "next/image";

export default function Chat(props) {
  const timestamp = new Date(props.createdAt);
  return (
    <li
      className={`${styles["c-chat"]} ${
        props.isFromUser ? styles["c-chat--user"] : ""
      } ${props.consecutive ? styles["c-chat--consecutive"] : ""}`}
    >
      {!props.isFromUser && (
        <div className={styles["c-chat__image-wrap"]}>
          {!props.consecutive ? (
            <Image
              className={styles["c-chat__image"]}
              src={props.userPic}
              alt="user pic"
              layout="fill"
              priority={true}
              // width={36}
              // height={36}
            />
          ) : (
            <div className={styles["c-chat__spacer"]}></div>
          )}
        </div>
      )}
      <div
        className={`${styles["c-chat__body-wrap"]} ${
          props.isFromUser ? styles["c-chat__body-wrap--user"] : ""
        }`}
      >
        <p>{props.body}</p>
      </div>
      <div
        className={`${styles["c-chat__timestamp-wrap"]} ${
          props.isFromUser ? styles["c-chat__timestamp-wrap--right"] : ""
        }`}
      >
        <p className={styles["c-chat__timestamp"]}>
          {props.createdAt && timestamp.toLocaleDateString()}
        </p>
        <p className={styles["c-chat__timestamp"]}>
          {props.createdAt && timestamp.toLocaleTimeString()}
        </p>
      </div>
    </li>
  );
}
