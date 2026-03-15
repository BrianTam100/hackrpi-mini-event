const submitButton = document.querySelector('input[type="submit"]');
let clickCount = 0;

submitButton.addEventListener('click', (event) => {
  clickCount++;
  if (clickCount <= 4) {
    event.preventDefault();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonWidth = submitButton.offsetWidth;
    const buttonHeight = submitButton.offsetHeight;

    const randomX = Math.floor(Math.random() * (viewportWidth - buttonWidth));
    const randomY = Math.floor(Math.random() * (viewportHeight - buttonHeight));

    submitButton.style.position = 'absolute';
    submitButton.style.left = `${randomX}px`;
    submitButton.style.top = `${randomY}px`;
  } else {
    alert("Are you sure you want to submit?");
    event.preventDefault();
    setTimeout(() => { alert("Are you REALLY sure?"); }, 300);
    setTimeout(() => { alert("This cannot be undone."); }, 600);
    setTimeout(() => { alert("Last chance. Are you sure?"); }, 900);
    setTimeout(() => { alert("Registration cancelled due to inactivity. Please start over."); clickCount = 0; }, 1200);
  }
});

// Countdown timer that counts UP
let fakeTime = 0;
setInterval(() => {
  fakeTime++;
  const h = String(Math.floor(fakeTime / 3600)).padStart(2, '0');
  const m = String(Math.floor((fakeTime % 3600) / 60)).padStart(2, '0');
  const s = String(fakeTime % 60).padStart(2, '0');
  const el = document.getElementById('timer');
  if (el) el.textContent = `${h}:${m}:${s}`;
}, 1000);

// Cart that empties itself every 30 seconds
let cartSeconds = 30;
setInterval(() => {
  cartSeconds--;
  const el = document.getElementById('cart_timer');
  if (el) el.textContent = cartSeconds;
  if (cartSeconds <= 0) {
    cartSeconds = 30;
    const cart = document.getElementById('cart_list');
    if (cart) cart.innerHTML = '';
  }
}, 1000);

function addCourse(name) {
  const cart = document.getElementById('cart_list');
  if (!cart) return;
  const li = document.createElement('li');
  li.textContent = name + ' ';
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'X';
  removeBtn.style.fontSize = '1px';
  removeBtn.style.width = '1px';
  removeBtn.style.height = '1px';
  removeBtn.style.overflow = 'hidden';
  removeBtn.style.opacity = '0.05';
  removeBtn.onclick = () => li.remove();
  li.appendChild(removeBtn);
  cart.appendChild(li);
  alert("Course added! Note: adding a course does not reserve a seat, guarantee enrollment, or indicate availability.");
}

// Major dropdown shuffles itself every time you look away
document.getElementById('majors').addEventListener('focus', () => {
  const sel = document.getElementById('majors');
  const options = Array.from(sel.options);
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    sel.insertBefore(options[j], options[i]);
  }
});

// Credit slider shows wrong value
document.getElementById('credits').addEventListener('input', () => {
  const display = document.getElementById('credit_display');
  // Show a random unrelated number
  const wrong = (Math.random() * 18 + 1).toFixed(1);
  if (display) display.textContent = `${wrong} credits`;
});

// Course search that searches for the wrong thing
function searchCourses() {
  const results = document.getElementById('search_results');
  const fakeResults = [
    "No courses found. Did you mean: Basket Weaving 101?",
    "Error: query too short (minimum 500 characters)",
    "Results loading... (estimated wait: 45 minutes)",
    "Found 847 courses. Displaying 0.",
    "Search unavailable. Please call the Registrar.",
  ];
  if (results) results.textContent = fakeResults[Math.floor(Math.random() * fakeResults.length)];
}

// TOS infinite scroll
function addMoreTOS(el) {
  const text = document.getElementById('tos_text');
  const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
  if (distanceFromBottom < 20) {
    text.innerHTML += " Furthermore, the student acknowledges that by reaching the end of this document they have not actually reached the end of this document. The University reserves the right to add additional terms retroactively. Continued breathing constitutes acceptance. Keep scrolling...";
    // Never let them reach the bottom
    el.scrollTop = el.scrollTop - 10;
  }
}

// Prerequisites always wrong
function checkPrereq() {
  const input = document.getElementById('prereq_answer');
  const result = document.getElementById('prereq_result');
  if (result) {
    result.textContent = "Incorrect. The correct answer was classified. Your attempt has been logged.";
    if (input) input.value = '';
  }
}

// DO NOT CLICK clears everything
function doNotClick() {
  document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], input[type="password"]').forEach(el => el.value = '');
  document.getElementById('cart_list').innerHTML = '';
  document.getElementById('tos_check').checked = false;
  alert("Course conflicts resolved. All your data has been cleared to prevent conflicts.");
}

// Progress bar label updates to match backwards animation
const progressLabels = [
  "Loading... (87% — please wait, going backwards)",
  "Saving... (12% — this is normal)",
  "Almost done! (94% — do not close this tab)",
  "Please wait... (3% — system recovering)",
];
let labelIdx = 0;
setInterval(() => {
  const el = document.getElementById('progress_label');
  if (el) {
    labelIdx = (labelIdx + 1) % progressLabels.length;
    el.textContent = progressLabels[labelIdx];
  }
}, 3000);

// Randomly swap two input field values every 20 seconds
setInterval(() => {
  const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
  if (inputs.length >= 2) {
    const a = inputs[0], b = inputs[1];
    const tmp = a.value;
    a.value = b.value;
    b.value = tmp;
  }
}, 20000);
