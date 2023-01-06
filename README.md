# Welcome to East Elm!

Live Site: [East Elm](https://east-elm.onrender.com/)

East Elm is a full-stack e-commerce site inspired by West Elm. Users can browse a variety of furniture and home items.

## Languages, Frameworks, Platforms and Libraries

### Languages
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### Backend
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-100000?style=for-the-badge&logo=sql&logoColor=BA1212&labelColor=AD0000&color=A90000) ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Hosting
![Render](https://img.shields.io/badge/Render-12100E?style=for-the-badge&logo=Render)

## Wiki Links:
* [Wiki](https://github.com/andreazwu/east-elm/wiki)
* [Database Schema & Backend Routes](https://github.com/andreazwu/east-elm/wiki/Database-Schema-&-Backend-Routes)
* [Features List](https://github.com/andreazwu/east-elm/wiki/MVP-Features)
* [User Stories](https://github.com/andreazwu/east-elm/wiki/User-Stories)
* [Frontend Routes](https://github.com/andreazwu/east-elm/wiki/Frontend-Routes)

## Landing Page


## Sign In/ Sign Up


## Profile Menu


## Products Page


## View Product Details


## Add New Products and Upload Images


## Manage My Products


## Add Reviews


## Manage My Reviews


## Steps to clone locally:
1. Clone this repository:
```bash
git clone [https://github.com/andreazwu/east-elm.git]
```

2. Install backend dependencies:

```bash
pipenv install -r requirements.txt
```

3. Create a `.env` file based on the example with proper settings for development environment:
```
SECRET_KEY=INSERT_SECRET_KEY_HERE
DATABASE_URL=sqlite:///dev.db
```

4. Start pipenv, migrate database, seed database, and run Flask app:

```bash
pipenv shell
flask db upgrade
flask seed all
flask run
```

5. Install frontend dependencies:

```bash
cd react-app/
npm install
npm start
```

6. Navigate to [localhost:3000](http://localhost:3000)



## Contact Info:

### Andrea Wu

[LinkedIn](https://www.linkedin.com/in/andreazwu/) || [GitHub](https://github.com/andreazwu)

