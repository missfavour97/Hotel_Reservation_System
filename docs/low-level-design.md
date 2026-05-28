# Low-Level Design Document

## Project Title

LuxeStay Istanbul Hotel Reservation System

## Purpose

This document describes the low-level structure of the application, including the main classes, frontend modules, backend API controllers, and database entities.

## Backend Class Diagram

```mermaid
classDiagram
    class ApplicationDbContext {
        +DbSet~Room~ Rooms
        +DbSet~Booking~ Bookings
        +DbSet~User~ Users
        +DbSet~ComplaintRequest~ ComplaintRequests
        +OnModelCreating(ModelBuilder)
    }

    class Room {
        +int Id
        +string Title
        +string Description
        +decimal Price
        +string ImageUrl
        +int Capacity
        +string BedType
        +string Size
        +string Amenities
        +bool IsFeatured
    }

    class Booking {
        +int Id
        +string FullName
        +string Email
        +DateTime CheckInDate
        +DateTime CheckOutDate
        +int Guests
        +int RoomId
        +Room Room
        +int UserId
        +User User
        +string Status
        +DateTime CreatedAt
    }

    class User {
        +int Id
        +string FullName
        +string Email
        +string PasswordHash
        +string Role
        +DateTime CreatedAt
    }

    class ComplaintRequest {
        +int Id
        +string FullName
        +string Email
        +string Category
        +string Subject
        +string Message
        +string Status
        +int UserId
        +User User
        +DateTime CreatedAt
    }

    class AuthController {
        +Signup(SignupRequest)
        +Login(LoginRequest)
    }

    class RoomsController {
        +GetRooms()
        +GetRoom(int)
        +CreateRoom(Room)
        +UploadRoomImage(IFormFile)
        +UpdateRoom(int, Room)
        +DeleteRoom(int)
    }

    class BookingsController {
        +CreateBooking(Booking)
        +GetBookings()
        +GetUserBookings(int)
        +UpdateStatus(int, StatusUpdateRequest)
        +CancelBooking(int)
    }

    class ComplaintRequestsController {
        +GetRequests()
        +GetUserRequests(int)
        +CreateRequest(ComplaintRequest)
        +UpdateStatus(int, StatusUpdateRequest)
    }

    class UsersController {
        +GetUsers()
    }

    class PasswordHasher {
        +Hash(string)
        +Verify(string, string)
    }

    ApplicationDbContext --> Room
    ApplicationDbContext --> Booking
    ApplicationDbContext --> User
    ApplicationDbContext --> ComplaintRequest
    Booking --> Room
    Booking --> User
    ComplaintRequest --> User
    AuthController --> ApplicationDbContext
    AuthController --> PasswordHasher
    RoomsController --> ApplicationDbContext
    BookingsController --> ApplicationDbContext
    ComplaintRequestsController --> ApplicationDbContext
    UsersController --> ApplicationDbContext
```

## Frontend Module Diagram

```mermaid
classDiagram
    class App {
        +Routes
    }

    class AppLayout {
        +Navbar
        +MainContent
        +Footer
    }

    class Navbar {
        +NavigationLinks
        +MobileDrawer
        +ThemeToggle
        +AuthActions
    }

    class Home {
        +Hero
        +DateSearch
        +FeaturedRooms
    }

    class Rooms {
        +SearchRooms
        +SortRooms
        +RoomCardList
    }

    class RoomCard {
        +RoomSummary
        +BookingModal
        +SuccessNotification
    }

    class BookingForm {
        +ValidateDates
        +SubmitBooking
        +ShowConfirmation
    }

    class RoomDetails {
        +ImageGallery
        +Amenities
        +BookingPanel
    }

    class MyReservations {
        +LoadUserBookings
        +CancelBooking
    }

    class Requests {
        +SubmitComplaintRequest
    }

    class AdminDashboard {
        +ManageRooms
        +ManageBookings
        +ManageUsers
        +ManageRequests
        +UploadRoomImage
    }

    class AuthContext {
        +user
        +login()
        +signup()
        +logout()
        +isAdmin
    }

    class ThemeModeContext {
        +mode
        +toggleMode()
    }

    class ApiClient {
        +apiRequest()
    }

    App --> AppLayout
    AppLayout --> Navbar
    AppLayout --> Home
    AppLayout --> Rooms
    AppLayout --> RoomDetails
    AppLayout --> MyReservations
    AppLayout --> Requests
    AppLayout --> AdminDashboard
    Rooms --> RoomCard
    RoomCard --> BookingForm
    RoomDetails --> BookingForm
    Home --> ApiClient
    Rooms --> ApiClient
    BookingForm --> ApiClient
    MyReservations --> ApiClient
    Requests --> ApiClient
    AdminDashboard --> ApiClient
    Navbar --> AuthContext
    Navbar --> ThemeModeContext
```

## Entity Relationship Diagram

```mermaid
flowchart LR
    USERS["USERS<br/><br/>PK: Id<br/>FullName<br/>Email (Unique)<br/>PasswordHash<br/>Role<br/>CreatedAt"]

    ROOMS["ROOMS<br/><br/>PK: Id<br/>Title<br/>Description<br/>Price<br/>ImageUrl<br/>Capacity<br/>BedType<br/>Size<br/>Amenities<br/>IsFeatured"]

    BOOKINGS["BOOKINGS<br/><br/>PK: Id<br/>FK: RoomId -> Rooms.Id<br/>FK: UserId -> Users.Id (nullable)<br/>FullName<br/>Email<br/>CheckInDate<br/>CheckOutDate<br/>Guests<br/>Status<br/>CreatedAt"]

    REQUESTS["COMPLAINT_REQUESTS<br/><br/>PK: Id<br/>FK: UserId -> Users.Id (nullable)<br/>FullName<br/>Email<br/>Category<br/>Subject<br/>Message<br/>Status<br/>CreatedAt"]

    USERS -->|"1 user can have 0..many bookings"| BOOKINGS
    ROOMS -->|"1 room can have 0..many bookings"| BOOKINGS
    USERS -->|"1 user can submit 0..many requests"| REQUESTS
```

## Entity Relationship Summary

| Relationship | Cardinality | Foreign Key | Meaning |
| --- | --- | --- | --- |
| Users to Bookings | One-to-many | `Bookings.UserId` | A registered guest can create many bookings. A booking can also keep guest name and email even if the user is removed. |
| Rooms to Bookings | One-to-many | `Bookings.RoomId` | A room can appear in many bookings over time. Each booking belongs to one room. |
| Users to ComplaintRequests | One-to-many | `ComplaintRequests.UserId` | A registered guest can submit many complaints or requests. Visitor requests can be stored without a user id. |

## Database Table Details

### Users

| Field | Type | Description |
| --- | --- | --- |
| Id | int | Primary key. |
| FullName | string | User full name. |
| Email | string | Unique user email address. |
| PasswordHash | string | Hashed password. |
| Role | string | User role such as `Guest` or `Admin`. |
| CreatedAt | DateTime | Date and time user account was created. |

### Rooms

| Field | Type | Description |
| --- | --- | --- |
| Id | int | Primary key. |
| Title | string | Room name. |
| Description | string | Room description. |
| Price | decimal | Price per night. |
| ImageUrl | string | Image path or uploaded image URL. |
| Capacity | int | Maximum guest capacity. |
| BedType | string | Bed type information. |
| Size | string | Room size. |
| Amenities | string | Comma-separated amenity list. |
| IsFeatured | bool | Whether the room appears in featured stays. |

### Bookings

| Field | Type | Description |
| --- | --- | --- |
| Id | int | Primary key. |
| FullName | string | Name of booking guest. |
| Email | string | Email of booking guest. |
| CheckInDate | DateTime | Booking check-in date. |
| CheckOutDate | DateTime | Booking check-out date. |
| Guests | int | Number of guests. |
| RoomId | int | Foreign key to Rooms. |
| UserId | int | Optional foreign key to Users. |
| Status | string | Booking status such as `Pending`, `Confirmed`, or `Cancelled`. |
| CreatedAt | DateTime | Date and time booking was created. |

### ComplaintRequests

| Field | Type | Description |
| --- | --- | --- |
| Id | int | Primary key. |
| FullName | string | Sender name. |
| Email | string | Sender email. |
| Category | string | Request category. |
| Subject | string | Request subject. |
| Message | string | Request message. |
| Status | string | Request status such as `Open` or `Resolved`. |
| UserId | int | Optional foreign key to Users. |
| CreatedAt | DateTime | Date and time request was created. |

## API Endpoint Summary

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/auth/signup` | POST | Register a new guest account. |
| `/api/auth/login` | POST | Authenticate a user. |
| `/api/rooms` | GET | Get all rooms. |
| `/api/rooms/{id}` | GET | Get one room by id. |
| `/api/rooms` | POST | Create a room. |
| `/api/rooms/upload` | POST | Upload a room image. |
| `/api/rooms/{id}` | PUT | Update a room. |
| `/api/rooms/{id}` | DELETE | Delete a room without bookings. |
| `/api/bookings` | POST | Create a booking. |
| `/api/bookings` | GET | Get all bookings. |
| `/api/bookings/user/{userId}` | GET | Get bookings for one user. |
| `/api/bookings/{id}/status` | PUT | Update booking status. |
| `/api/bookings/{id}` | DELETE | Cancel a booking. |
| `/api/complaintrequests` | GET | Get all complaints and requests. |
| `/api/complaintrequests/user/{userId}` | GET | Get requests for one user. |
| `/api/complaintrequests` | POST | Create a complaint or request. |
| `/api/complaintrequests/{id}/status` | PUT | Update complaint or request status. |
| `/api/users` | GET | Get all users for admin dashboard. |
