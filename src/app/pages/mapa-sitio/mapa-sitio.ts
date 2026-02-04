import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface SiteNode {
  id: string;
  label: string;
  path: string;
  x: number;
  y: number;
  level: number;
}

@Component({
  selector: 'app-mapa-sitio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa-sitio.html',
  styleUrl: './mapa-sitio.css',
})
export class MapaSitio implements AfterViewInit {
  
  // 1. OBTENEMOS ACCESO AL CONTENEDOR DEL HTML
  // Esto busca la etiqueta que tenga #scrollContainer en tu HTML
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  // Configuración del canvas SVG (Coordenadas internas)
  svgWidth = 1000;
  svgHeight = 600;
  
  // Nodo Raíz (Inicio) - Centrado en X=500
  root: SiteNode = { id: 'root', label: 'INICIO', path: '/', x: 500, y: 50, level: 1 };

  // Nodos Hijos (Nivel 2) - Distribuidos
  children: SiteNode[] = [
    { id: 'n1', label: 'BREADCRUMBS', path: '/breadcrumbs', x: 200, y: 350, level: 2 },
    { id: 'n2', label: 'ELEMENTOS', path: '/elementos', x: 400, y: 350, level: 2 },
    { id: 'n3', label: 'MENÚ', path: '/menu', x: 600, y: 350, level: 2 },
    { id: 'n4', label: 'BÚSQUEDA', path: '/busqueda', x: 800, y: 350, level: 2 },
  ];

  constructor(private router: Router) {}

  // 2. LIFECYCLE HOOK: Se ejecuta cuando la vista ya cargó
  ngAfterViewInit() {
    // Damos un pequeño respiro (100ms) para asegurar que el HTML se pintó
    // y el navegador ya calculó los anchos reales.
    setTimeout(() => {
      this.centrarMapa();
    }, 100);
  }

  // 3. LÓGICA DE CENTRADO AUTOMÁTICO
  centrarMapa() {
    if (!this.scrollContainer) return;

    const container = this.scrollContainer.nativeElement;
    
    // FÓRMULA MÁGICA:
    // (AnchoTotalDelContenido - AnchoDeLaPantalla) / 2
    // Esto nos da la posición exacta para dejar el scroll en el medio.
    const scrollX = (container.scrollWidth - container.clientWidth) / 2;
    
    // Ejecutamos el scroll suave
    if (scrollX > 0) {
      container.scrollTo({ left: scrollX, behavior: 'smooth' });
    }
  }

  // Generar path curvo (Bézier) desde parent hasta child
  getLinkPath(child: SiteNode): string {
    const parent = this.root;
    // Puntos de control para la curva suave
    const cp1x = parent.x;
    const cp1y = (parent.y + child.y) / 2;
    const cp2x = child.x;
    const cp2y = (parent.y + child.y) / 2;

    return `M ${parent.x} ${parent.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${child.x} ${child.y}`;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}