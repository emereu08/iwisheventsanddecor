# Iwisheventanddecor - Landing Page Multiidioma

Una landing page moderna y responsive para servicios de alquiler de menaje y productos para eventos, disponible en español e inglés.

## 🌐 Versiones de Idioma

### Español
- **Archivo:** `index.html`
- **URL:** Página principal en español
- **Idioma:** `lang="es"`

### English
- **Archivo:** `index-en.html` 
- **URL:** English version
- **Idioma:** `lang="en"`

## 🚀 Características

### ✨ Diseño Moderno
- **Responsive Design:** Adaptable a móviles, tablets y desktop
- **Animaciones:** Efectos suaves y transiciones elegantes
- **Tipografía:** Google Fonts (Poppins) para una apariencia profesional
- **Iconos:** Font Awesome para iconografía consistente

### 🎨 Paleta de Colores
- **Primario:** Dorado (`#d4af37`) - Elegancia y premium
- **Secundario:** Azul marino (`#2c3e50`) - Confianza y profesionalismo
- **Acento:** Rojo (`#e74c3c`) - Llamadas a la acción
- **Neutros:** Grises y blancos para contenido

### 📱 Secciones Incluidas

1. **Header Fijo**
   - Navegación smooth scroll
   - Menú hamburger para móviles
   - Selector de idioma en esquina superior derecha

2. **Hero Section**
   - Título impactante con call-to-action
   - Botones principales: "Ver Catálogo" y "Cotizar Evento"
   - Imagen destacada del producto

3. **Servicios**
   - 4 servicios principales con iconos
   - Menaje completo, mobiliario, entrega, asesoría

4. **Productos**
   - Galería filtrable por categorías
   - Categorías: Todos, Vajilla, Cristalería, Mobiliario, Decoración
   - Imágenes optimizadas con hover effects

5. **Testimonios**
   - 3 testimonios de clientes reales
   - Diseño en cards con información del cliente

6. **Contacto**
   - Información de contacto completa
   - Formulario funcional con validación
   - Campos: Nombre, email, teléfono, tipo de evento, mensaje

7. **Footer**
   - Enlaces organizados por secciones
   - Redes sociales
   - Información de copyright

### 🛠️ Funcionalidades JavaScript

#### Navegación
- Menú hamburger responsive
- Smooth scroll entre secciones
- Header con cambio de fondo al hacer scroll

#### Filtrado de Productos
- Filtros dinámicos por categoría
- Animaciones de aparición/desaparición
- Botones de filtro con estados activos

#### Formulario de Contacto
- Validación completa de campos
- Mensaje de confirmación de envío
- Prevención de spam básica

#### Efectos Visuales
- Animaciones al hacer scroll
- Efectos parallax
- Hover effects en cards y botones

### 📂 Estructura de Archivos

```
webprototype1/
├── index.html          # Versión en español
├── index-en.html       # Versión en inglés
├── styles.css          # Estilos compartidos
├── script.js           # JavaScript compartido
├── README.md           # Esta documentación
└── img/               # Imágenes
    ├── logo1.jpeg     # Logo principal
    ├── logo2.jpg      # Logo alternativo
    └── prod1-20.jpg   # Imágenes de productos
```

## 🎯 Cambio de Idioma

### Selector Automático
- Botones fijos en esquina superior derecha
- Estado activo visual según página actual
- Enlaces directos entre versiones

### Implementación
```html
<!-- En ambas páginas -->
<div class="language-switcher">
    <a href="index.html" class="lang-btn">ES</a>
    <a href="index-en.html" class="lang-btn">EN</a>
</div>
```

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `styles.css`:
```css
:root {
    --primary-color: #d4af37;     /* Color principal */
    --secondary-color: #2c3e50;   /* Color secundario */
    --accent-color: #e74c3c;      /* Color de acento */
}
```

### Agregar Más Idiomas
1. Duplica `index-en.html`
2. Traduce el contenido
3. Actualiza el `lang` attribute
4. Agrega botón en `.language-switcher`

### Modificar Productos
1. Agrega imágenes a la carpeta `img/`
2. Actualiza el HTML en ambas versiones
3. Mantén las categorías `data-category` consistentes

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px  
- **Desktop:** > 1024px

## 🚀 Despliegue

### Hosting Estático
- Sube todos los archivos al servidor
- Asegúrate de mantener la estructura de carpetas
- La página principal debe ser `index.html`

### Dominios
- **Español:** `tudominio.com` → `index.html`
- **Inglés:** `tudominio.com/en` → `index-en.html`

## 🔧 Optimizaciones Implementadas

### Performance
- ✅ Imágenes optimizadas
- ✅ CSS minificado
- ✅ JavaScript eficiente
- ✅ Carga lazy de elementos no críticos

### SEO
- ✅ Meta tags apropiados
- ✅ Estructura semántica HTML5
- ✅ Alt text en imágenes
- ✅ URLs limpias

### Accesibilidad
- ✅ Contraste de colores adecuado
- ✅ Navegación por teclado
- ✅ Etiquetas ARIA donde corresponde
- ✅ Texto alternativo en imágenes

## 📞 Soporte

Para modificaciones o consultas sobre el código, revisa:
- Comentarios en los archivos CSS y JavaScript
- Estructura HTML semántica
- Variables CSS para fácil personalización

---

**Creado con ❤️ para Iwisheventanddecor - I wish events and decor**
