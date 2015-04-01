var mongoose = require('mongoose');

function fillTestPlace(){
	var testData = [
		{google_id: '551ba43c', name: 'Paultje', address : 'Pietje puk laan 3'},
		{google_id: 'd05b4bb3', name: 'Grand cafe', address : 'Jan de kerk 5'},
		{google_id: '551677b3', name: 'Markt 18', address : 'Jan de groot 15'},
		{google_id: '5b0bd057b', name: 'De rode leuw', address : 'Onderwijsboulevard 215'},
		{google_id: '944bb677b', name: 'Taveerne', address : 'De slenk 3'}
	];

	testData.forEach(function(place){
		var place = new Place(place);
		place.save();
	});
};

function fillTestActivity(){
	var testData = [
		{google_id: '551ba43c', description: 'Op naar paulos', tags : [ ]},
		{google_id: 'd05b4bb3', description: 'Even relaxen', tags : [ ]},
		{google_id: '551677b3', description: 'Op de markt', tags : [ ]},
		{google_id: '5b0bd057b', description: 'Ren voor de leuw', tags : [ ]},
		{google_id: '944bb677b', description: 'Je bent er bijna', tags : [ ]}
	];
	testData.forEach(function(activity){
		var activity = new Activity(activity);
		activity.save(function (err){
			if(err){
				console.log(err);
			}
		});
	});
};

function fillTestRaces(){
	var testData = [
		{name: 'KroegenraceOne', owner: '551ba4cb0bd053b444bb677b', description:'Number one', users : ['551ba4d30bd053b444bb677c','551ba4dc0bd053b444bb677d'], startDateTime : '2015-04-25T09:17:41.634Z', endDateTime : '2015-04-26T09:17:41.634Z', activities : ['551bad39e12f715454920f8d', '551bad39e12f715454920f8e']},
		{name: 'KroegenraceTwo', owner: '551ba4cb0bd053b444bb677b', description:'Number two', users : ['551ba4d30bd053b444bb677c','551ba4dc0bd053b444bb677d' ], startDateTime : '2015-04-25T09:17:41.634Z', endDateTime : '2015-04-26T09:17:41.634Z', activities : [ '551bad39e12f715454920f8d', '551bad39e12f715454920f8e']},
		{name: 'KroegenraceThree', owner: '551ba4cb0bd053b444bb677b', description:'number three', users : [ '551ba4d30bd053b444bb677c','551ba4dc0bd053b444bb677d'], startDateTime : '2015-04-25T09:17:41.634Z', endDateTime : '2015-04-26T09:17:41.634Z', activities : ['551bad39e12f715454920f8d', '551bad39e12f715454920f8e' ]},
		{name: 'KroegenraceFour', owner: '551ba4cb0bd053b444bb677b', description:'number four', users : ['551ba4d30bd053b444bb677c','551ba4dc0bd053b444bb677d' ], startDateTime : '2015-04-25T09:17:41.634Z', endDateTime : '2015-04-26T09:17:41.634Z', activities : ['551bad39e12f715454920f8d', '551bad39e12f715454920f8e' ]},
		{name: 'KroegenraceFive', owner: '551ba4cb0bd053b444bb677b', description:'number five', users : [ '551ba4d30bd053b444bb677c','551ba4dc0bd053b444bb677d'], startDateTime : '2015-04-25T09:17:41.634Z', endDateTime : '2015-04-26T09:17:41.634Z', activities : ['551bad39e12f715454920f8d', '551bad39e12f715454920f8e' ]}
	];
		testData.forEach(function(race){
			var race = new Race(race);
			race.save(function (err){
			if(err){
				console.log(err);
			}
		});
	});
};

module.exports = function(){
	Tag = mongoose.model('Tag');
	Place = mongoose.model('Place');
	Activity = mongoose.model('Activity');
	Race = mongoose.model('Race');

	fillTestPlace();
	fillTestActivity();
	fillTestRaces();
};