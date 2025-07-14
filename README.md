# 🌤️ Weather Service API

A simple Express + TypeScript API that fetches short-term weather forecasts using the [National Weather Service API](https://www.weather.gov/documentation/services-web-api). It accepts latitude and longitude and returns a short forecast and temperature classification (`hot`, `cold`, or `moderate`).

---

## 📦 Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **ESLint** (with strict rules)
- **Jest** + **Supertest** for testing
- **Axios** for HTTP requests

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the server in dev mode

```bash
npm run dev
```

### 3. API Usage

- Example Request
```bash
GET http://localhost:3000/weather?lat=38.8977&lon=-77.0365
```

- Example Response
```bash
{
  "forecast": "Partly Cloudy",
  "category": "moderate"
}
```

### 4. Running Tests

```bash
npm test
```
