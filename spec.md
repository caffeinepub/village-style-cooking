# Araku Bamboo Biryani

## Current State
Existing project (Village Style Cooking) with basic menu display. No cart, payment, or order management.

## Requested Changes (Diff)

### Add
- Full rebranding to "Araku Bamboo Biryani" with Araku Valley tribal theme (warm browns, greens, oranges; bamboo/wood textures)
- Hero section with restaurant name and bamboo cooking imagery
- Menu section with 4 items: Bamboo Chicken, Bamboo Biryani, Pot Chicken, Pot Biryani — each with image and price
- Cart system: add items, choose quantity, view total
- Payment section: UPI, PhonePe, Google Pay, Cash on Delivery options
- Order confirmation screen with message: "Thank you for ordering from Araku Bamboo Biryani. Your order has been received and will be prepared soon."
- Order summary notification showing item name, quantity, total price
- Contact section at bottom: phone 8466056551
- Mobile-first responsive design

### Modify
- Replace all existing menu items and branding

### Remove
- Old Village Style Cooking branding and menu items

## Implementation Plan
- Backend: store menu items with names/prices, place orders (item, quantity, payment method), retrieve order confirmation
- Frontend: Home page hero → Menu grid → Cart drawer/sheet → Payment selection → Order confirmation modal → Contact footer
- Generate food images for each menu item and a hero bamboo cooking image
