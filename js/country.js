import {modeSwitch} from "./main.js";

const backBtn = document.querySelector('.back-btn');
const URL = document.URL;
let currentCountry = URL.substring(69).replaceAll('%20', ' ');
const countryCard = document.querySelector('.single-country-card');

// go back to home page
backBtn.addEventListener('click', ()=>{
	window.location.href = 'index.html';
});

// get country info from api
const getCountryInfo = async (country) => {
	try {
		const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
		const data = await response.json();

		if (data[0] === undefined){
			try {
				const response = await fetch(`https://restcountries.com/v3.1/alpha/${country}`);
				const data = await response.json();
				return data;
			} catch (error) {
				console.log(error);
			}
		}

		return data;
	} catch (error) {
		console.log(error);
	}
}

// get country's native name
const getNativeName = (countryData) => {
	let nativeNameObj = countryData.name.nativeName;
	let nativeName = Object.values(nativeNameObj)[0].common;
	return nativeName;
}

// get country currency
const getCurrency = (countryData) => {
	let currenciesObject = countryData.currencies;
	let targetCurrency = Object.keys(currenciesObject)[0];
	let currencyName = currenciesObject[targetCurrency].name;
	return currencyName;
}

// get country's languages
const getLanguage = (countryData) => {
	let languagesArray = Object.values(countryData.languages);
	let languages = '';
	for (let i = 0; i < languagesArray.length; i++){
		if (i === languagesArray.length - 1){
			languages += languagesArray[i];
		} else {
			languages += languagesArray[i] + ', ';
		}
	}
	return languages;
}

// get border countries
const getBorderCountries = (countryData) => {
	if (countryData.borders === undefined){
		return '---';
	} else {
		let borderCountriesArr = (countryData.borders);
		let borderCountriesFormatted = [];
		borderCountriesArr.forEach((country) => {
			country = '<div class="border-country column shrink justify-center">' + country + '</div>';
			borderCountriesFormatted.push(country);
		});
		let borderCountries = borderCountriesFormatted.join(' ');
		return borderCountries;
	}
}

// format population with commas
const formatPopulation = (pop) => {
	return pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// render country page
const renderCountryPage = async () => {
	countryCard.innerHTML = '';
	let countryData = await getCountryInfo(currentCountry);
	countryData = countryData[0];

	let nativeName = getNativeName(countryData);
	let currencyName = getCurrency(countryData);
	let languages = getLanguage(countryData);
	let borderCountries = getBorderCountries(countryData);
	let population = formatPopulation(countryData.population);

	let HTML = document.createElement('div');
	HTML.classList.add('row', 'no-padding', 'gap-5');
	HTML.innerHTML = `
		<!-- country flag -->
		<div class="column flag-wrapper">
			<img class="flag" src="${countryData.flags.png}" alt="${countryData.name.common} flag">
		</div>

		<!-- country info -->
		<div class="column justify-center gap-30">
			<div class="row no-padding country-name">
				<h2>${countryData.name.common}</h2>
			</div>
			<div class="row no-padding country-info">
				<div class="column gap-10">
					<p>Native Name: <span>${nativeName}</span></p>
					<p>Population <span>${population}</span></p>
					<p>Region: <span>${countryData.region}</span></p>
					<p>Sub Region: <span>${countryData.subregion}</span></p>
					<p>Capital: <span>${countryData.capital[0]}</span></p>
				</div>
				<div class="column gap-10">
					<p>Top Level Domain: <span>${countryData.tld[0]}</span></p>
					<p>Currencies: <span>${currencyName}</span></p>
					<p>Languages: <span>${languages}</span></p>
				</div>
			</div>
			<div class="row align-center no-padding border-countries">
				<p>Border Countries: <span>${borderCountries}</span></p>
			</div>
		</div>`;

	countryCard.append(HTML);
	await borderCountryFunctionality();
}

// redirect to specific country view when border country is clicked
const borderCountryFunctionality = async () => {
	let borderCountriesNodes = document.querySelectorAll('.border-country');
	borderCountriesNodes.forEach((node)=>{
		node.addEventListener('click', async ()=>{
			window.location.href = `country.html?name=${node.innerHTML}`;
		});
	});
}

// run functions on page load
await renderCountryPage();
// function to allow dark mode and light mode switch to work
modeSwitch();