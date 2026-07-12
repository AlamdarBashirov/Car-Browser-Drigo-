# DRIGO Internship – Week 2

# Car Browser

This project is a solution for the **DRIGO Frontend Internship – Week 2** task. It extends the Week 1 project by adding asynchronous data loading, a car details page, persistent favorites, richer filtering, pagination, and unit tests.

---

## Features

- Asynchronous car data loading
- Loading, error and retry states
- Search by car name (case-insensitive)
- Custom 300ms debounce (without external libraries)
- Filter by transmission
- Multi-select filter by car type
- Price range filter
- Available only filter
- Favorites only filter
- Sort by price (Low → High / High → Low)
- Favorites saved in localStorage
- Car details page with deep linking
- URL query synchronization
- Pagination
- Live results counter
- Empty state with Reset Filters button
- Unit tests for filtering, sorting and reducer logic

---

## Tech Stack

- React
- Vite
- React Router DOM
- Context API
- React Hooks
- CSS Modules (SCSS)
- Vitest

---

## Getting Started

### Clone the repository

```bash
git clone <repository-url>
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## Run Tests

```bash
npm run test
```

---

## Project Structure

```
src/
│
├── api/
├── app/
├── components/
├── context/
├── hooks/
├── reducers/
├── routes/
├── tests/
├── utils/
└── data/
```

---

## Main Functionality

- Async loading with loading/error/retry states
- URL-based filters and pagination
- Car detail page
- Favorites persistence using localStorage
- Custom debounce hook
- Reducer-based filter management
- Utility functions for filtering and sorting
- Unit tests using Vitest

---

## Notes

The project was built following the DRIGO Week 2 requirements. The codebase focuses on reusable components, clean folder structure, readable logic, and separation of concerns.