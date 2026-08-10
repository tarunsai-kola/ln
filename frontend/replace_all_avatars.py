import os
import re

src_dir = r"c:\Users\tarun\OneDrive\Desktop\ΣxpoGraph\frontend\src"
count = 27

unsplash_files_mentors = [
    "courseMentors.js",
    "MeetYourMentors.jsx",
    "MentorShowcase.jsx",
    "LandingMentors.jsx"
]

def repl(match):
    global count
    res = f'"/newimages/piece_{count}.png"'
    count += 1
    if count > 108:
        count = 1
    return res

def repl_sq(match):
    global count
    res = f"'/newimages/piece_{count}.png'"
    count += 1
    if count > 108:
        count = 1
    return res

files_updated = 0

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith((".js", ".jsx")):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
            
            new_content = content
            
            # Replace avatars
            new_content = re.sub(r'"/avatars/[^"]+"', repl, new_content)
            new_content = re.sub(r"'/avatars/[^']+'", repl_sq, new_content)
            
            # Replace unsplash in specific mentor files
            if file in unsplash_files_mentors:
                new_content = re.sub(r'"https://images\.unsplash\.com/[^"]+"', repl, new_content)
                new_content = re.sub(r"'https://images\.unsplash\.com/[^']+'", repl_sq, new_content)
                
            # For MasterClassDetails.jsx, replace the specific learner images
            if file == "MasterClassDetails.jsx":
                # Look for the block of 4 learners
                new_content = re.sub(r'"https://images\.unsplash\.com/photo-1534528741775-53994a69daeb\?[^"]+"', repl, new_content)
                new_content = re.sub(r'"https://images\.unsplash\.com/photo-1507003211169-0a1dd7228f2d\?[^"]+"', repl, new_content)
                new_content = re.sub(r'"https://images\.unsplash\.com/photo-1492562080023-ab3db95bfbce\?[^"]+"', repl, new_content)
                new_content = re.sub(r'"https://images\.unsplash\.com/photo-1438761681033-6461ffad8d80\?[^"]+"', repl, new_content)

            if new_content != content:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                files_updated += 1
                print(f"Updated {file}")

print(f"Finished. Total files updated: {files_updated}. Last piece used: {count-1}")
