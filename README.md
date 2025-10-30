# Find Your Seat

## Overview

Wedding hub seating chart, floor plan, food menu and photo using React.js

**Live**: [https://yuki-nagano.github.io/findyourseat/demo](https://yuki-nagano.github.io/findyourseat/demo)

## Features

- **Access Code Protection**: Secure access control using secret variables (access code required for non-demo access such as [home path](https://yuki-nagano.github.io/findyourseat/))
- **Name Search**: Find your seat by searching your name
  > *Note: Guest names are stored externally via Google Sheets API, not hardcoded in source code for privacy protection*
- **Floor Plan**: View venue layout (Coming Soon)
- **Menu**: Browse food and drink options (Coming Soon)
- **Photo Upload**: Share your wedding photos via Google Photos
- **Mobile Responsive**: Optimized for all devices
- **Modern UI**: Built with Material-UI and custom styling

## Local Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yuki-nagano/findyourseat.git
   cd findyourseat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   REACT_APP_GOOGLE_SHEETS_API_KEY=your_api_key_here
   REACT_APP_GOOGLE_SHEETS_ID=your_sheet_id_here
   REACT_APP_ACCESS_CODE=your_access_code_here
   REACT_APP_GOOGLE_PHOTOS_URL=your_google_photos_url_here
   REACT_APP_GOOGLE_PHOTOS_URL_DEMO=your_demo_photos_url_here
   ```

4. **Start development server**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

5. **Build for production**
   ```bash
   npm run build
   ```

## Tech Stack

- **Frontend**: React.js, Material-UI
- **Styling**: CSS3, Poppins Font
- **Icons**: FontAwesome
- **Data Source**: Google Sheets API
- **Deployment**: GitHub Pages
- **Build Tool**: Create React App

## Project Structure

```
src/
├── App.js          # Main application component
├── BottomNav.js     # Bottom navigation component
├── Floor.js         # Floor plan page
├── Menu.js          # Menu page
├── Photos.js        # Photo upload page
└── common.css       # Shared styles
```
