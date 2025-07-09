import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MisArriendosComponent } from './mis-arriendos.component';

describe('MisArriendosComponent', () => {
  let component: MisArriendosComponent;
  let fixture: ComponentFixture<MisArriendosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisArriendosComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisArriendosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
