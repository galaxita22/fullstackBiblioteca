import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
    let service: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService]
        });
        service = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should perform loginUsuario POST', () => {
        const loginData = { email: 'test@test.com', password: '123' };

        service.loginUsuario(loginData).subscribe(res => {
            expect(res).toEqual({ ok: true });
        });

        const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
        expect(req.request.method).toBe('POST');
        req.flush({ ok: true });
    });

    it('should call obtenerLibrosGuardados', () => {
        service.obtenerLibrosGuardados('harry').subscribe(res => {
            expect(res).toEqual([]);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/books/buscar?termino=harry');
        expect(req.request.method).toBe('GET');
        req.flush([]);
    });

    it('should call guardarLibro', () => {
        const book = { volumeInfo: { title: 'Title', authors: ['Author'], categories: ['Fiction'], description: 'desc', imageLinks: { thumbnail: 'img' } } };

        service.guardarLibro(book, 1).subscribe();

        const req = httpMock.expectOne('http://localhost:8080/api/books/agregar');
        expect(req.request.method).toBe('POST');
        expect(req.request.body.title).toBe('Title');
        expect(req.request.body.cantidadEjemplares).toBe(1);
        req.flush({});
    });
});