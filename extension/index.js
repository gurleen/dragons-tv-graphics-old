'use strict';

var fs = require('fs')

module.exports = function (nodecg) {

	// HOME LTH DATA
	var currentPath = process.cwd();
	console.log(currentPath);
	let rawData = fs.readFileSync('bundles/dutv-graphics-package/extension/team-info/drexel/womens_soccer.json');
	let homeTeam = JSON.parse(rawData);
	const homeTeamRep = nodecg.Replicant('homeTeam');
	homeTeamRep.value = homeTeam;

	/* AWAY LTH DATA
	var currentPath = process.cwd();
	console.log(currentPath);
	let rawData = fs.readFileSync('bundles/dutv-graphics-package/extension/team-info/other/mens_soccer.json');
	let awayTeam = JSON.parse(rawData);
	const homeTeamRep = nodecg.Replicant('awayTeam');
	awayTeamRep.value = awayTeam;
	*/

	// TIME/SCORE DATA
	const liveData = 'bundles/dutv-graphics-package/extension/livedata.json'
	const liveDataRep = nodecg.Replicant('liveData');
	nodecg.log.info(`Watching for file changes on ${liveData}`)
	fs.watch(liveData, (curr, prev) => {
		try {
			var newData = JSON.parse(fs.readFileSync(liveData));
			if(newData.homeScore > liveDataRep.value.homeScore) {
				console.log('Home team scored!');
				nodecg.sendMessage('toggleGraphic', 'HOME_GOAL_IMAGE');
				setTimeout(() => {
					liveDataRep.value = newData;
					nodecg.sendMessage('toggleGraphic', 'HOME_GOAL_IMAGE');
				}, 4000);
			}
			else if(newData.awayScore > liveDataRep.value.awayScore) {
				console.log('Away team scored!');
				nodecg.sendMessage('toggleGraphic', 'AWAY_GOAL_IMAGE');
				setTimeout(() => {
					liveDataRep.value = newData;
					nodecg.sendMessage('toggleGraphic', 'AWAY_GOAL_IMAGE');
				}, 4000);
			}
			else if(newData.clockStr == '00:00') {
				console.log('fired');
				nodecg.sendMessage('endOfPeriod');
				liveDataRep.value = newData;
			}
			else {
				liveDataRep.value = newData;
			}
		} catch (err) {
			console.log('err');
		}
	});

	const imageList = nodecg.Replicant('imageList');
	var tempList = [];
	fs.readdir(('bundles/dutv-graphics-package/graphics/img'), (err, files) => {
		files.forEach(file => {
			if(file.endsWith('.png')) {
				tempList.push(file);
				console.log(file);
			}
		});
		imageList.value = tempList;
	});
};
