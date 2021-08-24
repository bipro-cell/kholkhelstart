import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostdetailsPage } from './post-details.page';

describe('PostdetailsPage', () => {
  let component: PostdetailsPage;
  let fixture: ComponentFixture<PostdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostdetailsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
