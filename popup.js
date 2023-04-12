document.getElementById('downloadPDF').addEventListener('click', async () => {
  console.log('Creating PDF...'); // Add this line
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['html2pdf.bundle.min.js'] });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: function() { // Replace 'code' with 'function'
      const pdfOptions = {
        margin: 0,
        filename: document.title + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: false },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait', compress: true }
      };

      html2pdf().set(pdfOptions).from(document.body).save().then(() => {
        window.close();
      });
    }
  });

  window.close();
});

// Send a message to the background script
chrome.runtime.sendMessage({ type: 'exampleMessage', data: 'Hello, background script!' }, response => {
  console.log('Response from background script:', response.data);
});

