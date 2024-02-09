<p style="text-align: center;">
![Bookmarker Logo](https://raw.githubusercontent.com/SantosAlarcon/bookmarker/86ea9cf8e397bcc1872a304b2144de7fdb014259/public/BookmarkerLogo.svg)

**Bookmarker** is a bookmark manager that lets you manage your bookmarks and folders everywhere, whatever you are in mobile or your PC.
</p>

# Used technologies
* **NextJS** (for the frontend and backend)
* **Zustand** (global state management)
* **Supabase** (for the database and authentication)
* **Sonner** (to render good looking notifications)

# Folder structure
* **mock** - Used to store JSON data and will be removed when the database implementation is completed
* **pages** - Used to render API routes
* **public** - Static content like images and stuff
* **src** - Most of the code is stored here, with the components, store, utilities and types
* **tests** - Unit and E2E testing

## ️⚠️ Warning
This project is in WIP, but you can log in and log out without problem. What you can't do at the moment is managing the bookmarks until I implemented the database operations.