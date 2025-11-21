const endpoints = {
  "/awards": ["name", "limit", "award_operative_from", "award_operative_to", "sort"],
  "/awards/{id_or_code}": ["id_or_code", "limit", "award_operative_from", "award_operative_to", "sort"],
  "/awards/{id_or_code}/classifications": ["id_or_code", "classification_level", "classification_fixed_id", "limit"],
  "/awards/{id_or_code}/pay-rates": ["id_or_code", "classification_level", "classification_fixed_id", "employee_rate_type_code", "limit"],
  "/awards/{id_or_code}/expense-allowances": ["id_or_code", "is_all_purpose", "limit"],
  "/awards/{id_or_code}/wage-allowances": ["id_or_code", "is_all_purpose", "limit"],
  "/awards/{id_or_code}/penalties": ["id_or_code", "penalty_fixed_id", "classification_level", "employee_rate_type_code", "limit"]
};

// Populate dropdown
const apiSelect = document.getElementById("apiSelect");
Object.keys(endpoints).forEach(ep => {
  const opt = document.createElement("option");
  opt.value = ep;
  opt.textContent = ep;
  apiSelect.appendChild(opt);
});

apiSelect.addEventListener("change", loadParams);
loadParams();

function loadParams() {
  const container = document.getElementById("parameterFields");
  container.innerHTML = "";
  const params = endpoints[apiSelect.value];
  params.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `
      <label>${p}</label>
      <input id="param_${p}" placeholder="Enter ${p}">
    `;
    container.appendChild(div);
  });
}
function renderData(data) {
  const container = document.getElementById("results");

  if (!data || data.length === 0) {
    const noData = document.createElement("p");
    noData.textContent = "No data available.";
    container.appendChild(noData);
    return;
  }

  if (Array.isArray(data)) {
    if (typeof data[0] === "object") {
      const table = document.createElement("table");
      const header = table.createTHead();
      const headerRow = header.insertRow();
      Object.keys(data[0]).forEach(key => {
        const th = document.createElement("th");
        th.innerText = key;
        headerRow.appendChild(th);
      });

      const tbody = table.createTBody();
      data.forEach(item => {
        const row = tbody.insertRow();
        Object.keys(data[0]).forEach(key => {
          const cell = row.insertCell();
          let value = item[key];
          if (typeof value === "object") value = JSON.stringify(value);
          cell.innerText = value;
        });
      });

      container.appendChild(table);
    } else {
      const pre = document.createElement("pre");
      pre.innerText = JSON.stringify(data, null, 2);
      container.appendChild(pre);
    }
  } else if (typeof data === "object") {
    const div = document.createElement("div");
    Object.keys(data).forEach(key => {
      const p = document.createElement("p");
      let value = data[key];
      if (typeof value === "object") value = JSON.stringify(value);
      p.innerHTML = `<strong>${key}:</strong> ${value}`;
      div.appendChild(p);
    });
    container.appendChild(div);
  } else {
    const pre = document.createElement("pre");
    pre.innerText = data;
    container.appendChild(pre);
  }
}

document.getElementById("fetchBtn").addEventListener("click", async () => {
  const apiKey = document.getElementById("apiKey").value;
  if (!apiKey) return alert("Please enter API key!");

  let endpoint = apiSelect.value;
  const params = {};

  document.querySelectorAll("#parameterFields input").forEach(input => {
    const key = input.id.replace("param_", "");
    const value = input.value.trim();
    if (!value) return;
    if (endpoint.includes(`{${key}}`)) {
      endpoint = endpoint.replace(`{${key}}`, value);
    } else {
      params[key] = value;
    }
  });

  const container = document.getElementById("results");
  container.innerHTML = "Loading...";

  try {
    const res = await fetch("/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint, params, apiKey })
    });

    const response = await res.json();

    // Clear container first
    container.innerHTML = "";

    // Show total count at the top
    const countEl = document.createElement("p");
    countEl.innerHTML = `<strong>Total Rows:</strong> ${response.totalCount}`;
    container.appendChild(countEl);

    // Render the actual data below
    renderData(response.data);

  } catch (err) {
    container.innerHTML = "Error: " + err.message;
  }
});

