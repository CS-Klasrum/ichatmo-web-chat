import { useState, useEffect } from "react";

export default function useUserOnlineCheck(client, userId, socket) {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => socketHandler(), [userId]);
  useEffect(() => {
    socket.emit("user-online-check", {
      client,
      toCheckId: userId,
    });
  }, [userId]);

  function socketHandler() {
    const onlineUpdater = (id) => {
      if (userId == id) {
        socket.emit("user-online-check", {
          client,
          toCheckId: userId,
        });
      }
    };

    const onlineToggler = (result) => {
      if (result.toCheckId == userId) {
        setIsOnline(result.isOnline);
      }
    };

    socket.on("user-connect", onlineUpdater);
    socket.on("user-disconnect", onlineUpdater);
    socket.on("user-is-online", onlineToggler);

    return () => {
      socket.off("user-connect", onlineUpdater);
      socket.off("user-disconnect", onlineUpdater);
      socket.off("user-is-online", onlineToggler);
    };
  }

  return [isOnline];
}
