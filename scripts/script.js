// Name Space
const plantApp = {};

plantApp.apiToken = 'Wm9LK3NsZHhXQWFRSTFJdGxidStjZz09';
plantApp.baseUrl = `http://trefle.io/api/plants`;

plantApp.retrieveData = () => {
	$.ajax({
		url: `https://proxy.hackeryou.com`,
		method: `GET`,
		dataType: `json`,
		data: {
			reqUrl: plantApp.baseUrl,
			params: {
				token: plantApp.apiToken,
				format: `json`,
				q: plantApp.userSearch,
				complete_data: true,
				page_size: 10,
			},
		},
	}).then((request) => {
		plantApp.firstCall(request);
	});
};

// Stores all endpoints needed based on user query
plantApp.firstCall = (getLink) => {
	plantApp.idArray = getLink.map((data) => {
		return data.link;
	});

	// Checks if the 1st api call returned any results
	plantApp.idArray.length > 0
		? plantApp.secondCall()
		: $('.animeText')
				.text(`Sorry we couldn't find ${plantApp.userSearch}`)
				.show();
};

// Define the secondCall function which will map over the plantApp.idArray that we got back from our first API call and store the promises
plantApp.secondCall = () => {
	plantApp.storedPromises = plantApp.idArray.map((submitUrl) => {
		return $.ajax({
			url: `https://proxy.hackeryou.com`,
			method: `GET`,
			dataType: `json`,
			data: {
				reqUrl: submitUrl,
				params: {
					token: plantApp.apiToken,
					format: `json`,
				},
			},
		}).catch((e) => null);
	});
	plantApp.displayContentToPage();
};

// Takes the promises from the 2nd api call spreads them and then loops over each one to display the info to the user
plantApp.displayContentToPage = () => {
	let all = Promise.all(plantApp.storedPromises);
	all
		.then((getValues) => {
			const justTheGoodStuff = getValues.filter((items) => items != null);

			justTheGoodStuff.forEach((plantObject) => {
				let moisture = plantApp.checkNull(
					plantObject.main_species.growth.moisture_use
				);
				let fire = plantApp.checkNull(
					plantObject.main_species.growth.fire_tolerance
				);
				let native = plantApp.checkNull(plantObject.native_status);

				let plantImage = plantObject.images;
				// checks if there are any images in the array
				plantImage.length > 0
					? (plantImage = plantObject.images[0].url)
					: (plantImage = './imgs/missingImage.jpg');

				const htmlBox = `
			<div class="plantsInfoBox" tabindex="0">
				<div class=topText>
					<h2>${plantObject.common_name}</h2>
					<h3>- ${plantObject.scientific_name} -</h3>
				</div>	
                    <a href="${plantObject.main_species.sources[0].source_url}"><img src="${plantImage}" alt="${plantObject.common_name}"></a>
					<ul>
                        <li>More Info: <span><a href="${plantObject.main_species.sources[0].source_url}">${plantObject.main_species.sources[0].source_url}</a></span></li>
						<li>Native Statues: <span>${native}</span></li>
						<li>Fire Tolerance: <span>${fire}</span></li>
						<li>Moisture Use: <span>${moisture}</span></li>
                    </ul>
				</div>
			`;

				$('.plantWrapper').append(htmlBox);
			});
		})
		.catch((err) => {
			$('.animeText').text(`Something Went Wrong, Try Again`).show();
		});
};

// Checks for nulls and replaces the value with Unknown
plantApp.checkNull = (str) => (str ? str : 'Unknown');

plantApp.animation = () => {
	const textWrapper = document.querySelector('p');
	textWrapper.innerHTML = textWrapper.textContent.replace(
		/\S/g,
		"<span class='letter'>$&</span>"
	);

	anime
		.timeline({ loop: true })
		.add({
			targets: '.animeText .letter',
			scale: [4, 1],
			opacity: [0, 1],
			translateZ: 0,
			easing: 'easeOutExpo',
			duration: 950,
			delay: function (el, i) {
				return i * 70;
			},
		})
		.add({
			targets: '.animeText',
			opacity: 0,
			duration: 1000,
			easing: 'easeOutExpo',
			delay: 1000,
		});
};

// allows user to submit search query and fetches info from api
plantApp.search = () => {
	$('#searchSomething').on('click', function (e) {
		e.preventDefault();
		plantApp.userSearch = $('#searchPlants').val();

		if (plantApp.userSearch.length < 1) {
			$('#searchPlants').effect('shake', {
				direction: 'up',
				times: 3,
				distance: 5,
			});
		} else {
			$('.animeText').hide();
			$('.plantWrapper').empty();
			plantApp.retrieveData();
			$('#searchPlants').val('');
		}
	});
};

// runs loading screen gif while ajax call is being made
plantApp.displayLoadingScreen = () => {
	$(document).on({
		ajaxStart: function () {
			$('.screenForLoading').addClass('loading');
		},
		ajaxStop: function () {
			$('.screenForLoading').removeClass('loading');
		},
	});
};

plantApp.init = () => {
	plantApp.search();
	plantApp.displayLoadingScreen();
	plantApp.animation();
};

$(function () {
	plantApp.init();
});
