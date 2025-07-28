export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
      token: string;
      user: User;
    };
  }
  
  export interface ProfileResponse {
    success: boolean;
    data: {
      user: User;
    };
  }
  
  export interface ApiError {
    success: false;
    message: string;
    errors?: Array<{
      field: string;
      message: string;
    }>;
  }