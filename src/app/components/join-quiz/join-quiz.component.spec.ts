import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {JoinQuizComponent} from './join-quiz.component';


describe('JoinformComponent', () => {
  let component: JoinQuizComponent;
  let fixture: ComponentFixture<JoinQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinQuizComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
