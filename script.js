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

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formBukuTamu");
  const canvas = document.getElementById("signature-pad");
  const ctx = canvas.getContext("2d");
  let drawing = false;

  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";

  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  });

  canvas.addEventListener("mouseup", () => {
    drawing = false;
  });

  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
  });

  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctx.stroke();
  });

  canvas.addEventListener("touchend", (e) => {
    e.preventDefault();
    drawing = false;
  });
  document.getElementById("clear-ttd").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
  form.addEventListener("submit", function (e) {
    const ttdData = canvas.toDataURL();
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







