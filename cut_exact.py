import os
from PIL import Image

def cut_exact(input_path, output_dir):
    try:
        img = Image.open(input_path)
    except Exception as e:
        print(f"Error opening image: {e}")
        return

    width, height = img.size
    print(f"Original image size: {width}x{height}")

    # The image is a grid of 9 columns and 12 rows
    cols = 9
    rows = 12

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    # Clear out old pieces from previous run just in case
    for f in os.listdir(output_dir):
        if f.startswith("piece_"):
            os.remove(os.path.join(output_dir, f))

    count = 1
    for r in range(rows):
        for c in range(cols):
            left = int(round(c * width / cols))
            right = int(round((c + 1) * width / cols))
            top = int(round(r * height / rows))
            bottom = int(round((r + 1) * height / rows))

            box = (left, top, right, bottom)
            piece = img.crop(box)
            
            piece_path = os.path.join(output_dir, f"piece_{count}.png")
            piece.save(piece_path)
            count += 1

    print(f"Successfully cut image into {count-1} exact pieces and saved to {output_dir}")

if __name__ == "__main__":
    input_path = r"C:\Users\tarun\OneDrive\Desktop\ΣxpoGraph\image.png"
    output_dir = r"C:\Users\tarun\OneDrive\Desktop\ΣxpoGraph\frontend\newimages"
    cut_exact(input_path, output_dir)
