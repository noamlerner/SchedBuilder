function rand(i,exclude){
	var r = Math.floor(Math.random() * i)
	if(exclude){
		while(exclude.indexOf(r) !== -1){
			r = Math.floor(Math.random() * i)
		}
	}
	return r;
}
module.exports = {
	rand:rand
};