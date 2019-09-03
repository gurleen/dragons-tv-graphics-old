# DUTV Roster Creation Tool

import json

FILENAME = 'towson/mens_lacrosse.json'

print('DragonsTV Roster Creation Tool')
print('Appending to file', FILENAME)

players = []

f = open(FILENAME, 'a')

def main():
    while True:
        name = input('Name: ')
        num = input('Number: ')
        pos = input('Position: ')
        year = input('Year: ')
        player = {num: {'name':name, 'num': num, 'position':pos, 'year':year }}
        print('Wrote', name, 'to file')
        print()
        players.append(player)

if __name__ == '__main__':
    try:    
        main()
    except EOFError:
        f.write(json.dumps(team, indent=4))
        quit()