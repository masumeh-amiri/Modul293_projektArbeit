// Simple carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  // Multiple page carousel setup would go here
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const currentPageElement = document.querySelector('.current-page');
  const items = document.querySelectorAll('.carousel-item');
  
  const allImages = [
    [
      'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457',
      'https://media.istockphoto.com/id/1391282084/photo/furniture-flying-in-blue-background-living-room-furniture-concept-for-home-decor-advertising.jpg?s=612x612&w=0&k=20&c=7wkvr34dLhtm96tXEB5llNEtT4MnRrW2uy3UkP9PLc8=',
      'https://media.istockphoto.com/id/1252858277/photo/cozy-living-room-scandinavian-interior.jpg?s=612x612&w=0&k=20&c=IUG1Uv-I1yoaKvKcrJk1IjDbMesO3kC4bKRi-C2683Y='
    ],
    [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094'
    ]
  ];
  
  let currentPage = 0;
  
  // Function to update the carousel images
  function updateCarousel() {
    const images = allImages[currentPage];
    currentPageElement.textContent = currentPage + 1;
    
    items.forEach((item, index) => {
      const img = item.querySelector('img');
      img.src = images[index];
    });
  }
  
  // Event listeners for navigation buttons
  prevButton.addEventListener('click', function() {
    currentPage = Math.max(0, currentPage - 1);
    updateCarousel();
  });
  
  nextButton.addEventListener('click', function() {
    currentPage = Math.min(allImages.length - 1, currentPage + 1);
    updateCarousel();
  });
});

const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}


var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
// ********************************
