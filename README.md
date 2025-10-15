It is a simple React-based Single Page Application (SPA) designed for managing products.
It allows users to add, edit, delete, and view products with live updates. The application uses React Context API for state management and a mock API powered by JSON Server for backend simulation.

The project demonstrates clean component architecture, API integration, and integration testing using Jest.

Setup Instructions
1. Clone the repository
git clone https://github.com/salik123456/travelup-task/

2. Install dependencies
npm install

3. Run the application

This command runs both the React app and the JSON Server concurrently.

npm run dev


Once started:

React app will be available at →  http://localhost:5173/

Mock API (JSON Server) will run at → http://localhost:5001 (it can be changed)

Mock API Configuration

The mock API uses a local db.json file located in the project root.

Example structure:

[
  {
    "id": "1",
    "name": "iPhone 17",
    "price": 99,
    "image": "https://m.media-amazon.com/images/I/716Bo6d914L._AC_SL1500_.jpg"
  },
  {
    "id": "2",
    "name": "Galaxy S25 Ultra",
    "price": 49,
    "image": "https://m.media-amazon.com/images/I/61wRxkTFZhL._AC_SY300_SX300_QL70_ML2_.jpg"
  }
]

Testing

Integration tests are written using Jest and React Testing Library.

To run all tests:

npm test


The test suite covers:

Adding a new product

Editing product details

Deleting a product

Validating input fields

All test cases should pass successfully before submission.


Code Structure

src/
├── components/
│   └── ProductCard.jsx        # Renders individual product cards
├── context/
│   └── ProductContext.jsx     # Global state using React Context API
├── pages/
│   └── Products.jsx           # Main page with all product operations
├── utils/
│   ├── api.js                 # Axios instance and API base configuration
│   └── toast.js               # Toast notifications for user feedback
├── _tests_/
│   └── Products.test.jsx      # Integration tests
└── styles/
    └── Products.scss          # Styling for product UI


Design Choices

React Context API was used for lightweight and scalable state management.

Axios provides clean HTTP requests with a reusable API instance.

JSON Server simulates backend CRUD operations for realistic data flow.

Jest + React Testing Library ensures UI and logic consistency through integration testing.

Clean folder structure for readability and maintainability.