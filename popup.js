// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === "pdfDataUri") {
//     console.log("pdfDataUri message received");
//     const pdfDataUri = request.data;
//     const pdfBlob = dataURItoBlob(pdfDataUri);
//     const pdfFileName = request.title + ".pdf";
//     saveBlobAsFile(pdfBlob, pdfFileName);
//     window.close();
//   }
// });

// async function saveAsPDF() {
//   console.log("Creating PDF...");
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   await chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     files: ["html2pdf.bundle.min.js"],
//   });

//   const pdfOptions = {
//     margin: 0,
//     filename: document.title + ".pdf",
//     image: { type: "jpeg", quality: 0.98 },
//     html2canvas: { scale: 2, logging: false },
//     jsPDF: {
//       unit: "in",
//       format: "letter",
//       orientation: "portrait",
//       compress: true,
//     },
//   };

//   chrome.tabs.sendMessage(
//     tab.id,
//     {
//       type: "createPDF",
//       options: pdfOptions,
//     },
//     (response) => {
//       if (chrome.runtime.lastError) {
//         console.error(chrome.runtime.lastError.message);
//       } else {
//         console.log("pdfDataUri message sent");
//       }
//     }
//   );
// }

// document.getElementById("downloadPDF").addEventListener("click", saveAsPDF);



async function saveAsPDF() {
  console.log("Creating PDF...");
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const pdfOptions = {
    margin: 0,
    filename: document.title + ".pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, logging: false },
    jsPDF: {
      unit: "in",
      format: "letter",
      orientation: "portrait",
      compress: true,
    },
  };

  // chrome.tabs.sendMessage(
  //   tab.id,
  //   {
  //     type: "createPDF",
  //     options: pdfOptions,
  //   },
  //   (response) => {
  //     if (chrome.runtime.lastError) {
  //       console.error(chrome.runtime.lastError.message);
  //     } else {
  //       console.log("pdfDataUri message sent");
  //     }
  //   }
  // );


  chrome.tabs.sendMessage(
    tab.id,
    {
      type: "createPDF",
      options: pdfOptions,
    },
    (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        console.log("pdfDataUri message received");
        const link = document.createElement("a");
        link.href = response.pdfDataUri;
        link.download = pdfOptions.filename;
        link.click();
      }
    }
  );


}

document.getElementById("downloadPDF").addEventListener("click", saveAsPDF);
