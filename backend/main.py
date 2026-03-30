import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Load .env file — reads secrets into environment variables
# os.getenv("KEY") can now access them without hardcoding
load_dotenv()

# Create the FastAPI app
app = FastAPI()

# CORS middleware — allows React (localhost:5173) to call this API (localhost:8000)
# Without this, the browser blocks the request for security reasons.
# Browsers enforce "same-origin policy" — port 5173 != port 8000, so it's blocked.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # only allow your React app
    allow_methods=["GET"],
    allow_headers=["*"],
)


# ──────────────────────────────────────────────
# Mock data — used when USE_DATABRICKS=false
# Simulates a table called "employee_data" with:
#   - employee_id (STRING) — the column we search by
#   - attributes (ARRAY)   — the column we retrieve (array of key-value pairs)
# ──────────────────────────────────────────────
MOCK_DATA = {
    "123": {
        "employee_id": "123",
        "name": "Alice Johnson",
        "department": "Engineering",
        "attributes": [
            {"key": "skill", "value": "Python"},
            {"key": "skill", "value": "React"},
            {"key": "level", "value": "Senior"},
            {"key": "team", "value": "Platform"},
        ],
    },
    "456": {
        "employee_id": "456",
        "name": "Bob Smith",
        "department": "Data Science",
        "attributes": [
            {"key": "skill", "value": "SQL"},
            {"key": "skill", "value": "Spark"},
            {"key": "level", "value": "Mid"},
            {"key": "team", "value": "Analytics"},
        ],
    },
    "789": {
        "employee_id": "789",
        "name": "Carol Davis",
        "department": "Design",
        "attributes": [
            {"key": "skill", "value": "Figma"},
            {"key": "skill", "value": "CSS"},
            {"key": "level", "value": "Lead"},
            {"key": "team", "value": "Product"},
        ],
    },
}


def search_mock(employee_id: str):
    """Return mock data — no Databricks needed"""
    result = MOCK_DATA.get(employee_id)
    if result:
        return {"found": True, "data": result}
    return {"found": False, "data": None}


def search_databricks(employee_id: str):
    """
    Query real Databricks table.
    Uses PARAMETERIZED query to prevent SQL injection.
    The :id placeholder is replaced safely — the database treats it as DATA, not SQL code.
    Even if someone types "123; DROP TABLE", it just searches for that literal string.
    """
    from databricks import sql

    connection = sql.connect(
        server_hostname=os.getenv("DATABRICKS_SERVER_HOSTNAME"),
        http_path=os.getenv("DATABRICKS_HTTP_PATH"),
        access_token=os.getenv("DATABRICKS_ACCESS_TOKEN"),
    )

    cursor = connection.cursor()

    # SAFE — parameterized query (the :employee_id is a placeholder)
    # NEVER do: f"SELECT * FROM table WHERE employee_id = '{employee_id}'"
    cursor.execute(
        "SELECT employee_id, name, department, attributes FROM employee_data WHERE employee_id = :employee_id",
        {"employee_id": employee_id},
    )

    row = cursor.fetchone()
    cursor.close()
    connection.close()

    if row:
        return {
            "found": True,
            "data": {
                "employee_id": row[0],
                "name": row[1],
                "department": row[2],
                "attributes": row[3],  # array column — comes as list of dicts
            },
        }
    return {"found": False, "data": None}


# ──────────────────────────────────────────────
# API endpoint
# React calls: GET http://localhost:8000/api/search?employee_id=123
# ──────────────────────────────────────────────
@app.get("/api/search")
def search(employee_id: str):
    """
    Search employee by ID.
    Returns employee data including the attributes array column.
    """
    use_databricks = os.getenv("USE_DATABRICKS", "false").lower() == "true"

    if use_databricks:
        return search_databricks(employee_id)
    else:
        return search_mock(employee_id)
