import { TestBed } from '@angular/core/testing';

import { LigneCommandeAchatService } from './ligne-commande.service';

describe('LigneCommandeService', () => {
  let service: LigneCommandeAchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigneCommandeAchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
