let client;
const connectWebSocket = (refetchComment, refetch, refetchFollow) => {
  client = new WebSocket("ws://localhost:5001");
  if (!client) return;
  console.log(refetch);
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
    const message = m.data;
    console.log(message);
    if (message.includes("Comment")) refetchComment();
    if (message.includes("Report")) refetch();
    if (message.includes("Follow")) refetchFollow();
  };
};
const closeWebSocket = () => {
  if (client) {
    client.close();
    client = null;
  }
};
export { connectWebSocket, closeWebSocket, client };
