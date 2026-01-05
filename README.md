# Job Application Autofiller Extension

A productivity tool designed to streamline the job application process by automatically filling in common fields on application forms.

# Overview

The Job Application Autofiller is a browser extension that helps job seekers save time by detecting and populating standard input fields on career sites and job boards. It securely stores your personal information locally and intelligently maps it to form fields.

## Features

  Smart Field Detection: Automatically identifies input fields for Name, Email, and Phone number using intelligent pattern matching.
  Secure Local Storage: Your personal data is stored locally in your browser and is never sent to external servers.
  Visual Feedback: Highlighted fields indicate where the extension has successfully autofilled information.
  Universal Compatibility: Works on various job boards and company career pages by analyzing standard HTML attributes.
  One-Click Setup: Easy-to-use popup interface for saving and updating your profile information.

## Tech Stack

    JavaScript: Core logic for DOM manipulation and storage management.
    HTML/CSS: For the extension popup interface and styling.
    Chrome Extension API:
      `chrome.storage`: For persisting user data.
      `chrome.scripting`: For injecting the autofill logic into web pages.

## Installation and Setup

1.  Clone or Download the Repository
    
    git clone <repository-url>
    cd job-autofiller-extension


2.  Load the Extension in Chrome
    1.   Open Chrome and navigate to `chrome://extensions/`.
    2.   Toggle "Developer mode" in the top right corner.
    3.   Click "Load unpacked"
    4.   Select the `job-autofiller-extension` directory.
    5.   Pin the Extension to Toolbar.

## Usage

1.  Configure Your Profile
    *   Click the extension icon in your browser toolbar.
    *   Fill in your details (Name, Email, Phone, etc.) in the popup window.
    *   Click "Save" to store your information.

2.  Autofill Applications
    *  Clicking on the Auto Fill option , automatically fills the job application form with user's saved data.
    


## Project Structure

JOB-AUTOFILLER-EXTENSION/
├── icons/                # Contains icon16.png, icon48.png, icon128.png
├── popup/                # Extension UI components
│   ├── popup.css         # Styling for the extension menu
│   ├── popup.html        # HTML structure of the popup interface
│   └── popup.js          # Handles save/edit logic & triggering autofill
├── scripts/              # Functional site-interaction scripts
│   └── content.js        # DOM-heavy logic injected into websites
├── manifest.json         # Extension configuration (Permissions/Metadata)
└── README.md             # Project overview and installation guide


## Future Improvements

*   Support for more complex fields (Education, Experience, LinkedIn URL,Firstname,Lastname,Middlename,Yes/No questions).
*   Resume upload and parsing capabilities.
*   Customizable field mapping for specific job boards.
*   Multiple Profiles: Support for switching between different personas (e.g., "Frontend Dev" vs "Full Stack") or languages.