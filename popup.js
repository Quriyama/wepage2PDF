document.getElementById('downloadPDF').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    chrome.tabs.executeScript(tab.id, { file: 'jspdf.min.js' }, () => {
      chrome.tabs.executeScript(tab.id, { file: 'html2pdf.js' }, () => {
        chrome.tabs.executeScript(
          tab.id,
          {
            code: `
              (() => {
                const pdfOptions = {
                  margin: 0,
                  filename: document.title + '.pdf',
                  image: { type: 'jpeg', quality: 0.98 },
                  html2canvas: { scale: 2, logging: false },
                  jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait', compress: true }
                };

                html2pdf().
                html2pdf().set(pdfOptions).from(document.body).save().then(() => {
                  window.close();
                });
              })();
            `,
          },
          () => {
            window.close();
          }
        );
      });
    });
  });
});
