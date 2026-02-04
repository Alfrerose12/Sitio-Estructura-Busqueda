import { Routes } from '@angular/router';

import { Inicio } from './pages/inicio/inicio'
import { ElementosSitio } from './pages/elementos-sitio/elementos-sitio';
import { Menu } from './pages/menu/menu';
import { Breadcrumbs } from './pages/breadcrumbs/breadcrumbs';
import { MapaSitio } from './pages/mapa-sitio/mapa-sitio';
import { Error404 } from './pages/error-404/error-404';
import { Busqueda } from './pages/busqueda/busqueda';
import { Contacto } from './pages/contacto/contacto';


export const routes: Routes = [
    {
        path: '',
        component: Inicio,
        pathMatch: 'full'
    },
    {
        path: 'elementos',
        component: ElementosSitio
    },
    {
        path: 'menu',
        component: Menu
    },
    {
        path: 'breadcrumbs',
        component: Breadcrumbs
    },
    {
        path: 'mapa-sitio',
        component: MapaSitio
    },
    {
        path: 'busqueda',
        component: Busqueda
    },
    {
        path: 'contacto',
        component: Contacto
    },
    {
        path: '**',
        component: Error404
    }
];
