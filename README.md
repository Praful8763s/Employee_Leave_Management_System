# Employee Leave Management System

A full-stack web application for managing employee leave requests with role-based access control.

## Features

- **User Authentication**: Secure login/registration with JWT tokens
- **Role-Based Access**: Different permissions for employees and managers
- **Leave Request Management**: Submit, approve, reject leave requests
- **Leave Balance Tracking**: Automatic balance updates for vacation, sick, and personal days
- **Calendar View**: Visual representation of approved leave schedules
- **Leave History**: Filter and view past leave requests
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

**Backend:**
- Django 4.2 + Django REST Framework
- SQLite database (easily configurable to PostgreSQL)
- JWT Authentication with SimpleJWT
- CORS headers for frontend integration

**Frontend:**
- React 18 with Vite for fast development
- Tailwind CSS for styling
- React Router for navigation
- React Hook Form for form handling
- React Calendar for calendar views
- Axios for API calls

## Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd employee-leave-management-system/backend
   ```

2. **Create virtual environment (recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start development server:**
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd employee-leave-management-system/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## Usage

### Getting Started

1. **Register a new account** at `http://localhost:5173/register`
   - Choose role: Employee or Manager
   - Fill in required information

2. **Login** with your credentials

3. **For Employees:**
   - View dashboard with leave balances
   - Submit new leave requests
   - View request history and status

4. **For Managers:**
   - Access manager dashboard
   - Review and approve/reject leave requests
   - View all employee leave requests

### Key Features

#### Employee Dashboard
- View current leave balances (vacation, sick, personal days)
- Submit new leave requests with date range and reason
- Track request status (pending, approved, rejected)
- View recent leave history

#### Manager Dashboard
- See all pending requests requiring action
- Approve or reject leave requests with comments
- View comprehensive leave statistics
- Monitor team leave schedules

#### Calendar View
- Visual calendar showing approved leave dates
- Click on dates to see who's on leave
- Color-coded leave types

#### Leave History
- Filter by status, leave type, and year
- Export capabilities (can be extended)
- Detailed request information

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/token/refresh/` - Refresh JWT token
- `GET /api/auth/profile/` - Get user profile
- `PATCH /api/auth/profile/` - Update user profile

### Leave Management
- `GET /api/leaves/` - List leave requests
- `POST /api/leaves/` - Create leave request
- `GET /api/leaves/{id}/` - Get specific leave request
- `PATCH /api/leaves/{id}/` - Update leave request
- `DELETE /api/leaves/{id}/` - Delete leave request
- `PATCH /api/leaves/{id}/approve/` - Approve/reject leave request
- `GET /api/leaves/calendar/` - Get calendar data

## Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
```

### Database Configuration
The system uses SQLite by default. To use PostgreSQL:

1. Install psycopg2: `pip install psycopg2-binary`
2. Update `settings.py` DATABASES configuration
3. Run migrations: `python manage.py migrate`

## Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## Deployment

### Backend Deployment
1. Set `DEBUG=False` in production
2. Configure proper database (PostgreSQL recommended)
3. Set up static file serving
4. Use WSGI server like Gunicorn

### Frontend Deployment
1. Build the project: `npm run build`
2. Serve the `dist` folder with a web server
3. Update API URLs for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please create an issue in the repository or contact the development team.