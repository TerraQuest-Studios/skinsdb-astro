String.prototype.ucwords = function() {
    return (this + '').replace(/^(.)|\s+(.)/g, function ($1) {
		return $1.toUpperCase();
	});
};