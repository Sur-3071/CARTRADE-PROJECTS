
const JSON_FILE = "data/voters.json";

// HTML Elements
const wardSelect = document.getElementById("wardSelect");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const voterTable = document.getElementById("voterTable");
const count = document.getElementById("count");
const emptyMessage = document.getElementById("emptyMessage");
const status = document.getElementById("status");

// Store all ward data
let allWards = {};
let voters = [];

// ===================================
// LOAD JSON FILE
// ===================================

async function loadVoters() {
  try {
    status.hidden = true;
    count.textContent = "Loading...";

    const response = await fetch(JSON_FILE);

    if (!response.ok) {
      throw new Error("Unable to load voters.json");
    }

    const data = await response.json();

    if (
      !data ||
      typeof data !== "object" ||
      Array.isArray(data)
    ) {
      throw new Error("Invalid JSON format. Expected ward-keyed object.");
    }

    allWards = data;

    createWardOptions();

    if (wardSelect.options.length > 0) {
      wardSelect.selectedIndex = 0;
      filterWard();
    } else {
      voters = [];
      displayVoters();
    }

  } catch (error) {
    console.error(error);

    allWards = {};
    voters = [];

    voterTable.innerHTML = "";
    count.textContent = "0 Records";

    status.hidden = false;
    status.textContent =
      "Error loading voter data. Check data/voters.json.";

    emptyMessage.hidden = false;
    emptyMessage.textContent = "Unable to load voter records.";
  }
}

// ===================================
// CREATE WARD DROPDOWN
// ===================================

function createWardOptions() {
  wardSelect.innerHTML = "";

  const wards = Object.keys(allWards)
    .sort((a, b) => Number(a) - Number(b));

  wards.forEach(ward => {
    const option = document.createElement("option");

    option.value = ward;
    option.textContent = "Ward " + ward;

    wardSelect.appendChild(option);
  });
}

// ===================================
// FILTER SELECTED WARD
// ===================================

function filterWard() {
  const selectedWard = wardSelect.value;

  const wardData = allWards[selectedWard];

  voters = Array.isArray(wardData)
    ? wardData.filter(voter =>
        voter && typeof voter === "object"
      )
    : [];

  searchInput.value = "";

  updateWardDetails(selectedWard);

  displayVoters();
}

// ===================================
// UPDATE WARD DETAILS
// ===================================

function updateWardDetails(ward) {
  const wardNumber = document.getElementById("wardNumber");
  const panchayat = document.getElementById("panchayat");
  const mandal = document.getElementById("mandal");
  const district = document.getElementById("district");
  const constituency = document.getElementById("constituency");

  if (wardNumber) {
    wardNumber.textContent = ward || "-";
  }

  // These details are not present in the
  // current ward-keyed JSON structure.

  if (panchayat) panchayat.textContent = "-";
  if (mandal) mandal.textContent = "-";
  if (district) district.textContent = "-";
  if (constituency) constituency.textContent = "-";
}

// ===================================
// DISPLAY VOTER TABLE
// ===================================

function displayVoters() {

  const search = searchInput.value
    .trim()
    .toLowerCase();

  // Search by voter name and sort A-Z
  const filteredVoters = voters
    .filter(voter => {
      const name = String(voter.voter_name || "")
        .toLowerCase();

      return name.includes(search);
    })
    .sort((a, b) => {
      return String(a.voter_name || "").localeCompare(
        String(b.voter_name || ""),
        undefined,
        { sensitivity: "base" }
      );
    });

  // Clear previous table
  voterTable.innerHTML = "";

  // Create table rows
  filteredVoters.forEach((voter, index) => {

    const row = document.createElement("tr");

    // Exact JSON field names
    const values = [
      index + 1,              // S.No
      voter.voter_no,         // Voter No
      voter.voter_id_no,      // Voter ID No
      voter.voter_name,       // Voter Name
      voter.relation_type,    // Relation Type
      voter.relation_name,   // Relation Name
      voter.age,              // Age
      voter.gender,           // Gender
      voter.house_no          // House No
    ];

    values.forEach(value => {

      const cell = document.createElement("td");

      cell.textContent =
        value === null ||
        value === undefined ||
        value === ""
          ? "-"
          : value;

      row.appendChild(cell);

    });

    voterTable.appendChild(row);
  });

  // Update total records
  count.textContent =
    filteredVoters.length + " Records";

  // Show empty message
  emptyMessage.hidden =
    filteredVoters.length !== 0;
}

// ===================================
// WARD CHANGE EVENT
// ===================================

wardSelect.addEventListener("change", () => {
  filterWard();
});

// ===================================
// LIVE NAME SEARCH
// ===================================

searchInput.addEventListener("input", () => {
  displayVoters();
});

// ===================================
// CLEAR SEARCH
// ===================================

clearBtn.addEventListener("click", () => {

  searchInput.value = "";

  displayVoters();

  searchInput.focus();

});

// ===================================
// START WEBSITE
// ===================================

loadVoters();
