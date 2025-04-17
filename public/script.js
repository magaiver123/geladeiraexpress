document.querySelectorAll('.product').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = form.dataset.title;
      const price = form.dataset.price;
  
      const res = await fetch('/create_payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, price })
      });
  
      const data = await res.json();
      const qr = document.getElementById('qrcode');
      qr.innerHTML = `<h2>Escaneie o QR Code</h2><img src="data:image/png;base64,${data.qr_base64}" alt="QR Pix" />`;
    });
  });
  