(async()=>{

	const countriesParent = document.querySelector('.card-row');
	const searchBar = document.querySelector('#search');
	const filterByRegion = document.querySelector('#region');
	const countryCards = document.querySelectorAll('.country-card');

	// get countries data from API
	const testAPI = async () => {
		try {
			const response = await fetch('https://restcountries.com/v3.1/all');
			const data = await response.json();
			console.log(data);
			return data;
		} catch (error){
			console.log(error);
		}
	}

	// render all countries
	const renderDefaultCountries = async () => {
		let countries = await testAPI();
		countriesParent.innerHTML = '';
		for (let i = 0; i < 20; i++){
			renderCountry(countries[i]);
		}
	}

	// render country card for each country
	const renderCountry = (country) => {
		if (country.name.common.length > 35) {
			country.name.common = country.name.common.slice(0, 35) + '...';
		}
		countriesParent.innerHTML += `
			<div class="column no-gap country-card">
				<div class="row no-padding">
					<img src="${country.flags.png}" alt="flag">
				</div>
				<div class="row card-info">
					<div class="column">
						<h3>${country.name.common}</h3>
						<p>Population: <span>${country.population}</span></p>
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

	// filter by region
	filterByRegion.addEventListener('change', async () => {
		let countries = await testAPI();
		let region = filterByRegion.value;
		if (region === 'all') {
			await renderDefaultCountries();
			return;
		}
		if (region === 'americas') {
			region = 'america';
		}
		countriesParent.innerHTML = '';
		for (let i = 0; i < countries.length; i++) {
			if (countries[i].continents[0].toLowerCase().includes(region.toLowerCase())) {
				renderCountry(countries[i]);
			}
		}
	});

	// redirect to country when country card is clicked
	countriesParent.addEventListener('click', (e) => {
		let countryName = e.target.closest('.country-card').querySelector('h3').textContent;
		window.location.href = `country.html?name=${countryName}`;
	});

	// render default countries on page load
	await renderDefaultCountries();

})();