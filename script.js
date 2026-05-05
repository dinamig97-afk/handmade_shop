const defaultHero = 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=85';

const defaultProducts = [
  {
    id: 1,
    name: 'Kytice z bonbonů',
    desc: 'Sladká kytice jako originální dárek.',
    price: 'od 500 Kč',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 2,
    name: 'Kytice ze stuh',
    desc: 'Elegantní dekorace z jemných stuh.',
    price: 'od 600 Kč',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 3,
    name: 'Hrnky / Lahve',
    desc: 'Personalizované hrnky a lahve s textem.',
    price: 'od 250 Kč',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 4,
    name: 'Přání',
    desc: 'Originální kartičky a přání na míru.',
    price: 'od 50 Kč',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 5,
    name: 'Mini boxy',
    desc: 'Malé dárkové boxy pro radost.',
    price: 'od 200 Kč',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 6,
    name: 'Dárkové sety',
    desc: 'Kombinace produktů podle Vašeho přání.',
    price: 'od 500 Kč',
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 7,
    name: 'Kabelky z korálků',
    desc: 'Již brzy v nabídce.',
    price: 'coming soon',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 8,
    name: 'Kabelky z příze',
    desc: 'Již brzy v nabídce.',
    price: 'coming soon',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85'
  }
];

let products = JSON.parse(localStorage.getItem('velmiraProducts')) || defaultProducts;
let heroImage = localStorage.getItem('velmiraHero') || defaultHero;

const productGrid = document.getElementById('productGrid');
const adminPanel = document.getElementById('adminPanel');
const adminList = document.getElementById('adminList');
const heroImg = document.getElementById('heroImage');
const heroInput = document.getElementById('heroInput');

function saveProducts() {
  localStorage.setItem('velmiraProducts', JSON.stringify(products));
}

function renderProducts() {
  productGrid.innerHTML = products.map(product => `
    <article class="card">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=700&q=85'">
      <div class="card-body">
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="price">${product.price}</div>
        <button onclick="alert('Objednávka: ${product.name}')">Zobrazit</button>
      </div>
    </article>
  `).join('');
}

function renderAdminList() {
  adminList.innerHTML = products.map(product => `
    <div class="admin-item">
      <strong>${product.name}</strong>
      <small>${product.price}</small><br>
      <button onclick="editProduct(${product.id})">Edit</button>
      <button onclick="deleteProduct(${product.id})">Delete</button>
    </div>
  `).join('');
}

function openAdmin() {
  adminPanel.classList.add('open');
  renderAdminList();
}

function closeAdmin() {
  adminPanel.classList.remove('open');
}

function editProduct(id) {
  const product = products.find(item => item.id === id);
  document.getElementById('productId').value = product.id;
  document.getElementById('nameInput').value = product.name;
  document.getElementById('descInput').value = product.desc;
  document.getElementById('priceInput').value = product.price;
  document.getElementById('imageInput').value = product.image;
}

function deleteProduct(id) {
  products = products.filter(item => item.id !== id);
  saveProducts();
  renderProducts();
  renderAdminList();
}

function clearForm() {
  document.getElementById('productForm').reset();
  document.getElementById('productId').value = '';
}

document.getElementById('adminOpen').addEventListener('click', openAdmin);
document.getElementById('adminClose').addEventListener('click', closeAdmin);
document.getElementById('clearForm').addEventListener('click', clearForm);

heroImg.src = heroImage;
heroInput.value = heroImage;

document.getElementById('saveHero').addEventListener('click', () => {
  heroImage = heroInput.value.trim() || defaultHero;
  localStorage.setItem('velmiraHero', heroImage);
  heroImg.src = heroImage;
});

document.getElementById('productForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const id = document.getElementById('productId').value;
  const productData = {
    id: id ? Number(id) : Date.now(),
    name: document.getElementById('nameInput').value.trim(),
    desc: document.getElementById('descInput').value.trim(),
    price: document.getElementById('priceInput').value.trim(),
    image: document.getElementById('imageInput').value.trim()
  };

  if (id) {
    products = products.map(item => item.id === Number(id) ? productData : item);
  } else {
    products.push(productData);
  }

  saveProducts();
  renderProducts();
  renderAdminList();
  clearForm();
});

document.getElementById('resetData').addEventListener('click', () => {
  localStorage.removeItem('velmiraProducts');
  localStorage.removeItem('velmiraHero');
  products = [...defaultProducts];
  heroImage = defaultHero;
  heroImg.src = heroImage;
  heroInput.value = heroImage;
  saveProducts();
  renderProducts();
  renderAdminList();
});

renderProducts();
