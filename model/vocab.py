f = list(map(lambda x: x.strip(), open("vocab.txt", "r").readlines()))

import json


with open("vocab.json", "w") as j:
    json.dump(f, j)
