import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { UsersComponent } from './users.component';
import { UsersService } from '../../../../core/services/user-service.service';
import { Usuario } from '../../../../core/models/index-usuario';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockUserService: jasmine.SpyObj<UsersService>;
  const mockUsers: Usuario[] = [
    { id: 1, firstname: 'Test', lastname: 'User', email: 'test@example.com', birth: new Date() }
  ];

  beforeEach(async () => {
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockUserService = jasmine.createSpyObj('UsersService', ['getUsers', 'createUsers', 'updateUser', 'deleteUser']);
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: UsersService, useValue: mockUserService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    mockUserService.getUsers.and.returnValue(of(mockUsers));
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar los usuarios en el on init', () => {
    expect(component.loading).toBeFalse();
    expect(component.users).toEqual(mockUsers);
  });

  it('Debe abrir el dialog para editar un usuario', () => {
    const editingUser: Usuario = mockUsers[0];
    component.openDialog(editingUser);
    expect(mockMatDialog.open).toHaveBeenCalledWith(jasmine.any(Function), { data: editingUser });
  });

  it('Debe abrir el dialog para crear un usuario', () => {
    component.openDialog();
    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  it('Debe eliminar un usuario', () => {
    const userIdToDelete = 1;
    mockUserService.deleteUser.and.returnValue(of(null));
    component.onDeleteUser(userIdToDelete);
    expect(mockUserService.deleteUser).toHaveBeenCalledWith(userIdToDelete);
    expect(component.users.length).toBe(0);
  });
});
