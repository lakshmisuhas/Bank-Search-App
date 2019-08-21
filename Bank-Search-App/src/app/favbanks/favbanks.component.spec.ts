import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavbanksComponent } from './favbanks.component';

describe('FavbanksComponent', () => {
  let component: FavbanksComponent;
  let fixture: ComponentFixture<FavbanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavbanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavbanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
