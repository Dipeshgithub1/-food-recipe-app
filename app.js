document.getElementById('searchForm').addEventListener('submit', searchMeal);
document.getElementById('searchByLetterButton').addEventListener('click', searchByLetter);

async function showLoadingIndicator() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '<p>Loading...</p>';
}

async function searchMeal(event) {
    event.preventDefault();
    showLoadingIndicator();
    const searchBox = document.querySelector('.searchBox');
    const query = searchBox.value.trim();

    if (!query) {
        alert('Please enter a meal name');
        searchBox.focus();
        return;
    }

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayResults(data);
        searchBox.value = ''; // Clear input after search
    } catch (error) {
        console.error('Error fetching the data:', error);
        alert('Failed to fetch data. Please try again.');
    }
}

async function searchByLetter() {
    showLoadingIndicator();
    const letterBox = document.querySelector('.letterBox');
    const letter = letterBox.value.trim().toLowerCase();

    if (!letter || letter.length !== 1) {
        alert('Please enter a single letter');
        return;
    }

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayResults(data);
        letterBox.value = ''; // Clear input after search
    } catch (error) {
        console.error('Error fetching the data:', error);
        alert('Failed to fetch data. Please try again.');
    }
}

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (data.meals) {
        data.meals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.className = 'recipe-card';
            mealCard.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"> 
                <h3>${meal.strMeal}</h3>
                <p>${meal.strArea}</p>
                <p>${meal.strCategory}</p>
                <a href="${meal.strSource}" class="view-recipe-button" target="_blank">View Recipe</a>
            `;
            resultsContainer.appendChild(mealCard);
        });
    } else {
        resultsContainer.innerHTML = '<p>No meals found.</p>';
    }
}


