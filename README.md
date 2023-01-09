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
![image](https://user-images.githubusercontent.com/17817050/211336649-e2d42a61-dff4-4912-8fa7-c394679acb0f.png)
![image](https://user-images.githubusercontent.com/17817050/211336815-9a26ee20-4e58-4bc6-a05e-441ac2809a53.png)

## Sign In/ Sign Up
![image](https://user-images.githubusercontent.com/17817050/211336941-2e680213-0462-4ab4-ae6c-31998454ad83.png)
![image](https://user-images.githubusercontent.com/17817050/211337003-a73041a6-6d5e-4a5d-92d4-469bfcd33a9e.png)


## Profile Menu
![image](https://user-images.githubusercontent.com/17817050/211337056-b12fbbb1-0ce9-4aba-9410-5d3300e666f8.png)


## Products Page
![image](https://user-images.githubusercontent.com/17817050/211337180-37836aeb-9450-4a9a-aa1d-e323c8701b7e.png)


## View Product Details
![image](https://user-images.githubusercontent.com/17817050/211337493-11ec8761-0cf0-45e3-878b-a0781c91d476.png)


## Add New Products and Upload Images
![image](https://user-images.githubusercontent.com/17817050/211337661-d68f2679-1fce-4381-8c9b-4bd1e4c67f28.png)


## Manage My Products
![image](https://user-images.githubusercontent.com/17817050/211337846-a3c08bce-67f6-49f8-bbaa-04a7f1a644cc.png)


## Add Reviews
![image](https://user-images.githubusercontent.com/17817050/211338836-753399c0-0445-43da-86fe-9bbbfaadfda8.png)
![image](https://user-images.githubusercontent.com/17817050/211338880-de91dae7-7940-4695-b4d4-7c8076fc9e4d.png)


## Manage My Reviews
![image](https://user-images.githubusercontent.com/17817050/211338652-74d09e5a-eb5b-4b4f-af43-42dcb09014d6.png)


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

