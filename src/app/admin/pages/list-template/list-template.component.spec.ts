import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTemplateComponent } from './list-template.component';

describe('ListProjectComponent', () => {
  let component: ListTemplateComponent;
  let fixture: ComponentFixture<ListTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
