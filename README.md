# Project Documentation

## 1. Online Practice Test Platform

### Overview

This project is a quiz application that allows users to register, log in, and take quizzes on various topics. The application features user authentication, dynamic quiz generation, and personalized quiz statistics.

## Video

### Project Demo

https://github.com/Nihar4/Assignment/assets/91326796/68886256-82d9-402a-af4a-7f24b236cf6b

## Screenshot

![Home](https://github.com/Nihar4/Assignment/assets/91326796/240f0b05-af66-41b5-be35-61422719b32c)
![Login](https://github.com/Nihar4/Assignment/assets/91326796/c297c888-3112-4bfe-912e-51167147e1d9)
![SignUp](https://github.com/Nihar4/Assignment/assets/91326796/780307db-356c-4780-aa02-e13c252c1bad)
![GoogleSignIn](https://github.com/Nihar4/Assignment/assets/91326796/20ee37f0-69c1-49eb-a6cd-ea3994b997f0)
![Quiz](https://github.com/Nihar4/Assignment/assets/91326796/3198e458-7f76-4690-96da-9a726c67a7dc)
![Dashboard](https://github.com/Nihar4/Assignment/assets/91326796/4d13f00c-7428-4721-ba36-8234aec40e93)
![Review](https://github.com/Nihar4/Assignment/assets/91326796/ecb1a175-9d28-4be9-90fd-e982710e80ca)

### Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Nihar4/Assignment.git
   cd Assignment/Online_Practice_Test_Platform
   ```

2. **Install Dependencies:**

   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set Up Environment Variables:**

   - Create a `.env` file in the backend directory and add the following:
     ```makefile
     PORT=5000
     MONGO_URI=
     JWT_SECRET=
     FRONTEND_URL =
     GOOGLE_CLIENT_ID =
     GOOGLE_CLIENT_SECRET =
     GOOGLE_CALLBACK_URL =
     SESSION_SECRET =
     ```

4. **Run the Application:**

   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd ../frontend
     npm start
     ```

5. **Access the Application:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### Approach and Assumptions

#### Approach

- **Backend:** The backend is built using Express.js and MongoDB. It includes user authentication, quiz management, and question handling.
- **Frontend:** The frontend is built using React.js. It includes pages for registration, login, home, quiz, dashboard, and quiz review.
- **Authentication:** The application uses JWT for user authentication and authorization.
- **Quiz Logic:** Quizzes are dynamically generated based on predefined tags and difficulty levels. The backend tracks user responses and adjusts the difficulty of subsequent questions accordingly.

#### Assumptions

- Each quiz consists of a predefined number of questions (e.g., 20 questions).
- Users can only take one quiz at a time.
- Tags are predefined and cannot be added dynamically through the UI.
- The system uses a basic algorithm to adjust question difficulty based on the user's performance.

# 2. Web Scraping Script

### Overview

This Python script scrapes property details from the real estate website [realestate.com.au](https://www.realestate.com.au/) for a specific location. It extracts information such as property address, type, price, bedrooms, bathrooms, parking spaces, square footage, auction details, and agent details.

## Setup Instructions

### Prerequisites

- Python latest version
- Required Python libraries: `requests`, `bs4`, `csv`, `json`

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nihar4/Assignment
   ```

2. Navigate to the project directory:

   ```bash
   cd Web_Scraping_Script
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the script:

   ```bash
   python Web_Scraping.ipynb
   ```

## Approach

The script follows these main steps:

1. **Fetching and Parsing Data**: The `fetch_and_parse` function is used to fetch HTML data from the specified URL using the `requests` library. It then parses the HTML using `BeautifulSoup` to extract property details.

2. **Extracting Property Details**: The `extract_property_details` function extracts various property details from the parsed HTML data using BeautifulSoup. It searches for specific HTML elements containing property information such as address, type, price, bedrooms, bathrooms, etc.

3. **Saving Data**: The extracted property details are stored in a list of dictionaries. The data is then saved to CSV and JSON files using the `csv` and `json` libraries, respectively.

4. **Pagination**: The script iterates through multiple pages of property listings by following the pagination links until there are no more pages left.

## Assumptions

- The script assumes that property details are consistently structured across different listings on the real estate website. Any changes to the website's HTML structure may require adjustments to the parsing logic.
- It assumes that all required information (e.g., address, type, price) is present on each property listing page. If certain details are missing, they will be omitted from the output.
- Pagination is assumed to be available and follows a standard format of "Go to Next Page" links. If the website's pagination structure changes, the script may need to be modified accordingly.

### Json Demo

[property_details - Copy (2).json](https://github.com/user-attachments/files/15580231/property_details.-.Copy.2.json)

### CSV Demo

[property_details - Copy (2).csv](https://github.com/user-attachments/files/15580230/property_details.-.Copy.2.csv)
