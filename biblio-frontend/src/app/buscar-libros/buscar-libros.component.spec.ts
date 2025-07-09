import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BuscarLibrosComponent } from './buscar-libros.component';

describe('BuscarLibrosComponent', () => {
  let component: BuscarLibrosComponent;
  let fixture: ComponentFixture<BuscarLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarLibrosComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
