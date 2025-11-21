chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('[content] Received message:', msg);

  if (msg.action === "GET_TAB_CONTENT") {
    const title = document.title;
    const text = document.body.innerText || "";

    // console.log('[content] Sending response:', { title, text });
    sendResponse({ title, text });
  }

  return true;
});
