function CombinationIterator(n, p) {
    if (n<1 || p<1 || p>n) {
        throw "CombinationIterator error - bad arguments";
    }

    this.next = [];
    this.n = n;
    this.p = p;
    for (var i=0; i<p; i++) {
        this.next.push(i);
    }
}

CombinationIterator.prototype.hasNext = function() {
    return !!this.next;
}

CombinationIterator.prototype.getNext = function() {
    if (!this.next) {
        return null;
    }

    var result = [], i, j;
    for (i=0; i<this.next.length; i++) {
        result.push(this.next[i]);
    }

    i = this.next.length-1;
    j = this.n - 1;
    while(i>=0 && this.next[i] >= j) {
        i--;
        j--;
    }

    if (i<0) {
        this.next = null;
    }
    else {
        this.next[i]++;
        for (i++; i<this.next.length; i++) {
            this.next[i] = this.next[i-1] + 1;
        }
    }

    return result;
}

CombinationIterator.prototype.getAll = function() {
    var result = [];

    while (this.hasNext()) {
        result.push(this.getNext());
    }

    return result;
}
