# High-Level Design Document

## Project Title

LuxeStay Istanbul Hotel Reservation System

## System Overview

The system is a full-stack web application with a React frontend, ASP.NET Core Web API backend, Entity Framework Core data access layer, and SQLite database.

The frontend provides the user interface for browsing rooms, booking rooms, submitting requests, and administering hotel data. The backend exposes REST API endpoints for users, authentication, rooms, bookings, and complaint requests. The database stores rooms, users, bookings, and requests.

## High-Level Architecture

```mermaid
flowchart TB
    User[User Browser]
    Frontend[React Frontend]
    Api[ASP.NET Core Web API]
    Services[Application Services]
    DbContext[Entity Framework Core DbContext]
    Database[(SQLite Database)]
    StaticFiles[wwwroot uploads]

    User --> Frontend
    Frontend --> Api
    Api --> Services
    Api --> DbContext
    DbContext --> Database
    Api --> StaticFiles
```

## Main Frontend Modules

| Module | Responsibility |
| --- | --- |
| Home | Displays hero section, date and guest search, and featured rooms. |
| Rooms | Displays all rooms with search, sorting, and booking actions. |
| RoomDetails | Displays selected room details, gallery, amenities, and booking panel. |
| BookingForm | Handles booking form validation and submission. |
| MyReservations | Displays guest reservations and cancellation action. |
| Requests | Handles complaint and request submission. |
| AdminDashboard | Allows admin to manage rooms, bookings, users, and requests. |
| Navbar | Provides navigation, responsive mobile drawer, and theme toggle. |
| Footer | Displays hotel contact details and useful links. |

## Main Backend Modules

| Module | Responsibility |
| --- | --- |
| AuthController | Handles signup and login. |
| RoomsController | Handles room listing, creation, update, deletion, and image upload. |
| BookingsController | Handles booking creation, listing, user reservations, status update, and cancellation. |
| ComplaintRequestsController | Handles complaint or request creation, listing, and status update. |
| UsersController | Provides user list data for admin dashboard. |
| ApplicationDbContext | Defines database tables and relationships. |
| PasswordHasher | Hashes and verifies user passwords. |

## Sequence Diagram: User Signup

```mermaid
sequenceDiagram
    actor Visitor
    participant SignupPage as Signup Page
    participant AuthService as Auth Service
    participant AuthApi as AuthController
    participant Db as SQLite Database

    Visitor->>SignupPage: Enter full name, email, password
    SignupPage->>AuthService: signup(userData)
    AuthService->>AuthApi: POST /api/auth/signup
    AuthApi->>Db: Check if email exists
    Db-->>AuthApi: Email availability result
    AuthApi->>AuthApi: Hash password
    AuthApi->>Db: Save new user
    Db-->>AuthApi: Saved user
    AuthApi-->>AuthService: User response
    AuthService-->>SignupPage: Created user
    SignupPage->>SignupPage: Save user session and navigate
```

## Sequence Diagram: User Login

```mermaid
sequenceDiagram
    actor User
    participant LoginPage as Login Page
    participant AuthService as Auth Service
    participant AuthApi as AuthController
    participant Db as SQLite Database

    User->>LoginPage: Enter email and password
    LoginPage->>AuthService: login(credentials)
    AuthService->>AuthApi: POST /api/auth/login
    AuthApi->>Db: Find user by email
    Db-->>AuthApi: User record
    AuthApi->>AuthApi: Verify password hash
    AuthApi-->>AuthService: User response
    AuthService-->>LoginPage: Authenticated user
    LoginPage->>LoginPage: Store user in local storage
```

## Sequence Diagram: Browse Rooms and Book Room

```mermaid
sequenceDiagram
    actor Guest
    participant Home as Home Page
    participant RoomsPage as Rooms Page
    participant BookingForm as Booking Form
    participant BookingService as Booking Service
    participant BookingApi as BookingsController
    participant Db as SQLite Database

    Guest->>Home: Select check-in, check-out, guests
    Home->>RoomsPage: Navigate with query parameters
    RoomsPage->>BookingForm: Open room modal with default dates and guests
    Guest->>BookingForm: Review or adjust booking details
    BookingForm->>BookingService: createBooking(booking)
    BookingService->>BookingApi: POST /api/bookings
    BookingApi->>Db: Validate room and save booking
    Db-->>BookingApi: Booking saved
    BookingApi-->>BookingService: Booking response
    BookingService-->>BookingForm: Success response
    BookingForm-->>Guest: Show success notification
```

## Sequence Diagram: Submit Complaint or Request

```mermaid
sequenceDiagram
    actor User
    participant RequestPage as Requests Page
    participant RequestService as Complaint Service
    participant RequestApi as ComplaintRequestsController
    participant Db as SQLite Database

    User->>RequestPage: Enter category, subject, message
    RequestPage->>RequestService: createRequest(request)
    RequestService->>RequestApi: POST /api/complaintrequests
    RequestApi->>RequestApi: Validate required fields
    RequestApi->>Db: Save request with Open status
    Db-->>RequestApi: Request saved
    RequestApi-->>RequestService: Request response
    RequestService-->>RequestPage: Success response
    RequestPage-->>User: Show confirmation
```

## Sequence Diagram: Admin Adds Room With Image Upload

```mermaid
sequenceDiagram
    actor Admin
    participant Dashboard as Admin Dashboard
    participant RoomService as Room Service
    participant RoomApi as RoomsController
    participant Uploads as wwwroot/uploads
    participant Db as SQLite Database

    Admin->>Dashboard: Select image file
    Dashboard->>RoomService: uploadRoomImage(file)
    RoomService->>RoomApi: POST /api/rooms/upload
    RoomApi->>RoomApi: Validate file type and size
    RoomApi->>Uploads: Save uploaded image
    RoomApi-->>RoomService: Return imageUrl
    RoomService-->>Dashboard: Display preview
    Admin->>Dashboard: Submit room details
    Dashboard->>RoomService: createRoom(room)
    RoomService->>RoomApi: POST /api/rooms
    RoomApi->>Db: Save room
    Db-->>RoomApi: Room saved
    RoomApi-->>Dashboard: Created room
```

## Sequence Diagram: Admin Updates Booking Status

```mermaid
sequenceDiagram
    actor Admin
    participant Dashboard as Admin Dashboard
    participant BookingService as Booking Service
    participant BookingApi as BookingsController
    participant Db as SQLite Database

    Admin->>Dashboard: Change booking status
    Dashboard->>BookingService: updateBookingStatus(id, status)
    BookingService->>BookingApi: PUT /api/bookings/{id}/status
    BookingApi->>Db: Find booking
    Db-->>BookingApi: Booking record
    BookingApi->>Db: Save updated status
    Db-->>BookingApi: Updated booking
    BookingApi-->>BookingService: Booking response
    BookingService-->>Dashboard: Refresh dashboard data
```

## Deployment View

```mermaid
flowchart LR
    Browser[Browser]
    ReactApp[React Dev Server]
    ApiServer[ASP.NET Core Server]
    SQLite[(hotel.db)]
    Uploads[Static Uploaded Images]

    Browser --> ReactApp
    ReactApp --> ApiServer
    ApiServer --> SQLite
    ApiServer --> Uploads
```
