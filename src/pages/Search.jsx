import { useState } from 'react'

export default function Search() {
    // State for the search input — what the user types
    const [searchId, setSearchId] = useState("")

    // State for the API response — starts null (no data yet)
    const [results, setResults] = useState(null)

    // State for loading — true while waiting for FastAPI to respond
    const [loading, setLoading] = useState(false)

    // State for errors — null means no error
    const [error, setError] = useState(null)

    // "async" because fetch() takes time — we need "await" to wait for it
    async function handleSubmit(e) {
        // Stop the browser from reloading the page
        e.preventDefault()

        // Don't search if input is empty
        if (!searchId.trim()) return

        // Step 1: Set loading to true, clear any previous results/errors
        setLoading(true)
        setResults(null)
        setError(null)

        // Step 2: Try to fetch data from FastAPI
        try {
            // fetch() sends a GET request to our FastAPI server
            // The ?employee_id=123 part is called a "query parameter"
            // FastAPI reads it as the "employee_id" argument in our endpoint
            const response = await fetch(
                `http://localhost:8000/api/search?employee_id=${searchId}`
            )

            // response.ok is true if the server returned a success status (200)
            // If the server returned an error (500, 404, etc.), we throw an error
            if (!response.ok) {
                throw new Error("Server error: " + response.status)
            }

            // Convert the response body from JSON text to a JavaScript object
            // This gives us the { found: true, data: { ... } } object from FastAPI
            const data = await response.json()

            // Step 3: Store the result in state — React re-renders and shows it
            setResults(data)

        } catch (err) {
            // If anything went wrong (network down, server error, bad JSON)
            // catch grabs the error so the app doesn't crash
            setError(err.message)
        } finally {
            // "finally" runs whether it succeeded or failed
            // Either way, we're done loading
            setLoading(false)
        }
    }

    return (
        <main>
            <h1>Employee Search</h1>

            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter employee ID (try 123, 456, 789)"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {/* CONDITIONAL RENDERING — show different things based on state */}

            {/* Show while waiting for FastAPI response */}
            {loading && <p className="search-status">Loading...</p>}

            {/* Show if fetch() failed (network error, server down, etc.) */}
            {error && <p className="search-error">Error: {error}</p>}

            {/* Show if FastAPI returned found: false */}
            {results && !results.found && (
                <p className="search-status">No employee found with ID "{searchId}"</p>
            )}

            {/* Show if FastAPI returned found: true */}
            {results && results.found && (
                <div className="search-results">
                    {/* Employee info card */}
                    <div className="employee-info">
                        <h2>{results.data.name}</h2>
                        <p>ID: {results.data.employee_id}</p>
                        <p>Department: {results.data.department}</p>
                    </div>

                    {/* Attributes table — uses .map() to render each array item */}
                    <h3>Attributes</h3>
                    <table className="attributes-table">
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.data.attributes.map((attr, index) => (
                                <tr key={index}>
                                    <td>{attr.key}</td>
                                    <td>{attr.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    )
}
