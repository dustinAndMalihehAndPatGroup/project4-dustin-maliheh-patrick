// Name Space
const plantApp = {};

plantApp.apiToken = 'Wm9LK3NsZHhXQWFRSTFJdGxidStjZz09';
plantApp.baseURL = 'http://trefle.io/api/plants';

plantApp.retrieveData = () => {
	$.ajax({
		url: 'http://proxy.hackeryou.com',
		method: 'GET',
		dataType: 'json',
		data: {
			reqUrl: plantApp.baseURL,
			params: {
				token: plantApp.apiToken,
				complete_data: true,
			},
		},
	}).then((request) => {
		console.log(request);
	});
};

plantApp.init = () => {
	plantApp.retrieveData();
};

// Doc Ready
$(function () {
	plantApp.init();
});
