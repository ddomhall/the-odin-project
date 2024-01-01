def merge(arr):
    if len(arr) > 1:
        [x, y, z, i, j] = [merge(arr[0:len(arr)//2]), merge(arr[len(arr)//2:]), [], 0, 0]
        while len(z) < len(arr):
            if i+1 > len(x):
                z.append(y[j])
                j += 1
            elif j+1 > len(y):
                z.append(x[i])
                i += 1
            else:
                if x[i] < y[j]:
                    z.append(x[i])
                    i += 1
                else:
                    z.append(y[j])
                    j += 1
        return z
    return arr

print(merge([3, 2, 1, 13, 8, 5, 0, 1]))
print(merge([105, 79, 100, 110]))

