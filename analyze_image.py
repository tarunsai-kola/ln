import cv2
import numpy as np

def find_grid_lines(image_path):
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # The lines are white, so they should be very bright (close to 255)
    # Let's get the average brightness of each row and column
    row_means = np.mean(gray, axis=1)
    col_means = np.mean(gray, axis=0)
    
    print("Row means > 240:")
    for i, m in enumerate(row_means):
        if m > 240:
            print(f"Row {i}: {m}")
            
    print("\nCol means > 240:")
    for i, m in enumerate(col_means):
        if m > 240:
            print(f"Col {i}: {m}")

if __name__ == "__main__":
    find_grid_lines(r"C:\Users\tarun\OneDrive\Desktop\ΣxpoGraph\image.png")
