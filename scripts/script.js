// Name Space
const plantApp = {};

plantApp.apiToken = 'Wm9LK3NsZHhXQWFRSTFJdGxidStjZz09';
plantApp.baseUrl = `http://trefle.io/api/plants`;

plantApp.retrieveData = () => {
	$.ajax({
		url: `http://proxy.hackeryou.com`,
		method: `GET`,
		dataType: `json`,
		data: {
			reqUrl: plantApp.baseUrl,
			params: {
				token: plantApp.apiToken,
				format: `json`,
				q: plantApp.userSearch,
				complete_data: true,
				page_size: 6,
			},
		},
	}).then((request) => {
		console.log(request);
		plantApp.firstCall(request);
	});
};

plantApp.firstCall = (getLink) => {
	plantApp.idArray = getLink.map((data) => {
		return data.link;
	});

	// Checks if the 1st api call returns any results
	if (plantApp.idArray.length > 0) {
		plantApp.secondCall();
	} else {
		$('.plantWrapper').append(
			`<h2 class ="cantFind">Sorry we couldn't find ${plantApp.userSearch}</h2>`
		);
	}
};

// Define the secondCall function which will map over the plantApp.idArray that we got back from our first API call and store the promises
plantApp.secondCall = () => {
	plantApp.storedPromises = plantApp.idArray.map((submitUrl) => {
		return $.ajax({
			url: `http://proxy.hackeryou.com`,
			method: `GET`,
			dataType: `json`,
			data: {
				reqUrl: submitUrl,
				params: {
					token: plantApp.apiToken,
					format: `json`,
				},
			},
		});
	});
	console.log(plantApp.storedPromises);
	plantApp.displayContentToPage();
};

plantApp.displayContentToPage = () => {
	$.when(...plantApp.storedPromises).then((...getValues) => {
		const justTheGoodStuff = getValues.map((miniArray) => {
			return miniArray[0];
		});
		justTheGoodStuff.forEach((plantObject) => {
			const htmlBox = `
			<div class="plantsInfoBox">
                    <h2>${plantObject.common_name}</h2>
                    <img src="https://picsum.photos/300/300" alt="cool alt tag">
                    <ul>
                        <li>common name: <span>${plantObject.common_name}</span> </li>
                        <li>scientific name: <span>${plantObject.scientific_name}</span></li>
                        <li>more Info: <span>${plantObject.main_species.sources[0].source_url}</span></li>
                        <li>native statues: <span>${plantObject.native_status}</span></li>
                    </ul>
				</div>
			`;
			$('.plantWrapper').append(htmlBox);
		});
	});
};

plantApp.search = () => {
	$('#searchSomething').on('click', function (e) {
		e.preventDefault();
		plantApp.userSearch = $('#searchPlants').val();
		console.log(plantApp.userSearch);
		plantApp.retrieveData();
		$('.plantWrapper').empty();
	});
};

$(document).on({
	ajaxStart: function () {
		$('.screenForLoading').addClass('loading');
	},
	ajaxStop: function () {
		$('.screenForLoading').removeClass('loading');
	},
});

plantApp.init = () => {
	plantApp.retrieveData();
	plantApp.search();
};

$(function () {
	plantApp.init();
});
