# 🚀 FWC API Explorer

**FWC API Explorer** is a dynamic web application to explore the **Fair Work Commission (FWC) APIs**. It fetches data from multiple endpoints, automatically merges all paginated results, and displays them in a clear, user-friendly format. Users can enter their own API key, select any endpoint, fill in parameters, and fetch data with total rows displayed at the top. Arrays are shown in table format, single objects in key-value format.

## ✨ Features
- Automatically fetches **all pages** from FWC API endpoints.
- Dynamic display: Single objects → key-value pairs, Arrays → table format.
- Supports multiple endpoints with **dynamic parameters**.
- Shows **total rows fetched**.
- Easy to extend by adding new endpoints in the frontend JS.

## 🛠 Getting Started
Clone the repository with `git clone` and navigate to the project folder. Install dependencies using `npm install`, then start the server with `npm start`. Open your browser at `http://localhost:3000`, enter your **FWC API subscription key**, select an endpoint, fill in any required parameters, and click **Fetch All Data**. The backend will fetch all pages automatically and merge results for display.

## 📡 Supported Endpoints
- `/awards[?name][&page][&limit][&award_operative_from][&award_operative_to][&sort]`
- `/awards/{id_or_code}[?page][&limit][&award_operative_from][&award_operative_to][&sort]`
- `/awards/{id_or_code}/classifications[?classification_level][&classification_fixed_id][&page][&limit][&operative_from][&operative_to][&sort]`
- `/awards/{id_or_code}/pay-rates[?classification_level][&classification_fixed_id][&employee_rate_type_code][&page][&limit][&operative_from][&operative_to][&sort]`
- `/awards/{id_or_code}/expense-allowances[?is_all_purpose][&page][&limit][&operative_from][&operative_to][&allowance][&sort]`
- `/awards/{id_or_code}/wage-allowances[?is_all_purpose][&page][&limit][&operative_from][&operative_to][&allowance][&sort]`
- `/awards/{id_or_code}/penalties[?penalty_fixed_id][&classification_level][&employee_rate_type_code][&penalty_description][&base_pay_rate_Id][&page][&limit][&operative_from][&operative_to][&sort]`


## ⚙️ Dependencies
- [Express](https://www.npmjs.com/package/express)
- [CORS](https://www.npmjs.com/package/cors)
- [node-fetch](https://www.npmjs.com/package/node-fetch)

## 📝 Notes
- Ensure your **FWC API subscription key** is valid.
- The backend merges **all pages automatically**; large datasets may take a few seconds.
- Arrays are displayed as **tables**, single objects as **key-value pairs**.
- For very large tables, consider implementing frontend **pagination** for better performance.

## 📄 License
MIT License
