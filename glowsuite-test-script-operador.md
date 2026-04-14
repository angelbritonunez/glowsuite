# GlowSuite — Guía de Pruebas: Operador

Marca cada punto con ✅ si funciona bien, o anota qué pasó si algo falla.

> Este script es exclusivo para el rol **operador**.

---

## Antes de empezar

- [ ] La aplicación está abierta en el navegador
- [ ] Estás logueada con tu cuenta de operador

---

## 1. Acceso y restricciones

- [ ] Puedes iniciar sesión correctamente
- [ ] Tienes acceso a las secciones de consultoras: Dashboard, Clientes, Ventas, Seguimientos, Métricas
- [ ] Intentar entrar a `/admin` redirige o muestra error de acceso denegado

---

## 2. Gestión de consultoras (/admin/users)

> El operador puede ver y gestionar consultoras, pero con permisos limitados frente al admin.

- [ ] Puedes acceder al panel de usuarios
- [ ] Solo ves consultoras en la tabla (no otros operadores ni admins)
- [ ] Aparecen los datos de cada consultora: nombre, email, estado, días de membresía, última sesión

### Crear consultora
- [ ] Puedes crear nuevas consultoras
- [ ] El formulario solo permite asignar el rol "consultora" (no operador ni admin)
- [ ] Al crear, el sistema genera una contraseña temporal

### Activar / Desactivar
- [ ] Puedes activar o desactivar consultoras con el toggle
- [ ] Al activar, el contador de días se reinicia a 30

### Resetear contraseña
- [ ] Puedes resetear la contraseña de una consultora
- [ ] Se muestra la nueva contraseña temporal

### Restricciones
- [ ] No aparece el botón "Eliminar" para ningún usuario
- [ ] No puedes crear usuarios con rol operador o admin

---

**Si algo no funciona como se describe, anota en qué paso pasó y qué mensaje apareció.**
