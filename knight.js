const board = []
for (let i = 1; i <= 8; i++) {
	for (let j = 1; j <= 8; j++) {
		board.push([i, j])
	}
}

class Knight {
	constructor(loc) {
		this.loc = loc
		this.children = null
		this.path = []
	}
	
	move(loc, start=this.loc, path=this.path) {
		if (start[0] < 1 || start[0] > 8 || start[1] < 1 || start[1] > 8) {
			return
		}

		if (start[0] == loc[0] && start[1] == loc[1]) {
			return path 
		}
	}
}

k = new Knight([0, 0])
