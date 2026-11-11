
const JSON_FILE = "data/voters.json";

// HTML elements
const wardSelect = document.getElementById("wardSelect");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const voterTable = document.getElementById("voterTable");
const count = document.getElementById("count");
const emptyMessage = document.getElementById("emptyMessage");
const status = document.getElementById("status");

let allWards = {};
let allVoters = [];
let voters = [];

// =====================================
// LOAD COMPLETE JSON DATABASE
// =====================================

async function loadVoters() {
  try {
    status.hidden = true;
    count.textContent = "Loading...";

    const response = await fetch(JSON_FILE);

    if (!response.ok) {
      throw new Error("Cannot load voters.json");
    }

    const data = await response.json();

    if (
      !data ||
      typeof data !== "object" ||
      Array.isArray(data)
    ) {
      throw new Error("Expected ward-keyed JSON object");
    }

    allWards = data;
    allVoters = [];

    // Convert ward-keyed object into one searchable list
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

    createWardOptions();

    // SHOW ALL RECORDS INITIALLY
    wardSelect.value = "ALL";
    filterRecords();

  } catch (error) {
    console.error(error);

    allVoters = [];
    voters = [];

    voterTable.innerHTML = "";
    count.textContent = "0 Records";

    status.hidden = false;
    status.textContent =
      "Unable to load JSON. Check data/voters.json.";

    emptyMessage.hidden = false;
    emptyMessage.textContent = "Unable to load voter records.";
  }
}

// =====================================
// WARD DROPDOWN
// =====================================

function createWardOptions() {

  wardSelect.innerHTML = "";

  // All wards option
  const allOption = document.createElement("option");
  allOption.value = "ALL";
  allOption.textContent = "All Wards";

  wardSelect.appendChild(allOption);

  // Automatically get ward numbers from JSON
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
// FILTER BY WARD AND SEARCH
// =====================================

function filterRecords() {

  const selectedWard = wardSelect.value;

  // All wards or selected ward
  if (selectedWard === "ALL") {

    voters = [...allVoters];

  } else {

    voters = allVoters.filter(voter =>
      String(voter.ward_number) === selectedWard
    );

  }

  displayVoters();
}

// =====================================
// SEARCH AND SORT
// =====================================

function displayVoters() {

  const search = searchInput.value
    .trim()
    .toLowerCase();

  const filteredVoters = voters
    .filter(voter => {

      const searchableFields = [
        voter.voter_name,
        voter.voter_no,
        voter.voter_id_no,
        voter.relation_name,
        voter.relation_type,
        voter.house_no
      ];

      return searchableFields.some(value =>
        String(value ?? "").toLowerCase().includes(search)
      );

    })

    .sort((a, b) => {

      return String(a.voter_name ?? "").localeCompare(
        String(b.voter_name ?? ""),
        undefined,
        { sensitivity: "base" }
      );

    });

  // Clear old rows
  voterTable.innerHTML = "";

  // Generate table rows
  filteredVoters.forEach((voter, index) => {

    const row = document.createElement("tr");

    // Exact field names from your JSON
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

      // Preserve numbers and strings correctly
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

  // Update total count
  count.textContent =
    filteredVoters.length + " Records";

  // Empty results
  emptyMessage.hidden =
    filteredVoters.length !== 0;

}

// =====================================
// EVENT LISTENERS
// =====================================

// Ward selection
wardSelect.addEventListener("change", filterRecords);

// Live search across selected ward or all wards
searchInput.addEventListener("input", displayVoters);

// Clear search and show all records in selected ward
clearBtn.addEventListener("click", () => {

  searchInput.value = "";

  displayVoters();

  searchInput.focus();

});

// =====================================
// START WEBSITE
// =====================================

loadVoters();
