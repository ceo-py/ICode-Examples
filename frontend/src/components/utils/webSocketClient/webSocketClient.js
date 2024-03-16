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
    console.log("WebSocket connection closed. Attempting to reconnect...");
    setTimeout(connectWebSocket, 5000);
  };

  client.onmessage = (m) => {
    // const message = m.data;
    const [command, type] = m.data.split(" ");
    console.log(m.data);

    if (!refetchHandler.hasOwnProperty(command)) return;
    refetchHandler[command]();
    if (isValidType(type)) {
      refetchHandler.CommentList();
    }
  };
};
const closeWebSocket = () => {
  if (client) {
    client.close();
    client = null;
  }
};
export { connectWebSocket, refetchHandler, client };
