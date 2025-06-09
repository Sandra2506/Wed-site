// Слайдер баннеров
const slides = document.querySelectorAll('.banner-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Автоматическая смена слайдов каждые 5 секунд
setInterval(nextSlide, 5000);


dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});


showSlide(0);

//карточки
const defaultBenefits = [
  { title: 'Преимущество', text: 'Эксклюзивный прайс, особые условия, гибкую бонусную систему' },
  { title: 'Рост', text: 'Поток клиентов, поднимите продажи своих услуг, увеличите доход' },
  { title: 'Качество', text: 'Легитимную продукцию со всеми документами' },
  { title: 'Поддержку', text: 'Юридическую и профессиональную поддержку: ведение клиента с отягощенным анамнезом' },
  { title: 'Базу знаний', text: 'Инвайт на все оффлайн и онлайн-мероприятия: конференции, семинары, вебинары' },
  { title: 'Сопровождение', text: 'Информационное сопровождение для удобной работы: маркетинговые материалы, презентации, каталоги, протоколы' },
];

const benefitsList = document.getElementById('benefits-list');
const form = document.getElementById('benefit-form');
const titleInput = document.getElementById('benefit-title');
const textInput = document.getElementById('benefit-text');

function getStoredBenefits() {
  try {
    return JSON.parse(localStorage.getItem('benefits') || '[]');
  } catch { return []; }
}
function setStoredBenefits(arr) {
  localStorage.setItem('benefits', JSON.stringify(arr));
}
function renderBenefits() {
  const stored = getStoredBenefits();
  const all = [...defaultBenefits, ...stored];
  benefitsList.innerHTML = '';
  all.forEach((b, i) => {
    const card = document.createElement('div');
    card.className = 'benefit-card';
    card.innerHTML = `
      <div class="benefit-number">${i+1}</div>
      <div class="benefit-title">${b.title}</div>
      <div class="benefit-text">${b.text}</div>
    `;
    benefitsList.appendChild(card);
  });
}
renderBenefits();

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;
  [titleInput, textInput].forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#e53935';
      valid = false;
    } else {
      input.style.borderColor = '#ccc';
    }
  });
  if (!valid) return;
  const newBenefit = { title: titleInput.value.trim(), text: textInput.value.trim() };
  const stored = getStoredBenefits();
  stored.push(newBenefit);
  setStoredBenefits(stored);
  renderBenefits();
  form.reset();
});

titleInput.addEventListener('input', () => titleInput.style.borderColor = '#ccc');
textInput.addEventListener('input', () => textInput.style.borderColor = '#ccc');
