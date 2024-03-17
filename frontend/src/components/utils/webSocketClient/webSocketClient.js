let client;
const refetchHandler = {};

const validTypes = ["created", "deleted", "edited"];

const isValidType = (type) => {
  return validTypes.includes(type);
};
const connectWebSocket = () => {
  client = new WebSocket("ws://localhost:5001");
  if (!client) return;

  // client.onopen = () => {
  //   console.log("WebSocket Client Connected");
  // };

  // client.onerror = (error) => {
  //   console.error("WebSocket Error:", error);
  // };

  client.onclose = () => {
    // console.log("WebSocket connection closed. Attempting to reconnect...");
    setTimeout(connectWebSocket, 5000);
  };

  client.onmessage = (m) => {
    const [command, type] = m.data.split(" ");
    // console.log(command);

    if (!refetchHandler.hasOwnProperty(command)) return;

    if (command === "Comment" && isValidType(type)) {
      refetchHandler.CommentList();
    }

    refetchHandler[command]();
  };
};
const closeWebSocket = () => {
  if (client) {
    client.close();
    client = null;
  }
};
export { connectWebSocket, refetchHandler, client };
