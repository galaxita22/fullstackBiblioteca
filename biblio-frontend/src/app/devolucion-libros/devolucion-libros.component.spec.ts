import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DevolucionLibrosComponent } from './devolucion-libros.component';

describe('DevolucionLibrosComponent', () => {
  let component: DevolucionLibrosComponent;
  let fixture: ComponentFixture<DevolucionLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolucionLibrosComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevolucionLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
