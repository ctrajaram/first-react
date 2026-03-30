# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Project Overview

A learning project to understand React fundamentals — components, routing, project structure, and CSS layout.

### Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing (SPA navigation)
- **FastAPI** - Python backend server (API endpoints)
- **Databricks SQL Connector** - Connects Python to Databricks tables

### Project Structure

```
first-react/
  backend/                # Python FastAPI server
    main.py               # API endpoints (mock + Databricks)
    requirements.txt      # Python dependencies
    .env                  # Databricks secrets (git-ignored)
    .gitignore            # Prevents .env from being committed
  src/                    # React frontend
    main.jsx              # Entry point - BrowserRouter + App
    App.jsx               # Layout + Routes
    App.css               # Global styles
    components/           # Reusable UI pieces
      Header.jsx          # Top nav with logo + Link navigation
      Footer.jsx          # Copyright footer
      MainContent.jsx     # "Reasons I'm excited to learn React"
      Blog.jsx            # Blog post component
      Card.jsx            # Reusable card with props
    pages/                # Full screen pages
      Home.jsx            # Home page (MainContent + Blog)
      About.jsx           # About page (uses Card with props)
      Contact.jsx         # Contact page
    assets/
      react.svg           # React logo
```

### App Flow

```
index.html → main.jsx (BrowserRouter) → App.jsx
                                          ├── Header     (always visible, has Links)
                                          ├── Routes     (swaps based on URL)
                                          │    ├── /        → Home
                                          │    ├── /about   → About
                                          │    └── /contact → Contact
                                          └── Footer     (always visible)
```

### What Was Built (Step by Step)

1. **Fixed Vite setup** - Restored `index.html` to use Vite's entry point (`main.jsx`) instead of loading JSX directly
2. **Component structure** - Built Header, MainContent, Footer, Blog as separate React components
3. **CSS layout** - Flexbox for sticky footer (`min-height: 100vh` + `flex: 1` on main)
4. **Project organization** - Separated `components/` (reusable pieces) from `pages/` (full screens)
5. **React Router** - Installed `react-router-dom`, added `BrowserRouter`, `Routes`, `Route`, and `Link` for SPA navigation
6. **Navigation** - Header links use `<Link>` to swap page content without full page reload

### Concepts Covered

- Vite project setup and file flow (index.html → main.jsx → App.jsx)
- React components (function components, export/import)
- JSX syntax
- CSS styling (flexbox layout, sticky footer)
- Project organization (components/ vs pages/)
- React Router (Routes, Route, Link, BrowserRouter)
- Single Page App (SPA) navigation without page reload
- Importing assets (images/SVGs) in Vite

### Lesson 1: Props

This lesson uses two places in the app to demonstrate props:

- `Footer` receives `year` and `name` from `App.jsx`
- `Card` receives profile data from `About.jsx`

#### Footer props

`App.jsx` passes values into the component:

```jsx
<Footer year={2026} name="CR Development" />
```

`Footer.jsx` receives those values in its parameter list:

```jsx
export default function Footer({ year, name }) {
  return (
    <small>
      &copy; {year} {name}. All rights reserved.
    </small>
  );
}
```

#### Reusable Card props

Instead of hardcoding the About card with separate child components, `Card` now receives its content through props like `name`, `role`, `email`, `about`, and `interests`.

That makes the component reusable: `About.jsx` can render multiple cards with different data while keeping the same structure and styling.

#### Key idea

Props are how parent components send data to child components. They make components flexible, reusable, and easier to maintain.

### React Router Setup — What We Did and Why

#### 1. Installed the package (npm)

```bash
npm install react-router-dom
```

- **What:** Downloaded `react-router-dom` from npm
- **Why:** React has no built-in routing. This library lets us show different pages based on the URL without reloading the browser.

#### 2. Wrapped App with BrowserRouter (`main.jsx`)

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

- **What:** Added `<BrowserRouter>` around `<App />` in `main.jsx`
- **Why:** React Router needs this wrapper to track URL changes. Without it, `<Routes>` and `<Link>` won't work. We put it in `main.jsx` (not `App.jsx`) so the entire app has access to routing.

#### 3. Created pages folder (`src/pages/`)

- `Home.jsx` — reuses existing MainContent + Blog components
- `About.jsx` — new page
- `Contact.jsx` — new page
- **What:** Each page is a React component in its own file under `pages/`
- **Why:** Separates full screens (`pages/`) from reusable UI pieces (`components/`). This is a common convention — pages are what the user sees, components are the building blocks.

#### 4. Added Routes to App.jsx

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

- **What:** Replaced `<MainContent />` and `<Blog />` with `<Routes>` containing three `<Route>` entries
- **Why:** This tells React — when URL is `/`, render Home. When `/about`, render About. Header and Footer sit outside `<Routes>` so they're always visible on every page.

#### 5. Updated Header with Link (`Header.jsx`)

```jsx
<Link to="/about">About</Link>
```

- **What:** Replaced plain `<li>` text with `<Link to="...">` from React Router
- **Why:** `<Link>` navigates without reloading the page — it just swaps the content area. A normal `<a href>` would cause a full browser refresh, losing the SPA (Single Page App) benefit. Also wrapped the logo in `<Link to="/">` so clicking it goes home.

#### 6. Styled the nav links (`App.css`)

```css
.nav-list a {
  color: white;
  text-decoration: none;
}
.nav-list a:hover {
  color: #61dafb;
}
```

- **What:** Added CSS for the links
- **Why:** `<Link>` renders as a default blue underlined `<a>` tag. These styles make it match the dark theme — white text, no underline, blue on hover.

#### Key Takeaway

React Router turns a React app into a **Single Page App (SPA)** — one HTML page where JavaScript swaps the content based on the URL. The browser never reloads. Header, Footer, and any shared layout stay fixed while only the page content changes.

### FastAPI Backend Setup — What We Did and Why

#### Why do we need a backend?

```
React (Frontend)  →  FastAPI (Backend)  →  Databricks (Database)
   Browser              Python server         SQL table
```

React runs in the browser. Browsers **cannot** connect to databases directly because:
1. **Security** — your Databricks credentials (token, hostname) would be visible to anyone inspecting the page
2. **Capability** — browsers can't run SQL or open database connections

So we need a middleman — FastAPI — that React calls over HTTP, and FastAPI talks to Databricks.

#### 1. Created `backend/` folder

- **What:** A separate folder for all Python backend code, inside the same project
- **Why:** Keeps frontend (React/JS) and backend (Python) organized but in one repo. React runs on `localhost:5173`, FastAPI runs on `localhost:8000` — two servers, one project.

#### 2. Installed Python packages

```bash
pip install fastapi uvicorn databricks-sql-connector python-dotenv
```

| Package | What it does |
|---|---|
| `fastapi` | Python web framework — creates API endpoints (URLs that return JSON data) |
| `uvicorn` | The server that runs FastAPI (like how `npm run dev` runs Vite for React) |
| `databricks-sql-connector` | Connects Python to Databricks and runs SQL queries |
| `python-dotenv` | Reads `.env` files so secrets stay out of code |

- **Why:** `requirements.txt` lists these — like `package.json` for Python. Anyone can run `pip install -r requirements.txt` to install them all.

#### 3. Created `.env` file for secrets

```
DATABRICKS_SERVER_HOSTNAME=your-workspace.cloud.databricks.com
DATABRICKS_HTTP_PATH=/sql/1.0/warehouses/your-warehouse-id
DATABRICKS_ACCESS_TOKEN=your-access-token
USE_DATABRICKS=false
```

- **What:** A file that stores Databricks connection credentials
- **Why:** **Never hardcode secrets in code.** `.env` is git-ignored, so it never gets committed. `python-dotenv` loads it into environment variables that `main.py` reads with `os.getenv()`.
- **Where to find Databricks values:** Databricks → SQL Warehouse → Connection details → Server hostname & HTTP path. Access token → User Settings → Access Tokens → Generate new.

#### 4. Created `.gitignore` for backend

```
.env
```

- **What:** Tells git to ignore the `.env` file (also added `.env` to root `.gitignore`)
- **Why:** Prevents accidentally committing secrets to git. Even if you run `git add .`, the `.env` file is skipped.

#### 5. Created `main.py` — the FastAPI server

The server has two modes controlled by `USE_DATABRICKS` in `.env`:

**Mock mode (`USE_DATABRICKS=false`)** — returns fake data:
```python
MOCK_DATA = {
    "123": {
        "employee_id": "123",
        "name": "Alice Johnson",
        "department": "Engineering",
        "attributes": [
            {"key": "skill", "value": "Python"},
            {"key": "level", "value": "Senior"},
        ],
    },
}
```

**Real mode (`USE_DATABRICKS=true`)** — queries Databricks:
```python
cursor.execute(
    "SELECT employee_id, name, department, attributes "
    "FROM employee_data WHERE employee_id = :employee_id",
    {"employee_id": employee_id},
)
```

- **Why mock first:** Lets us build and test the entire React → FastAPI flow without needing a Databricks workspace. When ready, just fill in `.env` and set `USE_DATABRICKS=true`.

#### 6. Added CORS middleware

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)
```

- **What:** Tells FastAPI to accept requests from React's origin (`localhost:5173`)
- **Why:** Browsers enforce **same-origin policy** — a page on port 5173 is blocked from calling port 8000 by default. CORS (Cross-Origin Resource Sharing) is the browser's way of saying "this server said it's OK for you to call it." Without this middleware, every fetch from React would fail.

#### 7. SQL Injection Prevention

```python
# DANGEROUS — never do this
query = f"SELECT * FROM table WHERE id = '{user_input}'"

# SAFE — parameterized query
cursor.execute(
    "SELECT * FROM table WHERE employee_id = :employee_id",
    {"employee_id": employee_id},
)
```

- **What:** Uses `:employee_id` as a placeholder instead of inserting the value directly into the SQL string
- **Why:** With f-strings, a malicious user could type `123; DROP TABLE employees` and it would run as SQL. With parameters, the database treats the input as **data**, not as SQL code — the attack string just gets searched as a literal value.

#### Key Takeaway

The backend is a **bridge** between the browser and the database. FastAPI creates API endpoints that return JSON. React calls these endpoints with `fetch()`. Secrets live in `.env` (never in code). SQL injection is prevented by using parameterized queries (never f-strings for SQL).

### Tutorial: State, Event Handlers, and Fetching Data from FastAPI

This tutorial walks through exactly how the Search page works — from the user typing in a box to data coming back from FastAPI. Every concept is explained. The same pattern applies whether FastAPI returns mock data or reads from Databricks.

---

#### The Big Picture

```
User types "123" → React state stores it → User clicks Search
  → React sends fetch() to FastAPI → FastAPI runs query → Returns JSON
  → React stores response in state → Page re-renders with data
```

Three technologies working together:

| Layer | Technology | Role |
|---|---|---|
| Frontend | **React** (JavaScript) | Captures user input, displays results |
| Backend | **FastAPI** (Python) | Receives requests, queries database, returns JSON |
| Database | **Databricks** (SQL) | Stores the actual data |

---

#### Part 1: useState — Remembering Things

React components are functions. Every time they render, the function runs again. Regular variables reset each time:

```jsx
// This DOESN'T work — name resets to "" on every render
let name = ""
name = "Alice"  // lost on next render
```

`useState` persists values across renders:

```jsx
const [searchId, setSearchId] = useState("")
```

| Piece | What it is | Example |
|---|---|---|
| `searchId` | The current value (READ) | `""`, then `"1"`, then `"12"`, then `"123"` |
| `setSearchId` | Function to update the value (WRITE) | `setSearchId("123")` |
| `""` | The initial value | Starts as empty string |

**Key rule:** Never change state directly. Always use the setter:
```jsx
searchId = "123"        // WRONG — React doesn't know it changed
setSearchId("123")      // RIGHT — React updates and re-renders
```

**Our Search page uses 4 pieces of state:**

```jsx
const [searchId, setSearchId] = useState("")      // what user typed
const [results, setResults] = useState(null)       // data from FastAPI
const [loading, setLoading] = useState(false)      // waiting for response?
const [error, setError] = useState(null)           // error message if failed
```

Why separate states? Each tracks a different thing. When any one changes, React re-renders the component with the new values.

| State | Starts as | Changes to | Why |
|---|---|---|---|
| `searchId` | `""` | `"123"` (from typing) | Tracks what user typed in the input |
| `results` | `null` | `{ found: true, data: {...} }` | Stores the FastAPI response |
| `loading` | `false` | `true` while fetching | Shows "Loading..." text |
| `error` | `null` | `"Server error: 500"` if failed | Shows error message |

---

#### Part 2: Event Handlers — Reacting to User Actions

An event handler is a function that runs when the user does something (types, clicks, submits).

**Event 1: `onChange` — user types in the input**

```jsx
<input
    value={searchId}
    onChange={(e) => setSearchId(e.target.value)}
/>
```

Every keystroke:
1. Browser fires `onChange` event
2. `e.target.value` contains the full text in the input
3. `setSearchId(...)` updates state
4. React re-renders — input shows the new value

```
User types "1"  → onChange → setSearchId("1")   → searchId = "1"
User types "2"  → onChange → setSearchId("12")  → searchId = "12"
User types "3"  → onChange → setSearchId("123") → searchId = "123"
```

**`e.target.value` explained:**
- `e` = the event object (browser creates this automatically)
- `e.target` = the HTML element that fired the event (the `<input>`)
- `e.target.value` = the current text inside that element
- This is standard JavaScript — works the same everywhere, not React-specific

**Event 2: `onSubmit` — user submits the form**

```jsx
<form onSubmit={handleSubmit}>
    <input ... />
    <button type="submit">Search</button>
</form>
```

Fires when user clicks the button OR presses Enter. Calls `handleSubmit`:

```jsx
async function handleSubmit(e) {
    e.preventDefault()  // stop page from reloading
    // ... fetch data from FastAPI
}
```

**`e.preventDefault()` explained:**
- By default, `<form>` submits and reloads the entire page (old HTML behavior)
- We don't want that — we're in a Single Page App
- `e.preventDefault()` cancels that default behavior
- Without it, the page reloads and all your state is lost

---

#### Part 3: fetch() — Calling FastAPI from React

`fetch()` is a built-in browser function that sends HTTP requests. It's how React talks to FastAPI.

```jsx
const response = await fetch(
    `http://localhost:8000/api/search?employee_id=${searchId}`
)
const data = await response.json()
```

**Breaking down the URL:**

```
http://localhost:8000/api/search?employee_id=123
|___________________|__________|_______________|
     FastAPI server    endpoint   query parameter
```

| Part | What | Maps to |
|---|---|---|
| `localhost:8000` | FastAPI server address | Where `uvicorn` is running |
| `/api/search` | The endpoint path | `@app.get("/api/search")` in `main.py` |
| `?employee_id=123` | Query parameter | `def search(employee_id: str)` in FastAPI |

**What FastAPI receives:**

```python
# In main.py — FastAPI automatically reads the query parameter
@app.get("/api/search")
def search(employee_id: str):    # employee_id = "123" (from the URL)
```

**What FastAPI returns:**

```json
{
    "found": true,
    "data": {
        "employee_id": "123",
        "name": "Alice Johnson",
        "department": "Engineering",
        "attributes": [
            {"key": "skill", "value": "Python"},
            {"key": "skill", "value": "React"},
            {"key": "level", "value": "Senior"},
            {"key": "team", "value": "Platform"}
        ]
    }
}
```

This is the same whether it comes from mock data or Databricks. The React code doesn't change — only the backend function switches.

---

#### Part 4: async/await — Waiting for Responses

Fetching data takes time (network request). JavaScript doesn't freeze and wait by default — it keeps running. `async/await` tells it to pause:

```jsx
// WITHOUT await — code keeps running, data isn't ready yet
const response = fetch(url)       // response is a Promise (not data)
const data = response.json()      // FAILS — response isn't ready

// WITH await — pauses until data arrives
const response = await fetch(url) // waits, then response is the actual response
const data = await response.json() // waits, then data is the actual object
```

Rules:
- `await` can only be used inside an `async` function
- `await` pauses that function until the operation completes
- The rest of your app keeps running — only this function pauses

```jsx
async function handleSubmit(e) {   // "async" = this function uses "await"
    const response = await fetch(url)  // pause here until server responds
    const data = await response.json() // pause here until JSON is parsed
}
```

---

#### Part 5: try/catch/finally — Handling Errors

Things can go wrong: server is down, network error, bad response. `try/catch` prevents the app from crashing:

```jsx
try {
    // TRY to do this...
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error("Server error: " + response.status)
    }
    const data = await response.json()
    setResults(data)

} catch (err) {
    // If ANYTHING in try{} failed, this runs instead
    setError(err.message)    // "Server error: 500" or "Failed to fetch"

} finally {
    // This ALWAYS runs — success or failure
    setLoading(false)        // stop showing "Loading..." either way
}
```

| Block | When it runs | Purpose |
|---|---|---|
| `try` | Always runs first | The code we want to execute |
| `catch` | Only if `try` throws an error | Handle the error gracefully |
| `finally` | Always runs, after try or catch | Cleanup (stop loading spinner) |

**`response.ok` explained:**
- HTTP status 200 = success → `response.ok` is `true`
- HTTP status 404, 500, etc. = error → `response.ok` is `false`
- We check this because `fetch()` doesn't throw on HTTP errors — only on network failures

**Common errors and what causes them:**

| Error | Cause |
|---|---|
| `Failed to fetch` | FastAPI server isn't running |
| `Server error: 500` | Bug in FastAPI code |
| `Server error: 404` | Wrong URL/endpoint |
| CORS error in console | CORS middleware not set up or wrong origin |

---

#### Part 6: The Complete Flow — From Keystroke to Data on Screen

Here's every single step when a user searches for "123":

```
1.  Page loads
    → useState creates: searchId="", results=null, loading=false, error=null
    → Screen shows: empty input, search button, nothing else

2.  User types "1"
    → <input onChange> fires
    → (e) => setSearchId(e.target.value)
    → setSearchId("1")
    → React re-renders, input shows "1"

3.  User types "2" then "3"
    → Same cycle: setSearchId("12") → setSearchId("123")

4.  User clicks Search (or presses Enter)
    → <form onSubmit={handleSubmit}> fires
    → handleSubmit(e) runs

5.  e.preventDefault()
    → Stops the browser from reloading the page

6.  setLoading(true), setResults(null), setError(null)
    → React re-renders: shows "Loading..."

7.  fetch("http://localhost:8000/api/search?employee_id=123")
    → Browser sends GET request to FastAPI server

8.  FastAPI receives the request
    → @app.get("/api/search") matches
    → employee_id parameter = "123"
    → Calls search_mock("123") or search_databricks("123")

9.  FastAPI returns JSON:
    → { "found": true, "data": { "name": "Alice", ... } }

10. Back in React — response arrives
    → await response.json() parses it into a JavaScript object

11. setResults(data)
    → results state updates from null to the data object

12. finally { setLoading(false) }
    → loading state updates from true to false

13. React re-renders with new state:
    → loading=false → "Loading..." disappears
    → results has data → raw JSON appears on screen
    → error=null → no error message
```

---

#### Part 7: Mock vs Databricks — What Changes?

**Nothing changes in React.** The frontend code is identical. Only the backend function switches:

```
React (same code)  →  fetch("/api/search?employee_id=123")
                           ↓
                    FastAPI checks USE_DATABRICKS
                           ↓
               ┌───────────┴───────────┐
               ↓                       ↓
        USE_DATABRICKS=false    USE_DATABRICKS=true
               ↓                       ↓
        search_mock("123")      search_databricks("123")
               ↓                       ↓
        returns from dict       runs SQL query
               ↓                       ↓
               └───────────┬───────────┘
                           ↓
                Same JSON response
                           ↓
                React displays it
```

**In mock mode (what we use now):**
```python
def search_mock(employee_id):
    result = MOCK_DATA.get(employee_id)   # lookup in Python dictionary
    return {"found": True, "data": result}
```

**In Databricks mode (when you have a workspace):**
```python
def search_databricks(employee_id):
    connection = sql.connect(
        server_hostname=os.getenv("DATABRICKS_SERVER_HOSTNAME"),
        http_path=os.getenv("DATABRICKS_HTTP_PATH"),
        access_token=os.getenv("DATABRICKS_ACCESS_TOKEN"),
    )
    cursor = connection.cursor()
    cursor.execute(
        "SELECT employee_id, name, department, attributes "
        "FROM employee_data WHERE employee_id = :employee_id",
        {"employee_id": employee_id},   # parameterized — prevents SQL injection
    )
    row = cursor.fetchone()
    # ... format and return same JSON structure
```

**To switch from mock to real:**
1. Fill in `.env` with your Databricks credentials
2. Change `USE_DATABRICKS=false` to `USE_DATABRICKS=true`
3. Restart FastAPI (`uvicorn main:app --reload`)
4. React code stays exactly the same

**Why this design matters:** You can build and test the entire frontend without a database. When the database is ready, you only change one config value. This is how real projects work.

---

#### Part 8: Conditional Rendering — Showing the Right Thing

At the bottom of Search.jsx, we display different things based on state:

```jsx
{loading && <p>Loading...</p>}
{error && <p style={{ color: "red" }}>Error: {error}</p>}
{results && <pre>{JSON.stringify(results, null, 2)}</pre>}
```

**How `&&` works in JSX:**
- `true && <p>Show this</p>` → renders `<p>Show this</p>`
- `false && <p>Show this</p>` → renders nothing

| State | What's truthy | What renders |
|---|---|---|
| Just loaded, nothing happened | All null/false | Nothing — just the form |
| User clicked Search, waiting | `loading = true` | "Loading..." |
| Response came back | `results = { ... }` | Raw JSON data |
| Something went wrong | `error = "Failed..."` | Red error message |

This is **conditional rendering** — showing different UI based on the current state. Step 6 will replace the raw JSON with a nice-looking table.

---

#### Quick Reference: Technologies Used in Search Page

| Code | Technology | Category |
|---|---|---|
| `useState` | React | State management |
| `onChange`, `onSubmit` | React | Event handling |
| `e.preventDefault()` | JavaScript (DOM API) | Prevent default browser behavior |
| `e.target.value` | JavaScript (DOM API) | Read input value |
| `async/await` | JavaScript (ES2017) | Handle asynchronous operations |
| `fetch()` | JavaScript (Browser API) | Send HTTP requests |
| `try/catch/finally` | JavaScript | Error handling |
| `response.json()` | JavaScript (Fetch API) | Parse JSON response |
| `{condition && <JSX>}` | React (JSX) | Conditional rendering |
| `JSON.stringify()` | JavaScript | Convert object to readable text |
| `@app.get()` | FastAPI (Python) | Define API endpoint |
| `CORSMiddleware` | FastAPI (Python) | Allow cross-origin requests |
| `os.getenv()` | Python (standard library) | Read environment variables |
| `load_dotenv()` | python-dotenv (Python) | Load `.env` file |
| Parameterized query (`:id`) | SQL / databricks-sql-connector | Prevent SQL injection |

### Getting Started

**Frontend (React):**
```bash
npm install
npm run dev
```

**Backend (FastAPI):**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

React runs on `localhost:5173`, FastAPI runs on `localhost:8000`.
