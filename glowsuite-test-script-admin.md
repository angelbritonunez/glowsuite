# GlowSuite — Guía de Pruebas: Admin (Owner)

Marca cada punto con ✅ si funciona bien, o anota qué pasó si algo falla.

> Este script es exclusivo para el rol **admin** (owner del sistema).

---

## Antes de empezar

- [ ] La aplicación está abierta en el navegador
- [ ] Estás logueada con tu cuenta de administrador
- [ ] Tienes acceso a `/admin`

---

## 1. Acceso al panel

- [ ] La ruta `/admin` carga sin errores
- [ ] Una consultora que intenta entrar a `/admin` es redirigida (no tiene acceso)
- [ ] Un operador que intenta entrar a `/admin` es redirigido (no tiene acceso)

---

## 2. Vista general de consultoras

- [ ] Aparecen los KPIs: total consultoras, activas, inactivas
- [ ] La tabla muestra todas las consultoras con: nombre, email, estado, rol, días restantes de membresía, última sesión
- [ ] Las consultoras inactivas se ven diferenciadas visualmente de las activas
- [ ] Las consultoras con membresía vencida aparecen como inactivas automáticamente

---

## 3. Gestión de usuarios

### Crear consultora
- [ ] El botón "Crear consultora" abre el formulario con campos: nombre, email, teléfono, rol
- [ ] Puedes crear usuarios con rol: consultora, operador
- [ ] Al crear, el sistema genera una contraseña temporal visible en la respuesta
- [ ] La nueva consultora aparece en la tabla

### Activar / Desactivar
- [ ] El toggle activo/inactivo cambia el estado de la consultora correctamente
- [ ] Al activar una consultora, el contador de días restantes se reinicia a 30
- [ ] Al desactivar, la consultora no puede iniciar sesión

### Resetear contraseña
- [ ] El botón "Resetear contraseña" genera una nueva contraseña temporal
- [ ] La contraseña temporal se muestra para poder enviársela a la consultora

### Eliminar usuario
- [ ] El botón "Eliminar" aparece para consultoras y operadores
- [ ] El botón "Eliminar" **no aparece** para otros admins
- [ ] Al eliminar, el usuario desaparece de la tabla
- [ ] No puedes eliminarte a ti mismo → muestra error

---

## 4. Restricciones del rol admin

- [ ] Puedes ver y gestionar todos los roles: consultora, operador
- [ ] No puedes eliminar otro admin
- [ ] No puedes eliminarte a ti mismo

---

**Si algo no funciona como se describe, anota en qué paso pasó y qué mensaje apareció.**
