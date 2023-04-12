async function saveAsPDF() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['html2pdf.bundle.min.js'] });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'pdfDataUri') {
      const pdfDataUri = request.data;
      const pdfBlob = dataURItoBlob(pdfDataUri);
      const pdfFileName = request.title + '.pdf';
      saveBlobAsFile(pdfBlob, pdfFileName);
      window.close();
    }
  });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content_script.js']
  });

  window.close();
}
