import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivityGraphComponent } from './user-activity-graph.component';

describe('UserActivityGraphComponent', () => {
  let component: UserActivityGraphComponent;
  let fixture: ComponentFixture<UserActivityGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserActivityGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserActivityGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
