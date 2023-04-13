// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("Message received in content_script.js:", message);
//   if (message.type === "createPDF") {
//     const options = message.options;

//     const scriptUrl = chrome.runtime.getURL("html2pdf.bundle.min.js");
//     const existingScript = document.querySelector(`script[src='${scriptUrl}']`);

//     if (existingScript) {
//       createPDF(options, sendResponse);
//     } else {
//       const script = document.createElement("script");
//       script.src = scriptUrl;
//       script.onload = () => {
//         createPDF(options, sendResponse);
//       };
//       document.head.appendChild(script);
//     }

//     return true;
//   }
// });

// function createPDF(options, sendResponse) {
//   html2pdf()
//     .from(document.body)
//     .set(options)
//     .output("datauristring")
//     .then((pdfDataUri) => {
//       console.log("pdfDataUri generated", pdfDataUri);
//       sendResponse({ pdfDataUri });
//       return true;
//     });
// }




// chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
//   console.log("Message received in content_script.js:", message);
//   if (message.type === "createPDF") {
//     const options = message.options;

//     await loadScript("html2pdf.bundle.min.js");

//     createPDF(options, sendResponse);
//   }
//   return true;
// });

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log("Message received in content_script.js:", message);
  if (message.type === "createPDF") {
    const options = message.options;

    loadScript("html2pdf.bundle.min.js").then(() => {
      return createPDF(options);
    })
    .then((pdfDataUri) => {
      console.log("pdfDataUri generated");
      return { pdfDataUri };
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
      return { error };
    });
  }
  return new Promise((resolve) => { sendResponse = resolve; });
});


async function loadScript(url) {
  return new Promise((resolve) => {
    const scriptUrl = chrome.runtime.getURL(url);
    const existingScript = document.querySelector(`script[src='${scriptUrl}']`);

    if (existingScript) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.onload = () => {
        resolve();
      };
      document.head.appendChild(script);
    }
  });
}

function createPDF(options, sendResponse) {
  html2pdf()
    .from(document.body)
    .set(options)
    .output("datauristring")
    .then((pdfDataUri) => {
      console.log("pdfDataUri generated");
      sendResponse({ pdfDataUri });
      return true;
    });
}
