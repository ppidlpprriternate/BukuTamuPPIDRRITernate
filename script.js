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

const canvas = document.getElementById("signature-pad");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", () => (drawing = true));
canvas.addEventListener("mouseup", () => (drawing = false, ctx.beginPath()));
canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

document.getElementById("clear-ttd").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById("formBukuTamu").addEventListener("submit", function(e) {
  const ttdData = canvas.toDataURL(); 
  document.getElementById("ttdData").value = ttdData;
});

  jenisLayanan.addEventListener("change", function () {
    terjadwalPNBP.classList.add("hidden");
    terjadwalNonPNBP.classList.add("hidden");

    if (this.value === "pnbp") {
      terjadwalPNBP.classList.remove("hidden");
    } else if (this.value === "non-pnbp") {
      terjadwalNonPNBP.classList.remove("hidden");
    }
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

