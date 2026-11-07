import re

html = open('index.html', encoding='utf-8').read()
d = 0
s = 0

# Strip comments to avoid counting tags inside comments
html = re.sub(r'<!--.*?-->', '', html, flags=re.DOTALL)

lines = html.split('\n')
for i, line in enumerate(lines):
    open_count = len(re.findall(r'<div\b[^>]*>', line))
    close_count = line.count('</div>')
    d += open_count - close_count
    
    if '<section' in line:
        print(f"Line {i+1} (<section>): Div balance is {d}")
        
print("Final div balance:", d)
