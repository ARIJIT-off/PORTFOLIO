from bs4 import BeautifulSoup

with open('projects.html', 'r', encoding='utf-8') as f:
    content = f.read()

soup = BeautifulSoup(content, 'html.parser')

# Find the projects section div
projects_section = soup.find('div', class_='projects-section')

# Find the attendance article (now numbered 01)
attendance = soup.find('article', id='project-attendance')

# Remove it from current position
attendance.extract()

# Insert it as the first child of projects-section
projects_section.insert(0, attendance)

with open('projects.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))

print("Done - Attendance moved to first position")
