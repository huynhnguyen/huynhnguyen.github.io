from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

from subprocess import call
from datetime import datetime
call(["git", "add","."])
call(["git", "commit", "-m '{}'".format(datetime.now().strftime('%m/%d/%Y'))])
call(["git", "pull"])
call(["git", "push"])