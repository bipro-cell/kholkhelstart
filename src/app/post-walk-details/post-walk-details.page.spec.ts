import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostwalkdetailsPage } from './post-walk-details.page';

describe('PostwalkdetailsPage', () => {
  let component: PostwalkdetailsPage;
  let fixture: ComponentFixture<PostwalkdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostwalkdetailsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostwalkdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
