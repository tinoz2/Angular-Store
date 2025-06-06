# Pipes en Angular

Los **pipes** son una característica de Angular para **modificar o transformar datos directamente en el template HTML**, sin tener que procesarlos desde el componente.

# Pipes más usados

- `async`: Se suscribe automáticamente a un observable o promesa. También se desuscribe solo.
- `date`: Formatea fechas (`'shortDate'`, `'longDate'`, etc.).
- `currency`: Muestra valores como monedas. Ejemplo: `currency: 'ARS':'symbol':'1.2-2'`
- `percent`: Muestra un número como porcentaje.
- `json`: Convierte arrays u objetos en formato JSON legible. Útil para debug.

# Pipes personalizados

También podés crear los tuyos con: 
ng generate pipe nombre-del-pipe

# `.pipe`

El método `.pipe()` permite modificar o transformar datos antes de que te suscribas al observable.

Los operadores más usados son:

- **map**: Transforma cada valor emitido.
- **filter**: Filtra valores según una condición.
- **tap**: Ejecuta efectos secundarios sin modificar el flujo (por ejemplo, logs o alertas).
- **takeUntil**: Cancela la suscripción cuando otro observable emite; útil para limpieza.
- **switchMap**: Cambia un observable por otro; útil para llamadas encadenadas.

---

# Observable

Un **observable** es un flujo de datos asincrónico que se utiliza para manejar estados de manera reactiva, como peticiones, formularios, entre otros.

Un observable no emite valores hasta que es llamado con `.subscribe()`, `.pipe()` o con el pipe `async` en el HTML.

Además, suelen definirse con un signo `$` al final del nombre para indicar que son observables.


