import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './user-service.service';
import { Usuario, CreateUserPayload } from '../models/index-usuario';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Debe traer a los usuarios desde la API', () => {
    const mockUsers: Usuario[] = [
      { id: 1, firstname: 'Pablo', lastname: 'Girone', email: 'pablo@mail.com', birth: new Date('1990-01-01') },
      { id: 2, firstname: 'Nicolas', lastname: 'Sanchez', email: 'nicolas@mail.com', birth: new Date('1995-02-02') }
    ];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('baseAPIURL/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('Debe crear un nuevo usuario', () => {
    const newUser: CreateUserPayload = {
      firstname: 'Nuevo',
      lastname: 'Usuario',
      email: 'nuevousuario1@mail.com',
      birth: new Date('2000-03-03')
    };

    service.createUsers(newUser).subscribe(user => {
        expect(user).toEqual(newUser as Usuario);
      });      

    const req = httpMock.expectOne('baseAPIURL/users');
    expect(req.request.method).toBe('POST');
    req.flush({ ...newUser, id: 1 });
  });

  it('Debe borrar un usuario', () => {
    const userId = 1;

    service.deleteUser(userId).subscribe(() => {
    });

    const req = httpMock.expectOne(`baseAPIURL/users/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('Debe actualizar un usuario', () => {
    const userId = 1;
    const updatedUser: Partial<Usuario> = {
      id: userId,
      firstname: 'Usuario',
      lastname: 'Actualizado',
      email: 'usuarioactualizado@mail.com',
      birth: new Date('2000-03-03')
    };

    service.updateUser(userId, updatedUser).subscribe(user => {
      expect(user).toEqual(updatedUser as Usuario);
    });

    const req = httpMock.expectOne(`baseAPIURL/users/${userId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUser);
  });
});
