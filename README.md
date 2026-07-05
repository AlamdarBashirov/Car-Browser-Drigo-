# DRIGO Internship – Week 1

## Car Browser

This project is a solution for the **DRIGO Frontend Internship – Week 1** task.

### Features

* Search cars by name (case-insensitive)
* 300ms custom debounce (without external libraries)
* Filter by transmission
* Filter by car type
* Available only toggle
* AND logic for combining filters
* Sort by price (Low → High / High → Low)
* Live results counter
* Empty state with Reset Filters button
* URL query synchronization (filters are preserved after page refresh)

### Tech Stack

* React
* Vite
* React Router DOM
* CSS Modules

### Getting Started

1. Clone the repository

```bash
git clone <repository-url>
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

The application will be available at the local URL shown in the terminal (usually http://localhost:5173).

### Project Structure

* `src/components` – reusable UI components
* `src/app` – page sections
* `src/data/cars.json` – local dataset
* `DECISIONS.md` – answers to the required questions
