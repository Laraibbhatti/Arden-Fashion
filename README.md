# Ecommerce Website

This is a basic static ecommerce website built with HTML, CSS and JavaScript. It includes:

- **Home page** with featured products and a hero section.
- **Shop page** displaying all available products dynamically generated from a JS data array.
- **Product detail pages** with full item information and add-to-cart button.
- **Cart page** with add/remove functionality, quantity updates, and total calculation, persisted using `localStorage`.
- **Checkout page** summarizing the order and collecting shipping information.
- **Responsive navigation** with a mobile menu toggle.
- **Footer** on every page with company info, links, and social icons.
- **Blog section** with sample posts and more realistic content.
- **About page** outlining company mission and team.
- **Contact page** with contact details and an enhanced form.
- **Toast notifications** when items are added to the cart.
- **Contact form** with a simple submission handler.

## Getting Started

1. Open `index.html` in your web browser. No server is required since all pages are static, but you can also serve the folder with a simple HTTP server (e.g. `python -m http.server` or VS Code Live Server) to avoid any file‑protocol issues.
2. Click the **Shop** button to browse products, add items to your cart, and view your cart contents.
3. The cart is saved to browser storage, so it persists across page reloads.
4. Navigate to other pages using the header links; the active page is highlighted automatically.

## Extending

- Products are defined in `script.js` in the `products` array; feel free to modify or add new entries. Each product links to a detail page (`product.html?id=#`).
- Shopping cart data persists to `localStorage`; you can view the cart on `cart.html` and proceed to checkout on `checkout.html`.
- Styles are in `style.css`; there are media queries for basic responsiveness and mobile navigation.
- To integrate a backend or API, replace the static data rendering logic in `script.js` with AJAX/fetch calls, and adapt checkout to send order information to a server.

Enjoy!

The brand name throughout the UI has been changed to **ARDEN**. Random map iframes now appear on the contact and about pages, showing a different location each time you load the page.

---

### UI & Layout
The design has been enhanced with:

- Responsive grid layout on the shop page and hover effects for products.
- Hero overlay and improved typography for readability.
- Consistent section backgrounds and spacing, plus a centered container.
- Modern button styles and smooth transitions.
- Search bar in the header for filtering products live.
- A professional footer with columns and social links.
- Improved cart and detail page styling.
- Featured products section now shows eight items with two additional entries, and product thumbnails display in full color instead of grayscale.
- Logo is contained within a circular background for a refined, brand‑friendly appearance.
- Product entries now include colour swatches displayed on each card.
- Two new product images and the about hero image are fetched from live image services (picsum/unsplash) instead of placeholders; the site’s hero backgrounds also pull from Unsplash.
- Random map iframes appear on contact and about pages, auto-generating a location each load.

Feel free to tweak colors, spacing or fonts to match your brand.