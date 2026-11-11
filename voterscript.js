
const JSON_FILE = "data/voters.json";

// HTML Elements
const wardSelect = document.getElementById("wardSelect");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const voterTable = document.getElementById("voterTable");
const count = document.getElementById("count");
const emptyMessage = document.getElementById("emptyMessage");
const status = document.getElementById("status");

// Store data
let allWards = {};
let allVoters = [];
let voters = [];

// =====================================
// LOAD JSON
// =====================================

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
      throw new Error("Invalid JSON structure");
    }

    allWards = data;
    allVoters = [];

    // Convert ward object into one voter array
    Object.entries(allWards).forEach(([wardKey, records]) => {

      if (!Array.isArray(records)) {
        console.warn("Invalid ward data:", wardKey);
        return;
      }

      records.forEach(voter => {

        if (!voter || typeof voter !== "object") return;

        allVoters.push({
          ...voter,
          ward_number: voter.ward_number ?? Number(wardKey)
        });

      });

    });

    // Generate ward dropdown
    createWardOptions();

    // Show all wards initially
    wardSelect.value = "ALL";

    filterRecords();

  } catch (error) {

    console.error(error);

    allWards = {};
    allVoters = [];
    voters = [];

    voterTable.innerHTML = "";
    count.textContent = "0 Records";

    status.hidden = false;
    status.textContent =
      "Unable to load voter data. Check data/voters.json.";

    emptyMessage.hidden = false;
    emptyMessage.textContent =
      "Unable to load voter records.";

    updateStatistics([]);
    document.getElementById("grandTotal").textContent = "0";

  }

}

// =====================================
// CREATE WARD DROPDOWN
// =====================================

function createWardOptions() {

  wardSelect.innerHTML = "";

  // All wards option
  const allOption = document.createElement("option");

  allOption.value = "ALL";
  allOption.textContent = "All Wards";

  wardSelect.appendChild(allOption);

  // Get ward keys from JSON
  const wards = Object.keys(allWards)
    .sort((a, b) => Number(a) - Number(b));

  wards.forEach(ward => {

    const option = document.createElement("option");

    option.value = ward;
    option.textContent = "Ward " + ward;

    wardSelect.appendChild(option);

  });

}

// =====================================
// FILTER BY WARD
// =====================================

function filterRecords() {

  const selectedWard = wardSelect.value;

  if (selectedWard === "ALL") {

    voters = [...allVoters];

  } else {

    voters = allVoters.filter(voter =>
      String(voter.ward_number) === selectedWard
    );

  }

  // Update statistics for selected ward
  updateStatistics(voters);

  // Update table
  displayVoters();

}

// =====================================
// UPDATE STATISTICS
// =====================================

function updateStatistics(records) {

  const total = records.length;

  const male = records.filter(voter => {

    const gender = String(voter.gender || "")
      .trim()
      .toLowerCase();

    return gender === "male" || gender === "m";

  }).length;

  const female = records.filter(voter => {

    const gender = String(voter.gender || "")
      .trim()
      .toLowerCase();

    return gender === "female" || gender === "f";

  }).length;

  document.getElementById("totalVoters").textContent =
    total.toLocaleString("en-IN");

  document.getElementById("maleCount").textContent =
    male.toLocaleString("en-IN");

  document.getElementById("femaleCount").textContent =
    female.toLocaleString("en-IN");

}

// =====================================
// SEARCH AND DISPLAY TABLE
// =====================================

function displayVoters() {

  const search = searchInput.value
    .trim()
    .toLowerCase();

  // Search across voter fields
  const filteredVoters = voters
    .filter(voter => {

      const searchableFields = [

        voter.voter_name,
        voter.voter_no,
        voter.voter_id_no,
        voter.relation_type,
        voter.relation_name,
        voter.house_no,
        voter.gender,
        voter.age,
        voter.ward_number

      ];

      return searchableFields.some(value =>
        String(value ?? "")
          .toLowerCase()
          .includes(search)
      );

    })

    // Alphabetical sorting
    .sort((a, b) => {

      return String(a.voter_name || "")
        .localeCompare(
          String(b.voter_name || ""),
          undefined,
          { sensitivity: "base" }
        );

    });

  // Clear previous rows
  voterTable.innerHTML = "";

  // Generate table rows
  filteredVoters.forEach((voter, index) => {

    const row = document.createElement("tr");

    const values = [

      index + 1,
      voter.ward_number,
      voter.voter_no,
      voter.voter_id_no,
      voter.voter_name,
      voter.relation_type,
      voter.relation_name,
      voter.age,
      voter.gender,
      voter.house_no

    ];

    values.forEach(value => {

      const cell = document.createElement("td");

      cell.textContent =
        value === null ||
        value === undefined ||
        value === ""
          ? "-"
          : String(value);

      row.appendChild(cell);

    });

    voterTable.appendChild(row);

  });

  // Update filtered result count
  count.textContent =
    filteredVoters.length.toLocaleString("en-IN") +
    " Records";

  // Grand total of currently displayed records
  document.getElementById("grandTotal").textContent =
    filteredVoters.length.toLocaleString("en-IN");

  // Empty results message
  emptyMessage.hidden =
    filteredVoters.length !== 0;

}

// =====================================
// EVENT LISTENERS
// =====================================

// Ward selection
wardSelect.addEventListener("change", () => {

  searchInput.value = "";

  filterRecords();

});

// Live search
searchInput.addEventListener("input", () => {

  displayVoters();

});

// Clear search
clearBtn.addEventListener("click", () => {

  searchInput.value = "";

  displayVoters();

  searchInput.focus();

});

// =====================================
// INITIALIZE WEBSITE
// =====================================

loadVoters();
