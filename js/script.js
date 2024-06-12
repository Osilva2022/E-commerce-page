import { swiper,lightboxSlider} from "./swiper.js";

// State
let cart = [];

// DOM Elements
const cartContent = document.querySelector(
  "#header-cart-wrapper .cart-content"
);
const cartEmptyEl = document.querySelector(
  "#header-cart-wrapper .cart-content .cart-empty"
);
const currPriceEl = document.querySelector("#current-price");
const discountEl = document.querySelector("#discount");
const oldPriceEl = document.querySelector("#old-price");

const addToCartBtn = document.querySelector("#add-to-cart");
const cartQtyTooltip = document.querySelector("#cart-qty-tooltip");

// Quantity Selector
const orderQty = document.querySelector("#order-qty-value");
const orderQtyMinus = document.querySelector("#order-qty-minus");
const orderQtyPlus = document.querySelector("#order-qty-plus");

const mobileNav = document.querySelector(".mobile-menu");
const mobileMenuWrapper = document.querySelector(
  ".mobile-menu .mobile-menu-wrapper"
);
const mobileMenuWidth = "auto";
const mobileNavOpen = document.querySelector("#mobile-nav-open");
const mobileNavClose = document.querySelector("#mobile-nav-close");

const cartDropdownToggleBtn = document.querySelector("#cart-dropdown-toggle");
const headerCart = document.querySelector("#header-cart-wrapper");

const lightbox = document.querySelector("#lightbox");
const lightboxCloseBtn = document.querySelector("#lightbox-close-btn");

const products = [
    
    {
      src: "./images/image-product-1.jpg",
      thumb: "./images/image-product-1-thumbnail.jpg",
      price: 125,
      discount: 50,
      old_price: 250,
    },
    {
      src: "./images/image-product-2.jpg",
      thumb: "./images/image-product-2-thumbnail.jpg",
      price: 125,
      discount: 50,
      old_price: 250,
    },
    {
      src: "./images/image-product-3.jpg",
      thumb: "./images/image-product-3-thumbnail.jpg",
      price: 125,
      discount: 50,
      old_price: 250,
    },
    {
      src: "./images/image-product-4.jpg",
      thumb: "./images/image-product-4-thumbnail.jpg",
      price: 125,
      discount: 50,
      old_price: 250,
    },
];

orderQtyMinus.addEventListener("click", () =>
  +orderQty.value - 1 < 1 ? (orderQty.value = 1) : +orderQty.value--
);
orderQtyPlus.addEventListener("click", () => +orderQty.value++);

// Update product prices and discounts
const idx = swiper.realIndex;
currPriceEl.innerText = products[idx].price.toFixed(2);
discountEl.innerText = `${products[idx].discount}%`;
oldPriceEl.innerText = products[idx].old_price.toFixed(2);

let currentProd = { id: idx, ...products[idx] };

swiper.on("slideChangeTransitionEnd", () => {
  currPriceEl.innerText = products[swiper.realIndex].price.toFixed(2);
  discountEl.innerText = `${products[swiper.realIndex].discount}%`;
  oldPriceEl.innerText = products[swiper.realIndex].old_price.toFixed(2);

  currentProd = { id: swiper.realIndex, ...products[swiper.realIndex] };
});

// Add items to cart
addToCartBtn.addEventListener("click", () => {
  const cartIndex = cart.findIndex((prod) => prod.id === currentProd.id);

  // Product is not in cart
  if (cartIndex === -1) {
    cart.push({ ...currentProd, qty: +orderQty.value });
    addElementToCart({ ...currentProd, qty: +orderQty.value });
    document.querySelector("#order-qty-value").value = 1;
  } else {
    // Product is in cart -> update Quantity
    cart[cartIndex].qty += +orderQty.value;
    const itemTotal = cartContent.querySelector(
      `.list-item[data-product-id="${cart[cartIndex].id}"] .item-total`
    );
    itemTotal.innerText = `$${cart[cartIndex].price} x ${cart[cartIndex].qty}`;
    const b = document.createElement("b");
    b.appendChild(
      document.createTextNode("$" + cart[cartIndex].price * cart[cartIndex].qty)
    );
    itemTotal.appendChild(b);

    // Set qty selector to 1
    document.querySelector("#order-qty-value").value = 1;

    cartUpdated();
  }
});

function deleteFromCart(e) {
  const element = e.target.closest(".list-item");
  const productId = element.dataset.productId;
  const cartIndex = cart.findIndex((prod) => prod.id === +productId);

  element.remove();
  cart.splice(cartIndex, 1);
  cartUpdated();
}

function addElementToCart(prod) {
  if (!cartEmptyEl.classList.contains("hide") && cart.length > 0)
    cartEmptyEl.classList.add("hide");

  const listItem = document.createElement("div");
  listItem.classList.add("list-item");
  listItem.dataset.productId = prod.id;

  const item = document.createElement("div");
  item.classList.add("item");
  const thumbImg = document.createElement("img");
  thumbImg.src = prod.src;
  thumbImg.alt = "Product image";

  const itemDetails = document.createElement("div");
  itemDetails.classList.add("item-details");

  const p1 = document.createElement("p");
  p1.appendChild(document.createTextNode("Autumn Limited Edition Sneakers"));
  const p2 = document.createElement("p");
  p2.innerText = `$${prod.price} x ${prod.qty}`;
  const total = document.createElement("b");
  total.appendChild(document.createTextNode(`$${prod.price * prod.qty}`));
  p2.appendChild(total);
  p2.classList.add("item-total");

  const deleteBtn = document.createElement("button");
  deleteBtn.addEventListener("click", deleteFromCart);
  const btnImg = document.createElement("img");
  btnImg.src = "./images/icon-delete.svg";
  btnImg.alt = "Delete Item from Cart";

  deleteBtn.appendChild(btnImg);
  itemDetails.appendChild(p1);
  itemDetails.appendChild(p2);
  item.appendChild(thumbImg);
  item.appendChild(itemDetails);
  listItem.appendChild(item);
  listItem.appendChild(deleteBtn);

  cartContent.appendChild(listItem);
  cartUpdated();
}

const cartUpdated = () => {
  console.log("cart updated");
  const cartTotalQty = cart.reduce((a, c) => (a += c.qty), 0);

  if (!cartEmptyEl.classList.contains("hide") && cart.length > 0) {
    cartEmptyEl.classList.add("hide");
    cartQtyTooltip.classList.add("not-empty");
  }
  if (cart.length > 0) {
    cartQtyTooltip.innerText = cartTotalQty;
    if (!cartQtyTooltip.classList.contains("not-empty"))
      cartQtyTooltip.classList.add("not-empty");
  } else {
    cartEmptyEl.classList.remove("hide");
    cartQtyTooltip.classList.remove("not-empty");
  }
};



/* Header -> Cart */
const toggleHeaderCart = () => {
  // show cart
  if (headerCart.dataset.visible === "0") {
    gsap.to(headerCart, { duration: 0.3, height: "auto" });
    headerCart.dataset.visible = 1;
    return;
  }
  // hide cart
  if (headerCart.dataset.visible === "1") {
    gsap.to(headerCart, { duration: 0.3, height: "0" });
    headerCart.dataset.visible = 0;
    return;
  }
};

const closeHeaderCart = () => {
  // hide cart
  if (headerCart.dataset.visible === "1") {
    gsap.to(headerCart, { duration: 0.3, height: "0" });
    headerCart.dataset.visible = 0;
    return;
  }
};

cartDropdownToggleBtn.addEventListener("click", toggleHeaderCart);

document.addEventListener("click", (e) => {
  let targetEl = e.target; // clicked element
  const cartDropdownListItem = headerCart.closest(".list-item");
  const listItem = e.target.closest(".list-item");

  do {
    // If click is on cart -> return
    if (
      targetEl === headerCart ||
      targetEl === cartDropdownToggleBtn ||
      targetEl === listItem
    ) {
      return;
    }
    targetEl = targetEl.parentNode;
  } while (targetEl);

  // if cart is open, close it
  closeHeaderCart();
});

/* /Header -> Cart */

/* Mobile Navigation Menu */
const showMobileNav = () => {
  gsap.to(mobileNav, { width: "100%", duration: 0.2 });
  gsap.to(mobileMenuWrapper, { duration: 0.3, x: "50vw" });
};

const closeMobileNav = () => {
  gsap.to(mobileNav, { width: 0, duration: 0.1 });
  gsap.to(mobileMenuWrapper, { duration: 0.3, x: "-50vw" });
};

mobileNavOpen.addEventListener("click", showMobileNav);
mobileNavClose.addEventListener("click", closeMobileNav);

mobileNav.addEventListener("click", (e) => {
  if (e.target === mobileNav) closeMobileNav();
});
/* /Mobile Navigation Menu */

/* Lightbox */
lightboxCloseBtn.addEventListener("click", () => {
  hideLightbox();
});

swiper.on("click", (e) => {
  lightboxSlider.slideTo(swiper.clickedIndex);
  showLightbox();
});

const showLightbox = () =>
  gsap.to(lightbox, { duration: 0.2, css: { scaleX: 1, scaleY: 1 } });
const hideLightbox = () =>
  gsap.to(lightbox, { duration: 0.2, css: { scaleX: 0, scaleY: 0 } });
