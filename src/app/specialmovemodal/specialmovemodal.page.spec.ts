import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpecialmovemodalPage } from './specialmovemodal.page';

describe('SpecialmovemodalPage', () => {
  let component: SpecialmovemodalPage;
  let fixture: ComponentFixture<SpecialmovemodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialmovemodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialmovemodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
