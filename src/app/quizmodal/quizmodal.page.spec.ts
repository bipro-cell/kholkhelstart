import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizmodalPage } from './quizmodal.page';

describe('QuizmodalPage', () => {
  let component: QuizmodalPage;
  let fixture: ComponentFixture<QuizmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizmodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
