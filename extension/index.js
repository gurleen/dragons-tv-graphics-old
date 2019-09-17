'use strict';

var fs = require('fs')

module.exports = function (nodecg) {

	// HOME LTH DATA
	var currentPath = process.cwd();
	console.log(currentPath);
	let rawData = fs.readFileSync('bundles/dutv-graphics-package/extension/team-info/drexel/mens_soccer.json');
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
		liveDataRep.value = JSON.parse(fs.readFileSync(liveData));
		// nodecg.log.info('New score data!');
		// nodecg.log.info(liveDataRep.value.clockStr);
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
