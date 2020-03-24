function School() {
    this.fishes = [];
}

// collect the fishes inside the school
School.prototype.addFish = function(fish) {
    this.fishes.push(fish);
}

School.prototype.run = function() {

}
