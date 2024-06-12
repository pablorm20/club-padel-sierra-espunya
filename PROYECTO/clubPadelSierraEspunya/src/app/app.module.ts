import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './components/inicio/inicio.component';
import { MiCuentaComponent } from './components/inicio/mi-cuenta/mi-cuenta.component';
import { SociosComponent } from './components/socios/socios.component';
import { MenuInicioUsuarioComponent } from './components/menu-inicio-usuario/menu-inicio-usuario.component';
import { CrearSocioComponent } from './components/socios/crear-socio/crear-socio.component';
import { VerEditarSocioComponent } from './components/socios/ver-editar-socio/ver-editar-socio.component';
import { TorneosComponent } from './components/torneos/torneos.component';
import { CrearTorneoComponent } from './components/torneos/crear-torneo/crear-torneo.component';
import { VerEditarTorneoComponent } from './components/torneos/ver-editar-torneo/ver-editar-torneo.component';
import { CrearPremioComponent } from './components/premios/crear-premio/crear-premio.component';
import { EditarPremioComponent } from './components/premios/editar-premio/editar-premio.component';
import { PremiosComponent } from './components/premios/premios.component';
import { DialogApuntarseComponent } from './components/dialog/dialog-apuntarse/dialog-apuntarse.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DialogVerComponent } from './components/dialog/dialog-ver/dialog-ver.component';
import { DialogCerrarTorneoComponent } from './components/dialog/dialog-cerrar-torneo/dialog-cerrar-torneo.component';
import { DialogHistoricoPremiosComponent } from './components/dialog/dialog-historico-premios/dialog-historico-premios.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { CrearPartidoComponent } from './components/partidos/crear-partido/crear-partido.component';
import { EditarPartidoComponent } from './components/partidos/editar-partido/editar-partido.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FooterComponent } from './components/footer/footer.component';
import { TorneosInicioComponent } from './components/torneos/torneos-inicio/torneos-inicio.component';
import { MenuInicioComponent } from './components/menu-inicio/menu-inicio.component';
import { ClubComponent } from './components/club/club.component';
import { InstalacionesComponent } from './components/instalaciones/instalaciones.component';
import { ContactoComponent } from './components/contacto/contacto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    MiCuentaComponent,
    SociosComponent,
    MenuInicioUsuarioComponent,
    CrearSocioComponent,
    VerEditarSocioComponent,
    TorneosComponent,
    CrearTorneoComponent,
    VerEditarTorneoComponent,
    CrearPremioComponent,
    EditarPremioComponent,
    PremiosComponent,
    DialogApuntarseComponent,
    DialogVerComponent,
    DialogCerrarTorneoComponent,
    DialogHistoricoPremiosComponent,
    MiPerfilComponent,
    PartidosComponent,
    CrearPartidoComponent,
    EditarPartidoComponent,
    FooterComponent,
    TorneosInicioComponent,
    MenuInicioComponent,
    ClubComponent,
    InstalacionesComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatAutocompleteModule,
    NgxPaginationModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
