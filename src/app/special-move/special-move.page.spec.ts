import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpecialMovePage } from './special-move.page';

describe('SpecialMovePage', () => {
  let component: SpecialMovePage;
  let fixture: ComponentFixture<SpecialMovePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialMovePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialMovePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
