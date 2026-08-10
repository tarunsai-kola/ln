import cv2
import numpy as np
import matplotlib.pyplot as plt
from scipy.signal import find_peaks

def analyze_grid(image_path):
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    row_means = np.mean(gray, axis=1)
    col_means = np.mean(gray, axis=0)
    
    # The grid lines should be local maxima (lightest pixels)
    # We use a distance to ensure we only get one line per gap
    row_peaks, _ = find_peaks(row_means, distance=50, prominence=10)
    col_peaks, _ = find_peaks(col_means, distance=50, prominence=10)
    
    print("Row lines (y-coordinates):", row_peaks.tolist())
    print("Col lines (x-coordinates):", col_peaks.tolist())
    
    # Calculate differences to see the size of the faces
    print("\nRow diffs:", np.diff([0] + row_peaks.tolist() + [img.shape[0]]))
    print("Col diffs:", np.diff([0] + col_peaks.tolist() + [img.shape[1]]))

if __name__ == "__main__":
    analyze_grid(r"C:\Users\tarun\OneDrive\Desktop\ΣxpoGraph\image.png")
