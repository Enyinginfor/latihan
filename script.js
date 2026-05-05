// Data produk sederhana
const produk = [
    {
        id: 1,
        nama: "Semen Tiga roda",
        harga: 65000,
        gambar: "image.jpeg"
    },
    {
        id: 2,
        nama: "Bata Merah Standar",
        harga: 1200,
        gambar: "bata.jpeg"
    },
    {
        id: 3,
        nama: "Cat Dulux 2.5L",
        harga: 285000,
        gambar: "catdulux.jpeg"
    },
    {
        id: 4,
        nama: "Paku Beton 10mm",
        harga: 3500,
        gambar: "pakubeton.jpeg"
    },
    {
        id: 5,
        nama: "Pipa PVC 4 inch",
        harga: 45000,
        gambar: "Pipa4inch.jpeg"
    },
    {
        id: 6,
        nama: "Kabel Listrik 2x2.5",
        harga: 12500,
        gambar: "image2.jpeg"
    }
];

let keranjang = [];

function tampilkanProduk() {
    const container = document.getElementById('produk-list');
    container.innerHTML = '';
    
    produk.forEach(item => {
        const card = document.createElement('div');
        card.className = 'produk-card';
        card.innerHTML = `
            <img src="${item.gambar}" alt="${item.nama}">
            <div class="produk-info">
                <h3>${item.nama}</h3>
                <div class="produk-harga">Rp ${item.harga.toLocaleString()}</div>
                <button class="tambah-keranjang" onclick="tambahKeranjang(${item.id})">
                    Tambah ke Keranjang
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}


function tambahKeranjang(id) {
    const item = produk.find(p => p.id === id);
    keranjang.push(item);
    updateKeranjang();
    alert('Ditambahkan ke keranjang!');
}


function updateKeranjang() {
    document.getElementById('cart-count').textContent = keranjang.length;
}


function scrollToProduk() {
    document.getElementById('produk').scrollIntoView({ 
        behavior: 'smooth' 
    });
}


document.addEventListener('DOMContentLoaded', function() {
    tampilkanProduk();
    updateKeranjang();
});


function tampilkanProduk() {
    const container = document.getElementById('produk-list');
    container.innerHTML = '';
    
    produk.forEach(item => {
        const card = document.createElement('div');
        card.className = 'produk-card';
        card.innerHTML = `
            <img src="${item.gambar}" alt="${item.nama}" onclick="bukaModal(${item.id})" style="cursor: pointer;">
            <div class="produk-info">
                <h3>${item.nama}</h3>
                <div class="produk-harga">💰 Rp ${item.harga.toLocaleString()} / unit</div>
                <button class="tambah-keranjang" onclick="bukaModal(${item.id})">
                    Klik Tombol Ini atau gambar untuk memesan
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}


function bukaModal(id) {
    const item = produk.find(p => p.id === id);
    const modal = document.getElementById('produkModal');
    const modalImg = document.getElementById('modal-img');
    const modalNama = document.getElementById('modal-nama');
    const modalHarga = document.getElementById('modal-harga');
    

    modalImg.src = item.gambar;
    modalNama.textContent = item.nama;
    modalHarga.textContent = `💰 Rp ${item.harga.toLocaleString()} / unit`;
    

    document.getElementById('jumlah-input').value = 1;
    document.getElementById('satuan-select').value = 'kg';
    

    modal.style.display = 'block';
    

    document.getElementById('pesan-btn').onclick = () => pesanProduk(id);
}


function pesanProduk(id) {
    const item = produk.find(p => p.id === id);
    const jumlah = parseInt(document.getElementById('jumlah-input').value);
    const satuan = document.getElementById('satuan-select').value;
    
    if (jumlah < 1) {
        alert('Minimal 1 ' + satuan.toUpperCase());
        return;
    }
    
  
    keranjang.push({
        ...item,
        jumlah: jumlah,
        satuan: satuan,
        total: item.harga * jumlah
    });
    
    updateKeranjang();
    tutupModal();
    

    const notif = document.createElement('div');
    notif.innerHTML = `✅ ${jumlah} ${satuan} <strong>${item.nama}</strong><br>Total: Rp ${(item.harga*jumlah).toLocaleString()}`;
    notif.style.cssText = `
        position: fixed; top: 100px; right: 20px; 
        background: linear-gradient(45deg, #27ae60, #2ecc71);
        color: white; padding: 20px 30px; border-radius: 15px;
        box-shadow: 0 10px 30px rgba(39,174,96,0.4);
        z-index: 2000; font-size: 16px; line-height: 1.4;
        animation: slideIn 0.4s ease; max-width: 300px;
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 4000);
}


function tutupModal() {
    document.getElementById('produkModal').style.display = 'none';
}


window.onclick = function(event) {
    const modal = document.getElementById('produkModal');
    if (event.target == modal) {
        tutupModal();
    }
}


document.querySelector('.close-modal').onclick = tutupModal;