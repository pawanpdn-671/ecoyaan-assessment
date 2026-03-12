# Ecoyaan Checkout

A multi-step checkout flow for an eco-friendly shopping platform, built with Next.js.

## What it does

Takes a user through a four-step checkout:

1. **Cart** — view items, adjust quantities, see totals
2. **Shipping** — fill in delivery address with field-level validation
3. **Payment** — review the order and confirm
4. **Success** — order confirmation screen

## Running locally

You need Node.js (v18 or above) installed.

```bash
# clone and enter the repo
git clone <repo-url>
cd ecoyaan-assessment

# install dependencies
npm install

# start the dev server
npm run dev
```

Open `http://localhost:3000` in your browser. That's it.

## Project structure

```
app/
  layout.js          ← root layout, fetches cart data on the server
  page.js            ← renders the Cart step
  shipping/page.js   ← renders the Shipping form
  payment/page.js    ← renders the Payment review
  success/page.js    ← renders the Success screen
  api/cart/route.js   ← API route that returns cart items as JSON

components/
  CartPage.js        ← cart view with item list and order summary
  ShippingForm.js    ← address form with validation
  PaymentPage.js     ← order review before placing the order
  SuccessPage.js     ← confirmation after order is placed
  Stepper.js         ← progress indicator across all steps
  Header.js          ← top nav bar
  ui/               ← small reusable pieces (Button, Card, FormField, QuantityControl, etc.)

constants/
  cartData.js            ← product data (used by the API route)
  shippingFormConfig.js  ← form field definitions and validators
  stepperSteps.js        ← step labels and their routes

context/
  CheckoutContext.js  ← React Context that holds cart items, address, and order state

utils/
  formatCurrency.js   ← simple currency formatting helper
```

## Architectural choices and why

### Next.js App Router with server-side data fetching

The root layout (`app/layout.js`) is an async Server Component. It fetches cart data from the `/api/cart` route at request time and passes it down to the client through the Context provider. This means the cart is ready before the page even renders on the client — no loading spinners on first load.

The API route itself (`app/api/cart/route.js`) is a simple GET endpoint that returns the cart JSON. Right now it reads from a static file (`constants/cartData.js`), but it could be swapped out for a real database call without changing anything on the frontend.

### React Context for state management

Instead of pulling in a state library like Redux or Zustand, checkout state lives in a single React Context (`CheckoutContext.js`). It holds the cart items, shipping address, order totals, and a flag for whether the order has been placed.

This keeps things straightforward — there are only a handful of state values to track, and they all flow in one direction through the checkout. The context wraps the entire app in the root layout, so every page and component can read or update checkout state through the `useCheckout()` hook.

### Config-driven forms

The shipping form doesn't hardcode its fields. Field names, types, labels, placeholders, and validators are all defined in `constants/shippingFormConfig.js`. The `ShippingForm` component just loops over that config and renders a `FormField` for each entry.

This makes it easy to add, remove, or reorder fields without touching the component logic. Validation rules live right next to the field definitions, so you can see at a glance what each field expects.

### Reusable UI components

Common pieces like `Button`, `Card`, `FormField`, `QuantityControl`, and `Spinner` live in `components/ui/`. Page-level components (`CartPage`, `ShippingForm`, etc.) use these building blocks rather than inlining markup. This cuts down on duplication and keeps the page components focused on layout and logic.

### Tailwind CSS for styling

All styling is done with Tailwind utility classes directly in JSX. No separate CSS files per component, no CSS-in-JS runtime. The design is responsive — the layout adjusts for mobile and desktop using Tailwind's responsive prefixes (`sm:`, `md:`, etc.).

### Static data in a constants folder

Product data, stepper step definitions, and form configurations all live under `constants/`. This separates "what the data looks like" from "how the UI renders it". When this moves to a real backend, you replace the constants with API calls and nothing else changes.

## Tech stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **Node.js** (for the dev server and API route)
