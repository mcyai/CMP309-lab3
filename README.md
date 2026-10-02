# CMP309 Lab 3 - University Course Management System

Run with Node.js (ES modules): `node main.js`

## File organization
- `models.js` - `Student` class. `id` is defined with `Object.defineProperty` (`writable: false`, `configurable: false`). Has `addCourse()` and `getAverage()`.
- `database.js` - `fetchStudents(callback)` simulates a slow DB with `setTimeout` (2 s) and passes the raw data to the callback.
- `analytics.js` - `calculateClassAverage`, `findTopStudent` (uses `.reduce()`), `filterStudents` (higher-order function).
- `main.js` - entry point: fetches data, builds `Student` instances, tests ID immutability, prints the analytics report.
- `package.json` - sets `"type": "module"` so `import`/`export` work in `.js` files.

## Challenges faced
- Using ES modules in plain `.js` files required `"type": "module"` in `package.json`.
- Modules run in strict mode, so assigning to the read-only `id` throws a `TypeError` instead of failing silently; `main.js` catches it and then checks that the ID is unchanged.
- All logic that depends on the data must run inside the `fetchStudents` callback because the data arrives asynchronously.
- The sample output in the assignment shows "Zeynep (82.5)" as top student, but with the given data Ali has the highest average (87.5), so the program prints Ali.
"# CMP309-lab3" 
