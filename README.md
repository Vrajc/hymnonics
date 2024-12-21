"Visit the portal at http://localhost:5173 to view the website."


🎵 Hymnonics: A Modern Music Library Application
Hymnonics is a feature-rich music library application built using React.js for the frontend and Node.js with MongoDB for the backend. It allows users to explore, organize, and play their favorite songs seamlessly. The application implements user authentication, role-based access control, and efficient data chunking for optimal storage and retrieval of music files.

🚀 Features
🎧 Playlist Management
Create Playlists: Users can create custom playlists and name them dynamically.
Add Songs: Easily add songs to your playlists.
Search Songs: Search for songs and instantly play or add them to your playlist.
Randomized Welcome Section: Greet users with randomized song suggestions and posters on login.

🔒 User Authentication and Authorization
JWT-Based Authentication: Secure user login and session management using JSON Web Tokens (JWT).
Role-Based Access:
Admins: Manage song collections(Future Enhancements).
Users: Access playlists and play songs.
📁 Data Chunking with MongoDB

Efficiently stores large datasets like songs and playlists using MongoDB's powerful database structure.
Optimized retrieval of song data for fast performance.

🔊 Music Playback
Play songs directly in the app with a built-in audio player.
Fetches audio files dynamically and supports MP3 format.

🛠️ Tech Stack
Frontend: React, TailwindCSS
Backend: Node.js, Express.js
Database: MongoDB
Preview:
Postman Upload Example

Postman Upload Example

Postman Upload Example

Postman Upload Example

Postman Upload Example

Postman Upload Example

Postman Upload Example

Postman Upload Example

⚙️ Installation & Setup
Clone the repository:
git clone https://github.com/your-username/Hymnonics.git
cd Hymnonics
Set up the backend:
cd server
npm install
Configure the .env file:
Create a .env file in the server/ directory and add the following:

PORT=3000
MONGO_URI=your-mongo-uri
JWT_SECRET=your-secret-key
Start the backend:
npm run dev
Note:
Before using the application, you must upload MP3 songs to the database via Postman. Use the following API for uploading songs:

Post :http://localhost:3000/admin/upload

Here is an example screenshot of using Postman to upload songs:

Postman Upload Example

Set up the frontend:
cd ../client
npm install
npm run dev
🛡️ Security Features
JWT Protection: All API routes are secured with JWT tokens to ensure data privacy.
Role-Based Authorization: Restricts certain features to admin users.
Input Validation: Sanitizes user input to prevent injection attacks.
🌟 How It Works
User Authentication:
Register or log in with secure token-based authentication.
User Features:
Create and manage playlists, search songs, and enjoy a personalized welcome experience.
💡 Future Enhancements
Add user profiles and avatars.
Admin Dashboard
Support for additional audio formats.
Implement real-time collaborative playlist editing.
Feel free to contribute to this project or suggest new features via GitHub Issues!
