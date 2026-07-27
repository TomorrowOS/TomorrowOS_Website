import cv2
import numpy as np
import sys

# Load image
img = cv2.imread(sys.argv[1], cv2.IMREAD_UNCHANGED)
# The image is 4372x14256. Desktop is ~left 2000px.
# We are looking for large blocks.
# Let's just slice the desktop part
desktop = img[:, 140:1580] # roughly
gray = cv2.cvtColor(desktop, cv2.COLOR_BGRA2GRAY)

# Threshold to find non-white / non-transparent
# Assuming background is white/transparent
alpha = desktop[:,:,3]
mask = (alpha > 200).astype(np.uint8) * 255
# Also ignore white bg
bg_mask = (desktop[:,:,0] > 240) & (desktop[:,:,1] > 240) & (desktop[:,:,2] > 240)
mask[bg_mask] = 0

# Find contours
contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
boxes = []
for c in contours:
    x, y, w, h = cv2.boundingRect(c)
    if w > 200 and h > 200 and w < 1000 and h < 1000:
        boxes.append((x, y, w, h))

boxes.sort(key=lambda b: b[1])
for b in boxes:
    print(b)
