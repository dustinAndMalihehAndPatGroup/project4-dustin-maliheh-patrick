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
				q: `apple`,
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

	plantApp.secondCall();
	console.log(plantApp.storedPromises);
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
	plantApp.anotherFuckingThing();
};

plantApp.anotherFuckingThing = () => {
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
			`
			$('.plantWrapper').append(htmlBox);
			// This is where we make a html variable and then append it to the wrapper
			console.log(
				`
				The common name is ${plantObject.common_name} 
				The scientific name is ${plantObject.scientific_name} 
				The native status is ${plantObject.native_status}
				Find more info at ${plantObject.main_species.sources[0].source_url}
				`
			);
		});
	});
};

plantApp.init = () => {
	plantApp.retrieveData();
};

$(function () {
	plantApp.init();
});
