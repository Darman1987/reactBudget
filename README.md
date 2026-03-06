# Budget Allocation App (React)

A React app to manage a total budget and allocate amounts across custom expense categories.

## Features

- Set and edit a total budget with numeric-only input handling.
- Cycle the budget currency symbol directly from the budget card.
- View live summary cards for budget, spent amount, and remaining amount.
- Highlight remaining budget as a warning style when spending exceeds the total budget.
- Edit allocation values per expense in a table-based interface.
- Add new expense categories from an "Add Expense" modal.
- Rename existing categories inline.
- Delete categories with a confirmation popup.
- Prevent deleting the last remaining category.
- Reset all values (budget and allocations) with one action.
- Show validation/error popups for invalid actions (duplicate/empty names, etc.).
- Persist budget, currency, and allocations in `localStorage`.

## Tech Stack

- React (hooks + context/reducer state)
- Bootstrap 5
- React Icons

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open `http://localhost:3000`.

## Scripts

- `npm start` - Run the app in development mode.
- `npm test` - Run tests.
- `npm run build` - Create a production build.
- `npm run deploy` - Deploy to GitHub Pages.
