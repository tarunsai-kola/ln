import os
from PIL import Image

def cut_image(input_path, output_dir, num_pieces=50):
    try:
        img = Image.open(input_path)
    except Exception as e:
        print(f"Error opening image: {e}")
        return

    width, height = img.size
    print(f"Original image size: {width}x{height}")

    # Determine grid based on aspect ratio
    if width >= height:
        cols = 10
        rows = 5
    else:
        cols = 5
        rows = 10

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    piece_width = width // cols
    piece_height = height // rows

    print(f"Cutting into {cols} columns and {rows} rows.")
    print(f"Each piece will be approximately {piece_width}x{piece_height}")

    count = 1
    for r in range(rows):
        for c in range(cols):
            left = c * piece_width
            top = r * piece_height
            # Make sure the last column/row takes the remainder pixels
            right = (c + 1) * piece_width if c < cols - 1 else width
            bottom = (r + 1) * piece_height if r < rows - 1 else height

            box = (left, top, right, bottom)
            piece = img.crop(box)
            
            piece_path = os.path.join(output_dir, f"piece_{count}.png")
            piece.save(piece_path)
            count += 1

    print(f"Successfully cut image into {count-1} pieces and saved to {output_dir}")

if __name__ == "__main__":
    input_path = r"C:\Users\tarun\OneDrive\Desktop\ΣxpoGraph\image.png"
    output_dir = r"C:\Users\tarun\OneDrive\Desktop\ΣxpoGraph\frontend\newimages"
    cut_image(input_path, output_dir, 50)
