
function School() {
    this.fishes = [];
}

// collect the fishes inside the school
School.prototype.addFish = function(fish) {
    this.fishes.push(fish);
}

School.prototype.swim = function() {
    for(let i = 0; i < this.fishes.length; i++) {
        this.fishes[i].swim(this.fishes);
    }
}   


module.exports = School;