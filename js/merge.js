function merge(arr) {
    if (arr.length > 1) {
        [x, y, z, i, j] = [merge(arr.slice(0, Math.trunc(arr.length/2))), merge(arr.slice(Math.trunc(arr.length/2))), [], 0, 0]
        while (z.length < arr.length) {
            if (i + 1 > x.length) {
                z.push(y[j])
                j++
            } else if (j + 1 > y.length) {
                z.push(x[i])
                i++
            } else {
                if (x[i] < y[j]) {
                    z.push(x[i])
                    i++
                } else {
                    z.push(y[j])
                    j++
                }
            }
        }
        return z
    }
    return arr
}
