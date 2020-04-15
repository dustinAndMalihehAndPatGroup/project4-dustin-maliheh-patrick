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
	console.log(plantApp.idArray);
	plantApp.newFunk(plantApp.idArray);
};

plantApp.newFunk = (hi) => {

	plantApp.stem = hi
	// console.log(hi, 'newfunkkk');

	 plantApp.storedpromise = plantApp.forEach ((hi) => {
	
		 return $.ajax({
			 url: `http://proxy.hackeryou.com`,
			 method: `GET`,
			 dataType: `json`,
			 data: {
				 reqUrl: hi,
				 params: {
					 token: plantApp.apiToken,
					 format: `json`,
				 },
			 },
		 })
		 
		}) 
		console.log(plantApp.storedpromise);
	 
	}
	





plantApp.bagOfId = [];


// for (let i = 0; i<= )

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



//------------------------------- A J A X   P R O M I S E -------------------------------

// function getPokemon(number) {
// 	return $.ajax({
// 		url: `https://pokeapi.co/api/v2/pokemon/${number}/`,
// 		dataType: 'json',
// 		method: 'GET'
// 	})
// }

// const pokeBag = [];

// for (let i = 1; i <= 40; i++) {
// 	pokeBag.push(getPokemon(i));
// }

// // array of promises (array puts it in order)
// // console.log(pokeBag);

// $.when(...pokeBag)
// 	.then((...caughtPokers) => {

// 		const justTheGoodStuff = caughtPokers.map((miniArray) => {
// 			return miniArray[0];
// 		});

// 		justTheGoodStuff.forEach((pokemon) => {
// 			console.log(`${pokemon.name} is the Pokemon number ${pokemon.id}`);
// 		})
// 	});

//       });
