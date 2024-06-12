import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MiCuentaComponent } from './components/inicio/mi-cuenta/mi-cuenta.component';
import { SociosComponent } from './components/socios/socios.component';
import { CrearSocioComponent } from './components/socios/crear-socio/crear-socio.component';
import { VerEditarSocioComponent } from './components/socios/ver-editar-socio/ver-editar-socio.component';
import { TorneosComponent } from './components/torneos/torneos.component';
import { CrearTorneoComponent } from './components/torneos/crear-torneo/crear-torneo.component';
import { VerEditarTorneoComponent } from './components/torneos/ver-editar-torneo/ver-editar-torneo.component';
import { PremiosComponent } from './components/premios/premios.component';
import { CrearPremioComponent } from './components/premios/crear-premio/crear-premio.component';
import { EditarPremioComponent } from './components/premios/editar-premio/editar-premio.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { CrearPartidoComponent } from './components/partidos/crear-partido/crear-partido.component';
import { EditarPartidoComponent } from './components/partidos/editar-partido/editar-partido.component';
import { TorneosInicioComponent } from './components/torneos/torneos-inicio/torneos-inicio.component';
import { InstalacionesComponent } from './components/instalaciones/instalaciones.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ClubComponent } from './components/club/club.component';

const routes: Routes = [

  {path: '', component:InicioComponent},
  {path: 'login', component:LoginComponent},
  {path: 'login/:seccion', component:LoginComponent},
  {path: 'inicio', component:MiCuentaComponent},
  {path: 'inicio/socios', component:SociosComponent},
  {path: 'crear-socio', component:CrearSocioComponent},
  {path: 'ver-editar-socio/:id', component:VerEditarSocioComponent},
  {path: 'inicio/torneos', component:TorneosComponent},
  {path: 'crear-torneo', component:CrearTorneoComponent},
  {path: 'ver-editar-torneo/:id', component:VerEditarTorneoComponent},
  {path: 'inicio/premios', component:PremiosComponent},
  {path: 'crear-premio', component:CrearPremioComponent},
  {path: 'editar-premio/:id', component:EditarPremioComponent},
  {path: 'inicio/mi-perfil', component:MiPerfilComponent},
  {path: 'inicio/partidos', component:PartidosComponent},
  {path: 'crear-partido/:fecha/:hora/:pista', component:CrearPartidoComponent},
  {path: 'editar-partido/:id/:edit', component:EditarPartidoComponent},
  {path: 'torneos', component:TorneosInicioComponent},
  {path: 'club', component:ClubComponent},
  {path: 'instalaciones', component:InstalacionesComponent},
  {path: 'contacto', component:ContactoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
