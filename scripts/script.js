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

plantApp.firstCall = (data) => {
	plantApp.linkData = data;

	plantApp.idArray = plantApp.linkData.map((data) => {
		// console.log(data.scientific_name, data.link, data.id);
		return data.link;
	});

	plantApp.newThing();
	console.log(plantApp.storedPromises);
};

plantApp.init = () => {
	plantApp.retrieveData();
};

$(function () {
	plantApp.init();
});

plantApp.newThing = () => {
	plantApp.storedPromises = plantApp.idArray.map((enterurl) => {
		return $.ajax({
			url: `http://proxy.hackeryou.com`,
			method: `GET`,
			dataType: `json`,
			data: {
				reqUrl: enterurl,
				params: {
					token: plantApp.apiToken,
					format: `json`,
				},
			},
		});
	});
};
