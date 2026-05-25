
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
let current = 1;
        const total = 3;
        
        document.getElementById("next").addEventListener("click", function (){
            if (current === 1){
                document.getElementById("slide1").classList.remove("active");
                document.getElementById("slide2").classList.add("active");
                current = 2;
            } else if (current === 2) {
                document.getElementById("slide2").classList.remove("active");
                document.getElementById("slide3").classList.add("active");
                current = 3;
            }else  {
                document.getElementById("slide3").classList.remove("active");
                document.getElementById("slide3").classList.add("active");
                current = 1;
            }
        });

        document.getElementById("prev").addEventListener("click", function (){
            if(current === 1){
                document.getElementById("slide1").classList.remove("active");
                document.getElementById("slide3").classList.add("active");
                current = 3;
            } else if (current === 2) {
                document.getElementById("slide2").classList.remove("active");
                document.getElementById("slide1").classList.add("active");
                current = 1;
            } else {
                document.getElementById("slide3").classList.remove("active");
                document.getElementById("slide2").classList.add("active");
                current = 2;
            }
        })

       
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide-bg');
        const dots = document.querySelectorAll('.dot');
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            let newIndex = currentSlide + 1;
            if (newIndex >= totalSlides) {
                newIndex = 0;
            }
            showSlide(newIndex);
        }

        function prevSlide() {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) {
                newIndex = totalSlides - 1;
            }
            showSlide(newIndex);
        }

        document.getElementById('next-bg').addEventListener('click', nextSlide);
        document.getElementById('prev-bg').addEventListener('click', prevSlide);


        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        let autoSlide = setInterval(nextSlide, 2000);

        const heroSection = document.querySelector('.hero');
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });
        heroSection.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, 5000);
        });

        function scrollToProduk() {
            const produkSection = document.getElementById('produk');
            produkSection.scrollIntoView({ behavior: 'smooth' });
        }

        const imageUrls = [
            'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&h=1080&fit=crop', 
            'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=1080&fit=crop', 
            'https://images.unsplash.com/photo-1581092335871-44c9e1e67db1?w=1920&h=1080&fit=crop' 
        ];

        slides.forEach((slide, index) => {
            if (imageUrls[index]) {
                slide.style.backgroundImage = `url('${imageUrls[index]}')`;
            }
        });


document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navMenu.classList.toggle('open');
            document.body.classList.toggle('nav-open', !expanded);
        });


        navMenu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-open');
            });
        });
    }


    window.updateCartCount = (n) => {
        const el = document.getElementById('cart-count');
        if (!el) return;
        el.textContent = Number(n || 0);
    };
});

document.querySelector('.close-modal').onclick = tutupModal;
