import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaSitio } from './mapa-sitio';

describe('MapaSitio', () => {
  let component: MapaSitio;
  let fixture: ComponentFixture<MapaSitio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaSitio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaSitio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
