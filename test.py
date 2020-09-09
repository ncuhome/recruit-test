
import random
import numpy
ans = ['设计', '产品', '运营', '研发', '行政']

t1 = [[3, 0, 2, 0, 0], [0, 2, 0, 1, 0]]
t2 = [[4, 1, 2, 0, 0], [0, 0, 0, 0, 0]]
t3 = [[1, 3, 0, 1, 0], [1, 0, 0, 0, 1]]
t4 = [[0, 2, 1, 1, 2], [1, 1, 1, 0, 0]]
t5 = [[0, 0, 0, 0, 0], [1, 2, 3, 2, 1]]
t6 = [[1, 0, 3, 1, 1], [0, 1, 0, 0, 1]]
t7 = [[1, 0, 1, 0, 2], [0, 0, 0, 3, 0]]
t8 = [[0, 1, 0, 3, 0], [0, 3, 0, 1, 1]]
t9 = [[1, 1, 1, 0, 1], [0, 2, 0, 3, 0]]
t10 = [[0, 0, 0, 3, 0], [0, 0, 0, 0, 0]]
t11 = [[0, 2, 1, 0, 3], [1, 0, 0, 1, 0]]
t12 = [[1, 0, 1, 0, 0], [0, 1, 0, 0, 4]]

ts = numpy.array([t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12])


def test_random_data():
    init_count = numpy.array([0, 0, 0, 0, 0])
    for i in range(10000):
        for t in ts:
            this_count = random.choice(t)
            init_count += this_count

    print(init_count)
