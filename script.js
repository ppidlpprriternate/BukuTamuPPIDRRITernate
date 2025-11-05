document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formBukuTamu");
  const tujuanSelect = document.getElementById("Tujuan");
  const bagianTerjadwal = document.getElementById("bagian-terjadwal");
  const bagianTidakTerjadwal = document.getElementById("bagian-tidakterjadwal");
  const jenisLayanan = document.getElementById("jenisLayananTerjadwal");
  const terjadwalPNBP = document.getElementById("terjadwal-pnbp");
  const terjadwalNonPNBP = document.getElementById("terjadwal-nonpnbp");

  function sembunyikanSemua() {
    bagianTerjadwal.classList.add("hidden");
    bagianTidakTerjadwal.classList.add("hidden");
    terjadwalPNBP.classList.add("hidden");
    terjadwalNonPNBP.classList.add("hidden");
  }

  tujuanSelect.addEventListener("change", function () {
    sembunyikanSemua();

    if (this.value === "terjadwal") {
      bagianTerjadwal.classList.remove("hidden");
    } else if (this.value === "tidak terjadwal") {
      bagianTidakTerjadwal.classList.remove("hidden");
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("signature-pad");
  const clearBtn = document.getElementById("clear-ttd");
  const form = document.getElementById("formBukuTamu");

  if (!canvas || !form) return; 

  const ctx = canvas.getContext("2d");
  let drawing = false;
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const temp = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.putImageData(temp, 0, 0);
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function drawLine(x, y) {
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  canvas.addEventListener("mousedown", e => {
    drawing = true;
    drawLine(e.offsetX, e.offsetY);
  });

  canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();
  });

  canvas.addEventListener("mousemove", e => {
    if (drawing) drawLine(e.offsetX, e.offsetY);
  });

  canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    drawing = true;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    drawLine(touch.clientX - rect.left, touch.clientY - rect.top);
  });

  canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    drawLine(touch.clientX - rect.left, touch.clientY - rect.top);
  });

  canvas.addEventListener("touchend", () => {
    drawing = false;
    ctx.beginPath();
  });

  clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  form.addEventListener("submit", e => {
    const ttdData = canvas.toDataURL("image/png");
    document.getElementById("ttdData").value = ttdData;
  });
});

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("https://script.google.com/macros/s/AKfycbwoDjQ6Af4ob0N6W9HRctMRpt2ym6DXChxnGSg6yABA9vRHtW3KaKCBzoQh64fUSsvq/exec", {
      method: "POST",
      body: formData
    })
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.text();
      })
      .then(() => {
        alert("Data berhasil dikirim!");
        form.reset();
        sembunyikanSemua();
      })
      .catch(err => {
        alert("Gagal kirim: " + err.message);
      });
  });
});






