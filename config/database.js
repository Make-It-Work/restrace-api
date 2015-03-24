// config/database.js
var url;
console.log(process.env.SESSIONNAME);
if(process.env.SESSIONNAME === 'Console') {
	url = 'mongodb://localhost:27017/restrace';
	console.log('localhost');
} else {
	console.log('else');
	url = process.env.databaseconnection;
}
module.exports = {
	'url' : url
};