# Wanderlust

Wanderlust is a travel property booking website inspired by Airbnb, designed to offer a seamless platform for users to create, view, update, and delete property listings (villas, houses, etc.). The project features an intuitive interface, interactive maps, and a robust review system, making it a lightweight yet powerful solution for managing travel property bookings.

---

## 🌐 Live Demo

Check out the live version of Wanderlust: https://wanderlust-p701.onrender.com

---

## 📖 Description

Wanderlust serves as a smaller/lite version of Airbnb, focusing on simplicity and essential functionality. Users can explore and manage property listings while viewing their locations on an interactive map. Additionally, users can post reviews for listings.

The application uses **MapLibre** for map integration, with the **Nominatim API** to perform forward geocoding, converting locations into coordinates for precise map placements. All CRUD operations are supported for listings and reviews, ensuring a comprehensive experience.

---

## 🛠️ Features

- **CRUD Operations**: Full functionality to create, read, update, and delete property listings.
- **Interactive Maps**: MapLibre integration to display property locations with markers.
- **Geocoding**: Nominatim API for converting user-provided locations into map coordinates.
- **Reviews**: Users can post, view, and manage reviews for each listing.
- **Image Management**: Images are uploaded and managed using Cloudinary.
- **Responsive Design**: Optimized for mobile and desktop users.
- **Secure Authentication**: Login and session management using Passport.js.

---

## 🛠️ Tech Stack

### Frontend:
- **HTML5**
- **CSS**
- **Bootstrap**

### Backend:
- **Node.js**
- **Express.js**
- **EJS Template Engine** (with `ejs-mate` for layout management)
- **Method-Override** (for PUT and DELETE requests)

### Database:
- **MongoDB** (hosted on MongoDB Atlas)
- **Mongoose** (MongoDB object modeling tool)

### Authentication & Sessions:
- **Passport.js**: Authentication middleware.
- **passport-local** and **passport-local-mongoose**: Simplified user authentication.
- **Express-session**: Session management.

### File Uploads:
- **Multer**: Middleware for handling multipart/form-data.
- **Multer-Storage-Cloudinary**: For direct integration with Cloudinary.

### Geolocation and Mapping:
- **MapLibre**: Interactive maps for property location visualization.
- **@maplibre/maplibre-gl-geocoder**: For map search and geocoding.
- **Nominatim API**: Forward geocoding for converting locations to coordinates.

### Cloud Services:
- **Cloudinary**: For image storage and management.

### Validation:
- **Joi**: For request data validation.

### Utilities:
- **Connect-Flash**: For displaying flash messages.
- **Connect-Mongo**: To store session data in MongoDB.
- **dotenv**: For managing environment variables.

---

## 🚀 Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/wanderlust.git
   
2. Navigate to the project directory:
   ```bash
   cd wanderlust
   
3. Install dependencies:
   ```bash
   npm install

4. Create a .env file and add the following variables:
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   DATABASE_URL=your-mongodb-atlas-url

5. Start the server:
   ```bash
   node index.js

---

🔮 Future Enhancements
Advanced Search Filters:
Implement filters for price range, location proximity, and property type.
Payment Integration:
Integrate a secure payment gateway for booking properties.
User Dashboard:
Add a personalized dashboard for users to manage their bookings and reviews.
