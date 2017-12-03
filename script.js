var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = $('#countries');
$.ajaxSetup({ cache: false });

$('#search').click(searchCountries);

function searchCountries() {
	var countryName = $('#country-name').val();
	if(!countryName.length) countryName = 'Poland';

	$.ajax({
		url: url + countryName,
		dataType: 'json',
		method: 'GET',
		success: showCountriesList
	});
}

var rightSide = $('#right-side');
rightSide.hide();

function showCountriesList(resp) {
	countriesList.empty();
	resp.forEach(function(item){
		var country = item;
		var $itemFlagMini = $('<img>').attr({
			src: item.flag,
			alt: 'Flag of ' + item.name,
			title: 'Flag of ' + item.name, 
			class: 'image-mini'
		});
		var $listItem = $('<li>').append($itemFlagMini).append(item.name);

		$listItem.appendTo(countriesList);

		$listItem.hover(function() {
			$(this).toggleClass('text-primary');
		});

		$listItem.on('click', function() {
			rightSide.show();

			var hideElem = $('.text-muted');
			hideElem.on('click', function() {
				rightSide.hide();
			});

			$('#country-flag').attr({
				src: country.flag,
				alt: 'Flag of ' + country.name,
				title: 'Flag of ' + country.name
			});
			$('#country-Name').text(country.name);
			$('#country-native').text(country.nativeName);
			$('#country-capital').text(country.capital);
			$('#country-region').text(country.region);
			$('#country-subregion').text(country.subregion);
			$('#country-population').text(country.population);
			$('#country-currency').text(country.currencies[0].name + ' (' + country.currencies[0].symbol + ')');
			$('#country-lang').text(country.languages[0].name + ' (' + country.languages[0].nativeName + ')');
		});

	});
}