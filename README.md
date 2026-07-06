# Vehicle Tracking and Logging System

A web-based Vehicle Tracking and Logging System that automates vehicle entry and exit management using Computer Vision and Optical Character Recognition (OCR). The application detects vehicle number plates, identifies vehicle colors, stores records in a MySQL database, and provides an admin dashboard for monitoring and reporting.

## Live Demo

Live Application:
https://vehicle-tracking-system-2y52.onrender.com

GitHub Repository:
https://github.com/PatatiYasaswi/Vehicle-Tracking-System

---

## Project Overview

Managing vehicle entry and exit manually is time-consuming and prone to human errors. This project automates the complete process by allowing an administrator to upload vehicle images, automatically detecting the vehicle number plate and color, storing the information in a database, and providing searchable records and reports.

The application is built using Flask and OpenCV, while EasyOCR is used for extracting the vehicle registration number from uploaded images.

---

## Features

- Secure Admin Login
- Vehicle Entry Management
- Vehicle Exit Management
- Automatic Number Plate Recognition using EasyOCR
- Vehicle Color Detection using OpenCV
- Search Vehicle Records
- Entry and Exit Time Logging
- Report Generation
- Excel Export
- Responsive Dashboard
- MySQL Database Integration

---

## Technologies Used

### Backend

- Python
- Flask
- MySQL
- MySQL Connector

### Computer Vision

- OpenCV
- EasyOCR
- Pillow
- NumPy

### Frontend

- HTML
- CSS
- JavaScript

### Database

- MySQL

### Deployment

- Render (Web Application)
- Railway (MySQL Database)

---

## Project Structure

```
vehicle_tracking_system/
│
├── modules/
│   ├── camera_module.py
│   ├── color_detection.py
│   ├── plate_detection.py
│   └── report_generator.py
│
├── static/
│   ├── css/
│   ├── images/
│   └── js/
│
├── templates/
│
├── app.py
├── config.py
├── database.py
├── requirements.txt
├── render.yaml
└── README.md
```

---

## How It Works

1. Administrator logs into the system.
2. Uploads a vehicle image.
3. OpenCV processes the image.
4. EasyOCR extracts the vehicle number.
5. Vehicle color is detected.
6. Data is stored in MySQL.
7. Dashboard displays vehicle history.
8. Reports can be exported to Excel.

---

## Installation

Clone the repository

```bash
git clone https://github.com/PatatiYasaswi/Vehicle-Tracking-System.git
```

Move into the project

```bash
cd Vehicle-Tracking-System
```

Create a virtual environment

```bash
python -m venv .venv
```

Activate it

Windows

```bash
.venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Configure your `.env` file.

Run the application

```bash
python app.py
```

---

## Environment Variables

Create a `.env` file and configure:

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

SECRET_KEY=

CAMERA_SOURCE=
FALLBACK_CAMERA=0
```

---

## Challenges Faced

During development several real-world challenges were encountered:

- Configuring MySQL connectivity between local and cloud environments.
- Integrating EasyOCR with Flask.
- Handling bcrypt password authentication.
- Deploying Flask on Render.
- Connecting Render with Railway MySQL.
- Managing environment variables securely.
- Optimizing OpenCV image processing.

These challenges helped improve debugging, deployment, and backend development skills.

---

## Deployment Note

The web application is deployed successfully on Render and uses Railway MySQL for cloud database hosting.

Due to the memory limitations (512 MB RAM) of the free Render plan, EasyOCR model loading exceeds the available memory. Therefore, OCR-based number plate detection is fully functional in the local environment, while the deployed application demonstrates the complete user interface, authentication system, dashboard, reporting, and database integration.

---

## Future Improvements

- Live IP Camera Support
- Real-time Vehicle Detection
- Multiple Camera Integration
- Automatic Gate Control
- Email Notifications
- Mobile Application
- Vehicle Analytics Dashboard
- AI-based Vehicle Classification

---

## Skills Demonstrated

- Python Development
- Flask Web Development
- Computer Vision
- OCR Integration
- MySQL Database Design
- RESTful Backend Development
- Authentication
- Cloud Deployment
- Git & GitHub
- Debugging
- API Integration

---

## License

This project is intended for educational and portfolio purposes.
