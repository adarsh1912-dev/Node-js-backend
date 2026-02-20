#!/usr/bin/env python3
import datetime as dt
import time
import subprocess

DAY_BRIGHTNESS = "80"  # adjust as you like
NIGHT_BRIGHTNESS = "30"  # adjust as you like

DAY_START_HOUR = 7  # 8 AM
NIGHT_START_HOUR = 17  # 5 PM


def set_brightness(value: str):
    """Set brightness using brightnessctl."""
    try:
        subprocess.run(["ddcutil", "--bus=7", "setvcp", "10", value], check=True)
        print(f"[auto_brightness] Set brightness to {value}")
    except Exception as e:
        print(f"[auto_brightness] Failed to set brightness: {e}")


def get_mode(now: dt.datetime) -> str:
    """Return 'day' or 'night' based on the current hour."""
    hour = now.hour
    if DAY_START_HOUR <= hour < NIGHT_START_HOUR:
        return "day"
    else:
        return "night"


def main():
    last_mode = None

    while True:
        now = dt.datetime.now()
        mode = get_mode(now)

        if mode != last_mode:
            if mode == "day":
                set_brightness(DAY_BRIGHTNESS)
            else:
                set_brightness(NIGHT_BRIGHTNESS)
            last_mode = mode

        time.sleep(60)


if __name__ == "__main__":
    main()
