import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegistroComponent } from './registro.component';
import { ActivatedRoute } from "@angular/router";
import { of } from 'rxjs';
import {LoginComponent} from "../login/login.component";

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {paramMap: {get: () => null}},
            queryParams: of({}),
            params: of({})
          }
        }
      ],
      imports: [RegistroComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
