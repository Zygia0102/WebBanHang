const filterBtns = document.querySelectorAll('.section__typeitem');
const productcard = document.querySelectorAll('.section__card');

const overlay = document.getElementById('overlay');

let cartItem = JSON.parse(localStorage.getItem('cartItem')) || [];

overlay.addEventListener('click', closeDetail);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const btnType = btn.getAttribute('type');
        filter(btnType);
    })
})

productcard.forEach(p => {
    p.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('section__detail')) {
            p.classList.add('active');
            overlay.style.display = 'block';
        }

        if(target.classList.contains('section__addcart')) {
            const imgSrc = p.querySelector('img').src;
            const name = p .querySelector('.section__name').innerText;
            const price = p .querySelector('.section__price').innerText;
            const newCartItem = {
                imgSrc: imgSrc,
                name: name,
                price: parseInt(price.replace(/\D/g, ''),10),
                quantity: 1
            }

            const existingItem = cartItem.find(
                item => item.name === newCartItem.name
            );
            if (existingItem)
                existingItem.quantity++
            else
                cartItem.unshift(newCartItem);
            
            localStorage.setItem('cartItem', JSON.stringify(cartItem));
            closeDetail();
            alert(` Đã thêm ${newCartItem.name} vào giỏ hàng `)
        } 
        
    })
})

function filter(type) {
    productcard.forEach(p => {
        if (type === 'all') {
            p.style.display = 'flex';
            return;
        }
        const productType = p.getAttribute('type');
        if (productType === type)
            p.style.display = 'flex';
        else
            p.style.display = 'none';
    })
}

function closeDetail() {
    productcard.forEach(p => p.classList.remove('active'));
    overlay.style.display = 'none';
}
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
document.querySelector('.footer-btn').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* login */

const loginModal = document.getElementById('loginModal');
const openLoginModal = document.getElementById('openLoginModal');
const closeLoginModal = loginModal.querySelector('.close');

openLoginModal.addEventListener('click', () => {
  loginModal.style.display = 'block';
});

closeLoginModal.addEventListener('click', () => {
  loginModal.style.display = 'none';
});


const registerModal = document.getElementById('registerModal');
const openRegisterModal = document.getElementById('openRegisterModal');
const closeRegisterModal = registerModal.querySelector('.close');

openRegisterModal.addEventListener('click', () => {
  registerModal.style.display = 'block';
});

closeRegisterModal.addEventListener('click', () => {
  registerModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = 'none';
  }
  if (e.target === registerModal) {
    registerModal.style.display = 'none';
  }
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  alert(`Đăng nhập với Tên người dùng: ${username}`);
  loginModal.style.display = 'none';
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  if (password !== confirmPassword) {
    alert('Mật khẩu không khớp!');
    return;
  }
  alert(`Đăng ký với Tên người dùng: ${username}`);
  registerModal.style.display = 'none';
});