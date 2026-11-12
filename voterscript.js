const JSON_FILE = "data/voters.json";

// =====================================
// HTML ELEMENTS
// =====================================

const wardSelect = document.getElementById("wardSelect");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const voterTable = document.getElementById("voterTable");
const count = document.getElementById("count");
const emptyMessage = document.getElementById("emptyMessage");
const status = document.getElementById("status");

const familyContainer =
  document.getElementById("familyContainer");

const familyCount =
  document.getElementById("familyCount");

// =====================================
// STORE DATA
// =====================================

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

    Object.entries(allWards).forEach(
      ([wardKey, records]) => {

        if (!Array.isArray(records)) {
          console.warn(
            "Invalid ward data:",
            wardKey
          );
          return;
        }

        records.forEach(voter => {

          if (
            !voter ||
            typeof voter !== "object"
          ) {
            return;
          }

          allVoters.push({
            ...voter,
            ward_number:
              voter.ward_number ??
              Number(wardKey)
          });

        });

      }
    );

    createWardOptions();

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

    document.getElementById(
      "grandTotal"
    ).textContent = "0";

    if (familyContainer) {
      familyContainer.innerHTML = "";
    }

    if (familyCount) {
      familyCount.textContent =
        "0 Families";
    }
  }
}

// =====================================
// CREATE WARD DROPDOWN
// =====================================

function createWardOptions() {

  wardSelect.innerHTML = "";

  const allOption =
    document.createElement("option");

  allOption.value = "ALL";
  allOption.textContent = "All Wards";

  wardSelect.appendChild(allOption);

  const wards = Object.keys(allWards)
    .sort(
      (a, b) =>
        Number(a) - Number(b)
    );

  wards.forEach(ward => {

    const option =
      document.createElement("option");

    option.value = ward;

    option.textContent =
      "Ward " + ward;

    wardSelect.appendChild(option);
  });
}

// =====================================
// FILTER RECORDS
// =====================================

function filterRecords() {

  const selectedWard =
    wardSelect.value;

  if (selectedWard === "ALL") {

    voters = [...allVoters];

  } else {

    voters = allVoters.filter(
      voter =>
        String(
          voter.ward_number
        ) === selectedWard
    );
  }

  displayVoters();
}

// =====================================
// UPDATE STATISTICS
// =====================================

function updateStatistics(records) {

  const total = records.length;

  const male =
    records.filter(voter => {

      const gender =
        String(
          voter.gender || ""
        )
          .trim()
          .toLowerCase();

      return (
        gender === "male" ||
        gender === "m"
      );

    }).length;

  const female =
    records.filter(voter => {

      const gender =
        String(
          voter.gender || ""
        )
          .trim()
          .toLowerCase();

      return (
        gender === "female" ||
        gender === "f"
      );

    }).length;

  document.getElementById(
    "totalVoters"
  ).textContent =
    total.toLocaleString("en-IN");

  document.getElementById(
    "maleCount"
  ).textContent =
    male.toLocaleString("en-IN");

  document.getElementById(
    "femaleCount"
  ).textContent =
    female.toLocaleString("en-IN");
}

// =====================================
// FAMILY GROUPS
// =====================================

function updateFamilyGroups(records) {

  if (!familyContainer) return;

  familyContainer.innerHTML = "";

  const familyMap = {};

  records.forEach(voter => {

    const voterName =
      String(
        voter.voter_name || ""
      ).trim();

    if (!voterName) return;

    const parts =
      voterName.split(/\s+/);

    const surname =
      parts[
        parts.length - 1
      ];

    if (!familyMap[surname]) {

      familyMap[surname] = {
        male: 0,
        female: 0,
        total: 0
      };
    }

    const gender =
      String(
        voter.gender || ""
      )
        .trim()
        .toLowerCase();

    if (
      gender === "male" ||
      gender === "m"
    ) {
      familyMap[surname].male++;
    }

    if (
      gender === "female" ||
      gender === "f"
    ) {
      familyMap[surname].female++;
    }

    familyMap[surname].total++;
  });

  const families =
    Object.entries(familyMap)
      .sort(
        (a, b) =>
          b[1].total -
          a[1].total
      );

  familyCount.textContent =
    families.length.toLocaleString("en-IN") +
    " Families";

  if (families.length === 0) {

    familyContainer.innerHTML = `
      <div class="empty-message">
        No Family Groups Found
      </div>
    `;

    return;
  }

  families.forEach(
    ([surname, stats]) => {

      const card =
        document.createElement("div");

      card.className =
        "family-card";

      card.innerHTML = `
        <div class="family-name">
          ${surname} Family
        </div>

        <div class="family-stats">

          <div class="family-item">
            <span>Male</span>
            <strong class="family-male">
              👨 ${stats.male}
            </strong>
          </div>

          <div class="family-item">
            <span>Female</span>
            <strong class="family-female">
              👩 ${stats.female}
            </strong>
          </div>

        </div>

        <div class="family-total">
          Total Members :
          ${stats.total}
        </div>
      `;

      familyContainer.appendChild(
        card
      );
    }
  );
}

// =====================================
// DISPLAY VOTERS
// =====================================

function displayVoters() {

  const search =
    searchInput.value
      .trim()
      .toLowerCase();

  const filteredVoters =
    voters
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

        return searchableFields.some(
          value =>
            String(value ?? "")
              .toLowerCase()
              .includes(search)
        );
      })

      .sort((a, b) => {

        return String(
          a.voter_name || ""
        ).localeCompare(
          String(
            b.voter_name || ""
          ),
          undefined,
          {
            sensitivity:
              "base"
          }
        );
      });

  voterTable.innerHTML = "";

  filteredVoters.forEach(
    (voter, index) => {

      const row =
        document.createElement("tr");

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

        const cell =
          document.createElement("td");

        cell.textContent =
          value === null ||
          value === undefined ||
          value === ""
            ? "-"
            : String(value);

        row.appendChild(cell);
      });

      voterTable.appendChild(row);
    }
  );

  updateStatistics(filteredVoters);

  updateFamilyGroups(
    filteredVoters
  );

  count.textContent =
    filteredVoters.length.toLocaleString(
      "en-IN"
    ) + " Records";

  document.getElementById(
    "grandTotal"
  ).textContent =
    filteredVoters.length.toLocaleString(
      "en-IN"
    );

  emptyMessage.hidden =
    filteredVoters.length !== 0;
}

// =====================================
// EVENTS
// =====================================

wardSelect.addEventListener(
  "change",
  () => {

    searchInput.value = "";

    filterRecords();
  }
);

searchInput.addEventListener(
  "input",
  () => {

    displayVoters();
  }
);

clearBtn.addEventListener(
  "click",
  () => {

    searchInput.value = "";

    displayVoters();

    searchInput.focus();
  }
);

// =====================================
// INIT
// =====================================

loadVoters();
