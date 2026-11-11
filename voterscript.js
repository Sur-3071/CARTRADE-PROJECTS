
const wardFiles = {
  "1": "data/ward-1.json",
  "2": "data/ward-2.json",
  "3": "data/ward-3.json",
  "4": "data/ward-4.json",
  "5": "data/ward-5.json",
  "6": "data/ward-6.json",
  "7": "data/ward-7.json",
  "8": "data/ward-8.json",
  "9": "data/ward-9.json",
  "10": "data/ward-10.json",
  "11": "data/ward-11.json",
  "12": "data/ward-12.json"
};

const wardSelect = document.getElementById("wardSelect");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const voterTable = document.getElementById("voterTable");
const count = document.getElementById("count");
const emptyMessage = document.getElementById("emptyMessage");
const status = document.getElementById("status");

let voters = [];
let currentWardData = null;

// Initialize ward dropdown
function initializeWards() {
  Object.keys(wardFiles).forEach(ward => {
    const option = document.createElement("option");

    option.value = ward;
    option.textContent = "Ward " + ward;

    wardSelect.appendChild(option);
  });
}

// Update ward information
function updateWardDetails(data) {
  document.getElementById("wardNumber").textContent =
    data.ward_number ?? "-";

  document.getElementById("panchayat").textContent =
    data.panchayat ?? "-";

  document.getElementById("mandal").textContent =
    data.mandal ?? "-";

  document.getElementById("district").textContent =
    data.district ?? "-";

  document.getElementById("constituency").textContent =
    data.assembly_constituency ?? "-";
}

// Load JSON for selected ward
async function loadWard(ward) {
  voterTable.innerHTML = "";
  status.hidden = true;
  emptyMessage.hidden = true;
  count.textContent = "Loading...";

  try {
    const response = await fetch(wardFiles[ward]);

    if (!response.ok) {
      throw new Error("Unable to load ward JSON file");
    }

    const data = await response.json();

    if (!Array.isArray(data.voters)) {
      throw new Error("Invalid voter JSON structure");
    }

    currentWardData = data;
    voters = data.voters.filter(voter =>
      typeof voter.voter_name === "string"
    );

    updateWardDetails(data);

    searchInput.value = "";

    displayVoters();

  } catch (error) {
    console.error(error);

    voters = [];
    currentWardData = null;

    count.textContent = "0 Records";
    voterTable.innerHTML = "";
    emptyMessage.hidden = false;
    status.hidden = false;
    status.textContent =
      "Error loading ward data. Please check the JSON file.";

    updateWardDetails({});
  }
}

// Display all voter records
function displayVoters() {
  const search = searchInput.value.trim().toLowerCase();

  const filteredVoters = voters
    .filter(voter =>
      voter.voter_name.toLowerCase().includes(search)
    )
    .sort((a, b) =>
      a.voter_name.localeCompare(
        b.voter_name,
        undefined,
        { sensitivity: "base" }
      )
    );

  voterTable.innerHTML = "";

  filteredVoters.forEach((voter, index) => {
    const row = document.createElement("tr");

    const values = [
      index + 1,
      voter.assembly_serial_no,
      voter.voter_no,
      voter.voter_name,
      voter.relation_type,
      voter.relation_name,
      voter.age,
      voter.gender,
      voter.house_no,
      voter.voter_id_no
    ];

    values.forEach(value => {
      const cell = document.createElement("td");

      cell.textContent =
        value === null || value === undefined ? "-" : value;

      row.appendChild(cell);
    });

    voterTable.appendChild(row);
  });

  count.textContent =
    filteredVoters.length + " Records";

  emptyMessage.hidden = filteredVoters.length !== 0;
}

// Ward selection
wardSelect.addEventListener("change", () => {
  loadWard(wardSelect.value);
});

// Live name search
searchInput.addEventListener("input", displayVoters);

// Clear search
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  displayVoters();
});

// Start website
initializeWards();

if (wardSelect.value) {
  loadWard(wardSelect.value);
}
