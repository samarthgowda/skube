# Skube

Building an on-chain professional profile. Mint your own profile, issue badges to yourself and others, and showcase it to the world.

## Folder Structure

- `components` store shared components
- `lib` stores util functions and different libraries
- `pages` stores the different pages and routes
  - `_app.tsx` is the base component that renders all of the pages so any change here will affect all pages
  - `_document.tsx` is the base document component that renders before `_app.tsx`
  - `api` will contain our api which will be deployed as functions when we deploy our application
  - any folder inside pages represents a nested route
- `public` is the classic public folder for web apps (images, fonts, favicons, etc.)
- `redux` contains `services` and `store` folders for global state
- `styles` will store our style overrides and other stuff
  - `theme` stores Chakra-UI theme overrides

## How to setup

- Use `pnpm`. Install `pnpm` if you do not have it and run `pnpm install`. It operates the exact same way as `npm` just remember to do `pnpm` everywhere.
