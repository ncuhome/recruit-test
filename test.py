
import random
import numpy
ans = ['设计', '产品', '运营', '研发', '行政',"游戏"]

t1 = [[4, 0, 2, 0, 0,1], [1, 2, 0, 1, 1,1]]
t2 = [[6, 1, 2, 0, 0,0], [0, 0, 0, 0, 0,0]]
t3 = [[1, 3, 0, 1, 0,3], [1, 0, 0, 0, 1,0]]
t4 = [[0, 2, 1, 1, 2,2], [1, 1, 1, 0, 0,0]]
t5 = [[1, 0, 0, 0, 0,0], [1, 2, 4, 2, 2,2]]
t6 = [[1, 0, 5, 1, 1,1], [0, 1, 1, 0, 1,0]]
t7 = [[1, 0, 1, 0, 2,0], [0, 0, 0, 3, 0,2]]
t8 = [[0, 1, 0, 3, 0,2], [0, 3, 0, 1, 1,1]]
t9 = [[1, 1, 1, 0, 1,0], [0, 2, 0, 3, 0,1]]
t10 = [[0, 0, 0, 3, 0,2], [0, 0, 0, 0, 0,0]]
t11 = [[0, 2, 1, 0, 4,2], [1, 1, 0, 1, 2,0]]
t12 = [[1, 0, 1, 0, 0,0], [0, 1, 0, 0, 4,2]]

ts = numpy.array([t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12])


def test_random_data():
    all_exam = []
    init_count = numpy.array([0, 0, 0, 0, 0,0])
    for i in range(10000):
        this_exam = [0, 0, 0, 0, 0]
        for t in ts:
            this_count = random.choice(t)
            this_exam += this_count
        init_count += this_exam
        all_exam.append(this_exam)
        print(this_exam)

    print(init_count)

    print(max([max(i) for i in all_exam]))  # 19
    print(min([max(i) for i in all_exam]))  # 8


test_random_data()
