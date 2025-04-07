# Blog App

A full-stack blog application built with Angular for the frontend and Django for the backend. This app supports user authentication, blog CRUD operations, responsive UI, and is integrated with a REST API.

---

## Features

- User authentication (register, login, logout)
- Create, Read, Update, Delete (CRUD) blogs
- Private "My Blogs" section for logged-in users
- Responsive UI
- Pagination and toast notifications
- Deployment-ready with GitHub Pages

---

## Technologies Used

- Frontend: Angular, TypeScript, HTML5, CSS3
- Backend: Django, Django REST Framework, Djoser
- Database: MySQL (for local development)
- Deployment: GitHub

---

## Prerequisites

- Node.js & npm
- Angular CLI
- Python 3.x
- pip
- Virtual environment (venv)
- Git

---

## Backend Setup (Django)

1. Clone the repository
   `bash
   git clone https://github.com/Nithya6601/blog.git
   cd blog

2. Create Virtual Environment (Backend)
   `bash
   python -m venv env
   # Activate:
   # On Windows:
   env\Scripts\activate
   # On Mac/Linux:
   source env/bin/activate

3. Install Backend Requirements
`bash
pip install -r requirements.txt 

4. Apply Migrations
`bash
python manage.py migrate 

5. Create Superuser (optional)
`bash
python manage.py createsuperuser 

6. Run Django Backend
`bash
python manage.py runserver 

7. Frontend (Angular) Setup
`bash
cd frontend-blog
npm install
ng build

8. Copy Angular Build to Django
`bash
# Assuming you're in frontend-blog/ 
cp -r dist/frontend-blog/* ../project_blog/static/ 
mv dist/frontend-blog/index.html ../project_blog/templates/ 

9. Django URLs Setup
Ensure your project_blog/urls.py has:
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
urlpatterns = [ path('admin/', admin.site.urls),
path('api/', include('blog.urls')),
path('auth/', include('djoser.urls')),
path('auth/', include('djoser.urls.authtoken')),
path('', TemplateView.as_view(template_name='index.html')),
]

10. Create .gitignore File in Root
env/
pycache/
*.pyc
db.sqlite3
node_modules/
dist/
*.log
.DS_Store
.vscode/
frontend-blog/.git/

11. Git & GitHub
`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Nithya6601/blog.git
git push -u origin main

12. API Endpoints
POST /auth/users/ – Register
POST /auth/token/login/ – Login
POST /auth/token/logout/ – Logout
GET/POST /api/blogs/ – Blog list/create
GET/PUT/DELETE /api/blogs/:id/ – Blog detail/edit/delete
