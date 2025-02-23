# E-commerce REST API

A robust RESTful API for an e-commerce platform built with Node.js, Express.js, and PostgreSQL. This API includes user authentication, product management with categories, image upload using Cloudinary, shopping cart functionality, and order processing.

## Features

- JWT-based Authentication & Authorization
- Product Management with Image Upload
- Category Management
- Shopping Cart with Persistent Pricing
- Order Processing
- Product Filtering & Search
- Swagger API Documentation
- Security Best Practices

## Tech Stack

- Node.js & Express.js
- PostgreSQL with Sequelize ORM
- JWT for Authentication
- Cloudinary for Image Storage
- Swagger for API Documentation
- Helmet & CORS for Security

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- PostgreSQL
- Cloudinary Account
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3000
