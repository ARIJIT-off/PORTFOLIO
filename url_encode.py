import urllib.parse
import re

with open('certificates.html', 'r', encoding='utf-8') as f:
    content = f.read()

def repl(m):
    # m.group(1) is the filename/path
    # We url-encode it but keep the slashes
    encoded_path = urllib.parse.quote(m.group(1), safe='/')
    return 'src="' + encoded_path + '"'

new_content = re.sub(r'src="([^"]+\.pdf)"', repl, content)

with open('certificates.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Updated successfully")
