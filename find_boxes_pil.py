from PIL import Image
import sys

img = Image.open(sys.argv[1])
# We only care about desktop half, roughly x=140 to 1440+140=1580
# Downscale for faster processing
# Let's crop first
box = (140, 0, 1580, img.height)
desktop = img.crop(box)

# Downscale by 4
small = desktop.resize((desktop.width // 4, desktop.height // 4), Image.Resampling.NEAREST)
small = small.convert("RGBA")

pixels = small.load()
for y in range(0, small.height, 100):
    row = ""
    for x in range(0, small.width, 10):
        r, g, b, a = pixels[x, y]
        if a < 200 or (r > 240 and g > 240 and b > 240):
            row += "."
        else:
            row += "#"
    print(f"{y*4:5d} {row}")

