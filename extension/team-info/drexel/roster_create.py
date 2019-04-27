# DUTV Roster Creation Tool

import json

FILENAME = 'mens_lacrosse.json'

print('DragonsTV Roster Creation Tool')
print('Appending to file', FILENAME)

f = open(FILENAME, 'a')
while True:
    try:
        name = input('Name: ')
        num = input('Number: ')
        pos = input('Position: ')
        year = input('Year: ')
        team = {num: {'name':name, 'num': num, 'position':pos, 'year':year }}
        f.write(json.dumps(team, indent=4))
        f.write(',\n')
        print('Wrote', name, 'to file')
        print()
    except KeyboardInterrupt:
        f.close()
        quit()