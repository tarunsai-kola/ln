import re

file_path = r"c:\Users\tarun\OneDrive\Desktop\ΣxpoGraph\frontend\src\Components\LandingCaseStudies.jsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

count = 1
def repl(match):
    global count
    # use piece_1 to piece_22
    res = f'"/newimages/piece_{count}.png"'
    count += 1
    return res

new_content = re.sub(r'"/avatars/[^"]+"', repl, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)
print(f"Updated {count-1} avatars.")
