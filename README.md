1. npm i next-auth mongodb   
2. npm i -D daisyui@latest
3. npm install react-icons
4. npm install react-slick slick-carousel
5. npm install axios
6. npm install bcrypt
7. npm install mongoose
8. npm install react-confirm-alert --save
9. npm install dotenv
10. npm install nodemailer



//when image upload the image will show on screen 
//theme
//recepie data save
// like button
// most liked dishes author
// edite profile
//verify email
// login error , is user exists? wrong credentials

1. token generates when sign up or login 
2. profile
3. private routes
4. multi step form
6. dynamic navbar



# RecipeShare

RecipeShare is a community-driven platform where users can share, discover, and save their favorite recipes. The website features user authentication, recipe management, and social interactions like comments and ratings.

## Features

- User authentication (signup, login, logout)
- Recipe CRUD operations (create, read, update, delete)
- Recipe search and filtering
- User profiles
- Comment and rating system
- Responsive design

## Technologies Used

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## Project Structure

\```
/recipes-share
├── /components
│   ├── CommentSection.js
│   ├── Header.js
│   ├── RecipeCard.js
│   ├── RecipeForm.js
│   ├── Footer.js
│   └── ...
├── /pages
│   ├── /api
│   │   ├── /auth
│   │   │   └── [...nextauth].js
│   │   ├── /recipes
│   │   │   ├── index.js
│   │   │   └── [id].js
│   │   └── ...
│   ├── /auth
│   │   ├── login.js
│   │   ├── register.js
│   │   └── ...
│   ├── /recipes
│   │   ├── index.js
│   │   ├── [id].js
│   │   └── ...
│   ├── _app.js
│   ├── index.js
│   └── ...
├── /public
│   ├── /images
│   │   └── ...
│   └── ...
├── /styles
│   ├── globals.css
│   └── ...
├── /utils
│   ├── api.js
│   └── ...
├── package.json
└── ...
\```

## Setup Instructions

1. **Clone the repository**:
    \```
    git clone https://github.com/yourusername/recipes-share.git
    cd recipes-share
    \```

2. **Install dependencies**:
    \```
    npm install
    \```

3. **Setup environment variables**: Create a `.env.local` file in the root directory and add the following variables:
    \```
    MONGODB_URI=your_mongodb_uri
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_nextauth_secret
    \```

4. **Run the development server**:
    \```
    npm run dev
    \```

5. **Open http://localhost:3000** in your browser to see the app in action.

## Usage Instructions

- **Signup/Login**: Create an account or log in using your credentials.
- **View Recipes**: Browse the homepage to see the latest recipes.
- **Search Recipes**: Use the search bar to find recipes by name or ingredients.
- **Create Recipe**: Click on the "Add Recipe" button to create a new recipe.
- **Edit/Delete Recipe**: Go to your profile to edit or delete your recipes.
- **Comment/Rate**: View a recipe's details to comment and rate it.

## API Endpoints

- **GET /api/recipes**: Get all recipes
- **GET /api/recipes/:id**: Get a specific recipe
- **POST /api/recipes**: Create a new recipe
- **PUT /api/recipes/:id**: Update a recipe
- **DELETE /api/recipes/:id**: Delete a recipe


## Challenges and Solutions

- **Challenge**: Implementing real-time comments.
- **Solution**: Used WebSockets to update comments in real-time.

## Future Improvements

- Adding recipe categories
- Implementing notifications
- Enhancing search functionality


- To send verify email use 'nodemailer'
1. Create mailer.js to send email
2. Create /api/verifyemail to update the isVerified status

- To show a preview of the image the user selects before uploading it, use a 'FileReader' to read the file and display it. 
1. Update the handleImageUpload function to read the selected file and set it as a preview image.
2. Add an imagePreview state to hold the preview image URL.