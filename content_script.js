chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "createPDF") {
    const options = message.options;

    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("html2pdf.bundle.min.js");
    script.onload = () => {
      html2pdf()
        .from(document.body)
        .set(options)
        .output("datauristring")
        .then((pdfDataUri) => {
          sendResponse({ pdfDataUri });
        });
    };
    document.head.appendChild(script);
  }
  return true;
});
