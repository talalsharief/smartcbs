import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CpAddMeterReadingComponent } from './cp-add-meter-reading.component';

describe('CpAddMeterReadingComponent', () => {
  let component: CpAddMeterReadingComponent;
  let fixture: ComponentFixture<CpAddMeterReadingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CpAddMeterReadingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CpAddMeterReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
