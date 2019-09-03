import nflgame

def callback(active, completed, diff):
    for game in active:
        print(game)

def main():
    nflgame.live.run(callback)