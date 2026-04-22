import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['post']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: Router, useValue: mockRouter }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.removeItem('token');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and return response', () => {
    const mockResponse = { data: { token: '123', fullName: 'Test', email: 'test@test.com', role: 'User', expiresAt: '2026-01-01' }, isSuccess: true, message: '' };
    mockHttpClient.post.and.returnValue(of(mockResponse));
    
    service.login({ username: 'testuser', password: 'password' }).subscribe({
      next: res => expect(res).toEqual(mockResponse)
    });

    expect(mockHttpClient.post).toHaveBeenCalled();
  });

  it('should logout and clear localStorage', () => {
    localStorage.setItem('token', 'fake-token');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
