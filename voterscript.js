
const JSON_FILE = "data/voters.json";

let allWards = {};
let voters = [];

async function loadVoters() {
  try {
    const response = await fetch(JSON_FILE);

    if (!response.ok) {
      throw new Error("JSON file not found");
    }

    allWards = await response.json();

    wardSelect.innerHTML = "";

    Object.keys(allWards)
      .sort((a, b) => Number(a) - Number(b))
      .forEach(ward => {
        const option = document.createElement("option");
        option.value = ward;
        option.textContent = "Ward " + ward;
        wardSelect.appendChild(option);
      });

    filterWard();

  } catch (error) {
    console.error(error);
    status.hidden = false;
    status.textContent = "Unable to load voter data.";
  }
}

function filterWard() {
  const selectedWard = wardSelect.value;

  voters = allWards[selectedWard] || [];

  searchInput.value = "";

  displayVoters();
}

function displayVoters() {
  const search = searchInput.value.trim().toLowerCase();

  const filteredVoters = voters
    .filter(voter =>
      (voter.voter_name || "").toLowerCase().includes(search)
    )
    .sort((a, b) =>
      a.voter_name.localeCompare(b.voter_name)
    );

  voterTable.innerHTML = "";

  filteredVoters.forEach((voter, index) => {
    const row = document.createElement("tr");

    const values = [
      index + 1,
      voter.assembly_sl_no,
      voter.sl_no,
      voter.voter_name,
      voter.relation_type,
      voter.relation_name,
      voter.age,
      voter.gender,
      voter.house_no,
      voter.voter_id
    ];

    values.forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value ?? "-";
      row.appendChild(cell);
    });

    voterTable.appendChild(row);
  });

  count.textContent = filteredVoters.length + " Records";
  emptyMessage.hidden = filteredVoters.length !== 0;
}

wardSelect.addEventListener("change", filterWard);
searchInput.addEventListener("input", displayVoters);

loadVoters();
