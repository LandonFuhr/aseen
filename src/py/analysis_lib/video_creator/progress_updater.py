import sys
import json


def send_progress_update(percentComplete: float, timeRemainingInMs: int):
    sys.stdout.write(json.dumps(
        {"progress": percentComplete, "timeRemaining": timeRemainingInMs}))
    sys.stdout.flush()
