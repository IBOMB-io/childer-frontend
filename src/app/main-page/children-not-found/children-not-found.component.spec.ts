import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenNotFoundComponent } from './children-not-found.component';

describe('ChildrenNotFoundComponent', () => {
  let component: ChildrenNotFoundComponent;
  let fixture: ComponentFixture<ChildrenNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildrenNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildrenNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
