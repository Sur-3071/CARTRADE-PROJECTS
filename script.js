document.addEventListener('DOMContentLoaded', () => {
    const auth = document.getElementById('auth');
    const sellerDashboard = document.getElementById('sellerDashboard');
    const buyerDashboard = document.getElementById('buyerDashboard');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const propertyForm = document.getElementById('propertyForm');
    const propertiesList = document.getElementById('propertiesList');
    const availableProperties = document.getElementById('availableProperties');
    const filterInput = document.getElementById('filter');
    const applyFilterButton = document.getElementById('applyFilter');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');

    let currentUser = null;
    let properties = [];
    let currentPage = 1;
    const propertiesPerPage = 5;

    function sendEmail(to, subject, body) {
        // Simulate sending an email
        console.log(`Sending email to ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body: ${body}`);
    }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        const newUser = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phoneNumber: formData.get('phoneNumber'),
            password: formData.get('password'),
            role: formData.get('role'),
        };
        console.log('Registered user:', newUser);
        alert('Registration successful!');
        registerForm.reset();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        currentUser = {
            email: formData.get('email'),
            password: formData.get('password'),
            role: 'buyer', // Simulating login for a buyer
        };
        console.log('Logged in user:', currentUser);
        auth.classList.add('hidden');
        if (currentUser.role === 'seller') {
            sellerDashboard.classList.remove('hidden');
        } else {
            buyerDashboard.classList.remove('hidden');
            displayProperties();
        }
    });

    propertyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(propertyForm);
        const newProperty = {
            title: formData.get('title'),
            description: formData.get('description'),
            address: formData.get('address'),
            rentAmount: formData.get('rentAmount'),
            area: formData.get('area'),
            numberOfBedrooms: formData.get('numberOfBedrooms'),
            numberOfBathrooms: formData.get('numberOfBathrooms'),
            nearbyAmenities: formData.get('nearbyAmenities').split(',').map(item => item.trim()),
            sellerEmail: currentUser.email,
            likes: 0,
        };
        properties.push(newProperty);
        console.log('New property added:', newProperty);
        displayProperties();
        propertyForm.reset();
    });

    applyFilterButton.addEventListener('click', () => {
        const filter = filterInput.value.toLowerCase();
        displayProperties(filter);
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayProperties();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(properties.length / propertiesPerPage)) {
            currentPage++;
            displayProperties();
        }
    });

    function displayProperties(filter = '') {
        propertiesList.innerHTML = '';
        availableProperties.innerHTML = '';
        const start = (currentPage - 1) * propertiesPerPage;
        const end = start + propertiesPerPage;
        const filteredProperties = properties.filter(property => propertyMatchesFilter(property, filter));
        const paginatedProperties = filteredProperties.slice(start, end);

        paginatedProperties.forEach(property => {
            const propertyElement = createPropertyElement(property);
            if (currentUser.role === 'seller') {
                propertiesList.appendChild(propertyElement);
            } else {
                availableProperties.appendChild(propertyElement);
            }
        });

        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === Math.ceil(filteredProperties.length / propertiesPerPage);
        currentPageSpan.textContent = currentPage;
    }

    function propertyMatchesFilter(property, filter) {
        return Object.values(property).some(value =>
            Array.isArray(value)
                ? value.some(item => item.toLowerCase().includes(filter))
                : value.toString().toLowerCase().includes(filter)
        );
    }

    function createPropertyElement(property) {
        const propertyDiv = document.createElement('div');
        propertyDiv.className = 'property';
        propertyDiv.innerHTML = `
            <h4>${property.title}</h4>
            <p>${property.description}</p>
            <p><strong>Address:</strong> ${property.address}</p>
            <p><strong>Rent:</strong> $${property.rentAmount}</p>
            <p><strong>Area:</strong> ${property.area} sq ft</p>
            <p><strong>Bedrooms:</strong> ${property.numberOfBedrooms}</p>
            <p><strong>Bathrooms:</strong> ${property.numberOfBathrooms}</p>
            <p><strong>Nearby:</strong> ${property.nearbyAmenities.join(', ')}</p>
            <p><strong>Likes:</strong> <span id="likeCount-${property.title}">${property.likes}</span></p>
        `;
        if (currentUser.role === 'seller') {
            propertyDiv.innerHTML += `
                <button onclick="editProperty('${property.title}')">Edit</button>
                <button onclick="deleteProperty('${property.title}')">Delete</button>
            `;
        } else {
            propertyDiv.innerHTML += `
                <button onclick="likeProperty('${property.title}')">Like</button>
                <button onclick="interestedInProperty('${property.title}')">I'm Interested</button>
            `;
        }
        return propertyDiv;
    }

    window.editProperty = (title) => {
        const property = properties.find(p => p.title === title);
        if (property) {
            Object.keys(property).forEach(key => {
                if (propertyForm[key]) {
                    propertyForm[key].value = Array.isArray(property[key]) ? property[key].join(', ') : property[key];
                }
            });
        }
    };

    window.deleteProperty = (title) => {
        properties = properties.filter(p => p.title !== title);
        displayProperties();
    };

    window.likeProperty = (title) => {
        const property = properties.find(p => p.title === title);
        if (property) {
            property.likes++;
            document.getElementById(`likeCount-${title}`).textContent = property.likes;
        }
    };

    window.interestedInProperty = (title) => {
        const property = properties.find(p => p.title === title);
        if (!currentUser) {
            alert('Please log in to view seller details.');
            return;
        }

        const buyerEmail = currentUser.email;
        const sellerEmail = property.sellerEmail;

        alert(`Seller email: ${sellerEmail}`);
        sendEmail(buyerEmail, 'Interested in Property', `You are interested in the property titled "${property.title}". Contact the seller at: ${sellerEmail}`);
        sendEmail(sellerEmail, 'Buyer Interested in Property', `A buyer is interested in your property titled "${property.title}". Contact the buyer at: ${buyerEmail}`);
    };

    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('invalid');
            } else {
                input.classList.remove('invalid');
            }
        });
        return isValid;
    }

    registerForm.addEventListener('submit', (e) => {
        if (!validateForm(registerForm)) {
            e.preventDefault();
            alert('Please fill out all required fields.');
        }
    });

    loginForm.addEventListener('submit', (e) => {
        if (!validateForm(loginForm)) {
            e.preventDefault();
            alert('Please fill out all required fields.');
        }
    });

    propertyForm.addEventListener('submit', (e) => {
        if (!validateForm(propertyForm)) {
            e.preventDefault();
            alert('Please fill out all required fields.');
        }
    });
});
