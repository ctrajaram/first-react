import { useState } from 'react'

// Mock data — same as backend/main.py
// Used as fallback when FastAPI is not running (e.g. deployed on Vercel)
const MOCK_DATA = {
    "123": {
        employee_id: "123",
        name: "Alice Johnson",
        department: "Engineering",
        attributes: [
            { key: "skill", value: "Python" },
            { key: "skill", value: "React" },
            { key: "level", value: "Senior" },
            { key: "team", value: "Platform" },
        ],
    },
    "456": {
        employee_id: "456",
        name: "Bob Smith",
        department: "Data Science",
        attributes: [
            { key: "skill", value: "SQL" },
            { key: "skill", value: "Spark" },
            { key: "level", value: "Mid" },
            { key: "team", value: "Analytics" },
        ],
    },
    "789": {
        employee_id: "789",
        name: "Carol Davis",
        department: "Design",
        attributes: [
            { key: "skill", value: "Figma" },
            { key: "skill", value: "CSS" },
            { key: "level", value: "Lead" },
            { key: "team", value: "Product" },
        ],
    },
}

// Fallback search — uses mock data when FastAPI is unavailable
function searchMock(employeeId) {
    const result = MOCK_DATA[employeeId]
    if (result) {
        return { found: true, data: result }
    }
    return { found: false, data: null }
}

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

        // Step 2: Try FastAPI first, fall back to mock data
        try {
            // Try to call FastAPI (works locally when backend is running)
            const response = await fetch(
                `http://localhost:8000/api/search?employee_id=${searchId}`
            )

            if (!response.ok) {
                throw new Error("Server error: " + response.status)
            }

            const data = await response.json()
            setResults(data)

        } catch (err) {
            // FastAPI not available (e.g. deployed on Vercel) — use mock data
            // This catches both network errors and server errors
            console.log("FastAPI unavailable, using mock data:", err.message)
            const mockResult = searchMock(searchId)
            setResults(mockResult)

        } finally {
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
