from pynput import keyboard
from datetime import datetime
import pandas as pd
import time
import os
import json
pid = str(os.getpid())
pidfile = "./log.pid"
with open(pidfile,'wb') as f:
    f.write(pid)
cmd_hold = False
def on_press(key):
    global df, cmd_hold
    df.loc[-1] = [time.time(), 1]
    df.index += 1
    if key == keyboard.Key.cmd:
        cmd_hold = True
    if cmd_hold and key == keyboard.Key.esc:
        logfile = 'keylog_{}.csv'.format(datetime.now().strftime('%y_%m_%d_%H_%M'))    
        df.set_index('time').to_csv('./logs/'+logfile)
        with open('./logs/master.json','r+') as f:
            logfiles = json.loads(f.read()) or []
            logfiles.append(logfile)
            f.seek(0)
            f.write(json.dumps(logfiles))
        return False

df = pd.DataFrame([],columns=['time', 'press'])
def on_release(key):
    global cmd_hold
    if key == keyboard.Key.cmd:
        cmd_hold = False

# Collect events until released
with keyboard.Listener(
        on_press=on_press,
        on_release=on_release) as listener:
    listener.join()