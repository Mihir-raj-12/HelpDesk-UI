import { TestBed } from '@angular/core/testing';
import { TicketService } from './ticket';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('TicketService', () => {
  let service: TicketService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);

    TestBed.configureTestingModule({
      providers: [
        TicketService,
        { provide: HttpClient, useValue: mockHttpClient }
      ]
    });
    service = TestBed.inject(TicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update ticket status', () => {
    mockHttpClient.put.and.returnValue(of({ isSuccess: true }));
    service.updateTicketStatus(1, 2).subscribe(res => {
      expect(res.isSuccess).toBeTrue();
    });
    expect(mockHttpClient.put).toHaveBeenCalledWith(
      jasmine.any(String),
      { ticketId: 1, status: 2 }
    );
  });
});
