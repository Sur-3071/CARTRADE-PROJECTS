function addCard() {
    const name = document.getElementById('name').value;
    const cardContainer = document.getElementById('cardContainer');

    const newCard = document.createElement('div');
    newCard.classList.add('card');

    // Create the card's inner HTML including the name and 30 checkboxes
    let checkboxesHTML = '';
    for (let i = 1; i <= 30; i++) {
        checkboxesHTML += `
            <div class="checkbox-container">
                <input type="checkbox" id="checkbox${i}" name="checkbox${i}">
                <label for="checkbox${i}">${i}</label>
            </div>
        `;
    }

    newCard.innerHTML = `
        <input type="text" value="${name}" disabled>
        <div class="checkbox-grid">
            ${checkboxesHTML}
        </div>
    `;

    cardContainer.appendChild(newCard);
}
