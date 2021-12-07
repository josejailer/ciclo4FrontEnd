import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { IUsuario } from 'src/app/Interfaces/IUsuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  usuarioAuth: IUsuario;
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.usuarioAuth = this.storageService.loadSessionData()
  }

  cerrarSesion() {
    this.storageService.logout();
  }
}
