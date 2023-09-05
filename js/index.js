import {modeSwitch} from "./main.js";

(async() => {
	const countriesParent = document.querySelector('.card-row');
	const searchBar = document.querySelector('#search');

	// get countries data from API
	const testAPI = async () => {
		try {
			const response = await fetch('https://restcountries.com/v3.1/all');
			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	// render all countries
	const renderDefaultCountries = async () => {
		let countries = await testAPI();
		countriesParent.innerHTML = '';
		for (let i = 0; i < 20; i++) {
			renderCountry(countries[i]);
		}
	}

	// format population with commas
	const formatPopulation = (pop) => {
		return pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	// render country card for each country
	const renderCountry = (country) => {
		if (country.name.common.length > 35) {
			country.name.common = country.name.common.slice(0, 35) + '...';
		}
		let population = formatPopulation(country.population);

		countriesParent.innerHTML += `
			<div class="column no-gap country-card">
				<div class="row no-padding">
					<img src="${country.flags.png}" alt="flag">
				</div>
				<div class="row card-info">
					<div class="column">
						<h3>${country.name.common}</h3>
						<p>Population: <span>${population}</span></p>
						<p>Region: <span>${country.continents[0]}</span></p>
						<p>Capital: <span>${country.capital}</span></p>
					</div>
				</div>
			</div>`;
	}

	// filter by search
	searchBar.addEventListener('keyup', async () => {
		let countries = await testAPI();
		let search = searchBar.value;
		countriesParent.innerHTML = '';
		for (let i = 0; i < countries.length; i++) {
			if (countries[i].name.common.toLowerCase().includes(search.toLowerCase())) {
				renderCountry(countries[i]);
			}
		}
	});

	// filter by region logic
	const filter = document.querySelector('.filter-by-region');
	const filterOptionsParent = document.querySelector('.options');
	const filterOptions = document.querySelectorAll('.option');

	document.addEventListener('DOMContentLoaded', () => {
		filter.addEventListener('click', () => {
			filterOptionsParent.classList.toggle('hide');
		});

		filterOptions.forEach((option) => {
			option.addEventListener('click', async ()=> {
				filterOptionsParent.classList.toggle('hide');

				let countries = await testAPI();
				let region = option.innerText.toLowerCase();
				if (region === 'all') {
					await renderDefaultCountries();
					return;
				}
				if (region === 'americas') {
					region = 'america';
				}
				countriesParent.innerHTML = '';
				for (let i = 0; i < countries.length; i++) {
					if (countries[i].continents[0].toLowerCase().includes(region)) {
						renderCountry(countries[i]);
					}
				}
			});
		});
	});

	// redirect to country when country card is clicked
	countriesParent.addEventListener('click', async (e) => {
		let countryName = e.target.closest('.country-card').querySelector('h3').textContent;
		window.location.href = `country.html?name=${countryName}`;
	});

	// execute default countries on page load
	await renderDefaultCountries();
	// function to allow dark mode and light mode switch to work
	modeSwitch();
})();