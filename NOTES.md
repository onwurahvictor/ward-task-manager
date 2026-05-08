# Ward Task Manager — Project Notes

## Project Summary

| Sprint | Features Delivered |
|--------|-------------------|
| Sprint 1 | Add tasks, view tasks, PostgreSQL connected |
| Sprint 2 | Update status, delete tasks, filter, stats bar |
| Sprint 3 | Real time search, edit task, nodemon |

---

## What I Built

- A full **REST API** with GET, POST, PUT, PATCH and DELETE endpoints
- A **PostgreSQL** database with constraints, default values and parameterised queries
- A **jQuery** frontend with AJAX calls, event delegation, DOM manipulation and real time filtering
- **Agile** methodology — sprints, user stories, incremental delivery
- **Security** — environment variables, parameterised queries preventing SQL injection
- **Git/GitHub** — version control throughout

---

## Tech Stack

- **Frontend:** HTML, CSS, jQuery
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Tools:** Nodemon, dotenv, Git/GitHub

---

## REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Fetch all tasks |
| POST | /api/tasks | Create a new task |
| PATCH | /api/tasks/:id/status | Update task status |
| PUT | /api/tasks/:id | Edit full task |
| DELETE | /api/tasks/:id | Delete a task |

---

## PostgreSQL Concepts

- `SERIAL PRIMARY KEY` — auto-incrementing unique ID for each row
- `VARCHAR(255)` — stores text up to 255 characters
- `TEXT` — stores unlimited length text
- `NOT NULL` — field is required, cannot be left empty
- `CHECK` — validates data before saving
- `DEFAULT` — value used automatically if none is provided
- `TIMESTAMP` — stores date and time
- Parameterised queries (`$1, $2`) — prevents SQL injection attacks
- Connection Pool — manages multiple DB connections efficiently

---

## jQuery Concepts

- `$('#id')` — select element by ID
- `$('.class')` — select elements by class
- `.on('click', fn)` — attach click event listener
- `.val()` — get or set input value
- `.empty()` — clear element contents
- `.append(html)` — add HTML inside element
- `.hide() / .show()` — toggle visibility
- `$.ajax({})` — make HTTP request to server
- `$.grep()` — filter arrays
- Event delegation — `$(document).on('click', '.class', fn)` for dynamically added elements
- `.fadeOut()` — animate element before removing

---

## Agile Concepts

- **Sprint** — short fixed period to deliver working software
- **User Story** — "As a nurse, I want to add tasks so I can track ward work"
- **Kanban** — visual board showing tasks in To Do, In Progress, Done
- **Increment** — working software delivered at end of each sprint
- **Sprint Review** — show stakeholders what was built
- **Sprint Retrospective** — what went well, what to improve

---

## Security Practices

- `.env` file stores sensitive config (DB password) — never pushed to GitHub
- `.gitignore` excludes `node_modules/` and `.env`
- Parameterised queries prevent SQL injection
- Environment variables loaded via dotenv

---

## Interview Answers

### What is a REST API?
A REST API is a set of conventions for building web APIs. It uses URLs to identify 
resources and HTTP methods like GET, POST, PATCH and DELETE to describe actions on 
those resources. Communication happens via JSON and HTTP status codes indicate whether 
requests succeeded or failed.

### What is the role of PostgreSQL in your project?
PostgreSQL acts as the persistent data layer. The frontend sends requests via jQuery 
AJAX to our Express REST API, which executes parameterised SQL queries against 
PostgreSQL. Without the database, data would only exist in memory and be lost on 
every restart.

### Why did you use Node.js?
Node.js is JavaScript on the server side, which meant I could use the same language 
across the full stack. It is also non-blocking and event-driven, making it efficient 
for handling multiple requests simultaneously.

### What is event delegation in jQuery?
Event delegation is attaching an event listener to a parent element instead of 
directly to dynamically created child elements. Because task cards are added to the 
page after load, we attach listeners to document instead, which catches events that 
bubble up from dynamically added elements.

### What is Agile?
Agile is an iterative approach to software development. Work is broken into short 
sprints, each delivering working software. Requirements evolve through collaboration 
and feedback rather than being fixed upfront.