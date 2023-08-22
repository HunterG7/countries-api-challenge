////////////////////////
// Country Page Logic //
////////////////////////

const backBtn = document.querySelector('.back-btn');
const URL = document.URL;
const currentCountry = URL.substring(65).replaceAll('%20', ' ');
const countryCard = document.querySelector('.single-country-card');

// go back to home page
backBtn.addEventListener('click', ()=>{
	window.location.href = 'index.html';
});

// get country info from api
const getCountryInfo = async (country) => {
	try {
		const response = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

// render country page
const renderCountryPage = async () => {
	countryCard.innerHTML = '';
	let countryData = await getCountryInfo(currentCountry);
	countryData = countryData[0];
	console.log(countryData);

	let currencies = countryData.currencies;
	console.log(currencies);

	let HTML = document.createElement('div');
	HTML.classList.add('row', 'no-padding', 'gap-5');
	HTML.innerHTML = `
		<!-- country flag -->
		<div class="column">
			<img class="flag" src="${countryData.flags.png}" alt="${countryData.name.common} flag">
		</div>

		<!-- country info -->
		<div class="column justify-center gap-30">
			<div class="row no-padding country-name">
				<h2>${countryData.name.common}</h2>
			</div>
			<div class="row no-padding country-info">
				<div class="column gap-10">
					<p>Native Name: <span></span></p>
					<p>Population <span>${countryData.population}</span></p>
					<p>Region: <span>${countryData.region}</span></p>
					<p>Sub Region: <span>${countryData.subregion}</span></p>
					<p>Capital: <span>${countryData.capital[0]}</span></p>
				</div>
				<div class="column gap-10">
					<p>Top Level Domain: <span>${countryData.tld[0]}</span></p>
					<p>Currencies: <span>${countryData.currencies}</span></p>
					<p>Languages: <span>${countryData.languages}</span></p>
				</div>
			</div>
			<div class="row no-padding country-info">
				<p>Border Countries:</p>
			</div>
		</div>`;

	countryCard.append(HTML);
}

// run functions on page load
await renderCountryPage();