# INKLEE - A Modern Blogging Platform

Welcome to **INKLEE**, a sleek and powerful blogging platform built for content creators who want a seamless and user-friendly experience. This project leverages cutting-edge technologies to deliver a robust, AI-enhanced blogging application.

## Features
- **Rich Text Editing**: Create and format content with ease using the TinyMCE editor.
- **AI-Powered Content Generation**: Get content suggestions and generate blog ideas using integrated AI.
- **Dynamic Forms**: Leverage React Hook Form for efficient form management.
- **State Management**: Use Redux Toolkit for predictable and scalable application state.
- **File Uploads**: Manage images and files effortlessly with Appwrite's backend services.
- **Responsive Design**: Fully optimized for all screen sizes.

## Technologies Used

### Frontend
- **React**: For building a dynamic and interactive user interface.
- **React Hook Form**: To handle forms efficiently with validation and minimal re-renders.
- **TinyMCE Editor**: For a rich-text editing experience in blog content creation.
- **Redux Toolkit**: For state management and centralized application data.
- **Tailwind CSS**: To style the application with responsive and utility-first design principles.

### Backend
- **Appwrite**: As the backend service to handle user authentication, database operations, and file storage.

### AI Integration
- **Hugging Face API**: For AI-powered content generation, utilizing the Mistral-7B model for high-quality text outputs.

## Installation

### Prerequisites
- Node.js installed on your system.
- Appwrite instance set up for backend services.

### Steps to Set Up the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/amol-gawade01/INKLEE.git
   cd inklee
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the project root.
   - Add your Appwrite API endpoint, project ID, and other configurations.
   ```env
   REACT_APP_APPWRITE_ENDPOINT=<your-appwrite-endpoint>
   REACT_APP_APPWRITE_PROJECT=<your-project-id>
   REACT_APP_HUGGINGFACE_API_KEY=<your-huggingface-api-key>
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the application in your browser at `http://localhost:3000`.

## How It Works

### Frontend
- **Dynamic Form Handling**: React Hook Form manages blog post creation and editing forms, ensuring validation and clean input handling.
- **Rich Text Editor**: TinyMCE allows users to create and format content intuitively.
- **AI Integration**: Users can enter prompts to get AI-generated blog content, which integrates seamlessly into the TinyMCE editor.
- **State Management**: Redux Toolkit handles user session data, form states, and application-wide notifications.

### Backend
- **Appwrite**: Provides robust backend services including:
  - **User Authentication**: Secure login and registration.
  - **Database**: Storing blog posts and user data.
  - **File Storage**: Handling featured images and other media.

### AI Integration
- **Prompt Handling**: Users provide prompts in a dedicated input field, which are sent to Hugging Face's Mistral-7B model.
- **Response Processing**: AI responses are cleaned and integrated into the editor without echoing the original prompt.

## Project Structure
```
INKLY/
├── src/
│   ├── components/        # Reusable React components
│   ├── features/          # Redux slices
│   ├── pages/             # Page-level components
│   ├── services/          # API calls and Appwrite service wrappers
│   ├── App.js             # Main application file
│   ├── index.js           # Entry point
├── public/                # Public assets
├── .env                   # Environment variables
├── package.json           # Project metadata and dependencies
```

## Future Enhancements
- **Commenting System**: Allow users to interact through comments.
- **Enhanced AI Features**: Generate images and perform advanced text summarization.
- **User Profiles**: Enable personalized user dashboards.

## Contributing
We welcome contributions! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the INKLEE.

---



Enjoy using INKLY, and happy blogging!

