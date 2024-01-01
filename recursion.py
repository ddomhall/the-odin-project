def fibs(n):
    arr = []
    x = 0
    for i in range(n):
        try:
            x = arr[i - 1] + arr[i - 2]
            raise Exception
        except Exception as e:
            if x == 0 and len(arr) > 0:
                arr.append(1)

            else:
                arr.append(x)

    return arr

def fibsRec(n, arr = []):
    if len(arr) == n:
        return arr
    else:
        x = 0
        try:
            x = arr[-1] + arr[-2]
            raise Exception
        except Exception as e:
            if x == 0 and len(arr) > 0:
                arr.append(1)
            else:
                arr.append(x)
        return fibsRec(n, arr)

print(fibsRec(8))
