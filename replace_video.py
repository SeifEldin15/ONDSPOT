import os
import re

files = ["index.html", "index2.html", "pricing.html", "car-detailing.html"]

replacement_json = '''{
                                    "items": [{
                                      "url": "Video2121.mov",
                                      "originalUrl": "Video2121.mov",
                                      "width": 940,
                                      "height": 529,
                                      "thumbnailUrl": "",
                                      "html": "<video class=\\"embedly-embed\\" src=\\"Video2121.mov\\" width=\\"940\\" height=\\"529\\" controls autoplay></video>",
                                      "type": "video"
                                    }],
                                    "group": ""
                                  }'''

base_dir = r"d:\Projects\odnspot2\ONDSPOT"

# We want to replace the whole JSON object for Vimeo.
# The original json has the url https://vimeo.com/1059126693/61e0fa61f8
pattern = re.compile(r'\{\s*"items": \[\{\s*"url": "https://vimeo\.com/1059126693/61e0fa61f8".*?"group": ""\s*\}\s*', re.DOTALL)

for f in files:
    filepath = os.path.join(base_dir, f)
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content = pattern.sub(replacement_json + "\n", content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Replaced video in {f}")
    else:
        print(f"No match found in {f}")

print("Done.")
