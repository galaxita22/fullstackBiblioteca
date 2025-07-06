import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionLibrosComponent } from './devolucion-libros.component';

describe('DevolucionLibrosComponent', () => {
  let component: DevolucionLibrosComponent;
  let fixture: ComponentFixture<DevolucionLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolucionLibrosComponent]
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
