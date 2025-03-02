A mobile application built with React Native and Expo for managing and displaying superheroes and leagues. This frontend communicates with a separate backend API (hosted on GitHub) to perform CRUD operations and retrieve data.

Features
	•	User Interface:
	•	Modern UI using LinearGradient backgrounds and custom components.
	•	Haptic feedback on tab navigation.
	•	Custom dropdowns for selecting superheroes.
	•	Navigation:
	•	Tab-based navigation implemented using expo-router.
	•	Screens for home, superheroes, and leagues.
	•	Data Interaction:
	•	Create, edit, and delete superheroes using forms.
	•	View lists of superheroes and leagues.
	•	The app interacts with a backend API (separate repository) for data management.

 Prerequisites
	•	Node.js (v14 or above)
	•	npm or yarn
	•	Expo CLI for mobile development

1. Installation
   git clone <FRONTEND_REPOSITORY_URL>
   cd SuperheroMobile
   
2. Install dependencies:
   npm install
   or
   yarn install

3.	Configure Backend API:
The app is designed to interact with a separate backend API (see Backend Repository). Ensure that the backend is running and accessible (typically via http://localhost:3000) or update the API URLs in your code accordingly.

4.	Start the app with Expo:
   npx expo start

his command will open the Expo Developer Tools. You can run the app on an Android/iOS emulator or on a physical device using the Expo Go app.

Usage
	•	Register Superhero:
Use the provided form to enter superhero details and register new heroes.
	•	Edit or Delete Superhero:
Use dropdown selectors and forms to update or remove existing heroes.
	•	View Data:
Browse through lists of superheroes and leagues.

License

This project is licensed under the MIT License. See the LICENSE file for details.
