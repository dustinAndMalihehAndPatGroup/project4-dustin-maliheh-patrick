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
	}).then((data) => {
		console.log(data);
		plantApp.firstCall(data);
	});
};

plantApp.firstCall = (data) => {
	plantApp.linkData = data;

	plantApp.linkData.forEach((data) => {
		console.log(data.scientific_name, data.link, data.id);
	});
};

plantApp.init = () => {
	plantApp.retrieveData();
};

$(function () {
	plantApp.init();
});

//     }).then((result) => {
//         const artArray = result.artObjects;
//         // console.log(artArray);

//         artApp.displayArt(artArray);
//     })
// }

// // We want to search for artworks related to Monkeys

// // Display the results onto the page
// artApp.displayArt = (artArray) => {
//     artArray.forEach((art) => {
//         const title = art.title;
//         const author = art.principalOrFirstMaker;
//         const image = art.webImage.url;

//         console.log(title, author, image);

//         const artEl = `
//             <div class="piece">
//                 <h2>${title}</h2>
//                 <p>${author}</p>
//                 <img src="${image}" alt="${title}">
//             </div>
//         `
//         $('#artwork').append(artEl);
//     })
// }

//  const animals = ['dolphin', 'butterfly', 'otter'];
// const pluralAnimals = animals.map((animal,index) => {
//         // return `${animals}s`
//         return {
//             animalType: animal,
//             key: index,
//         };
//     });
//     console.log(pluralAnimals);
