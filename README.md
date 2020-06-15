# Proyecto Ionic - Grupo Angular
 
 # Integrantes del equipo

- [x] [@Lleoz](https://discordapp.com/users/476574369229832203)
- [x] [@josue.samano](https://discordapp.com/users/335850826318741506)
- [x] [@Vladimir Cabrera](https://discordapp.com/users/683745689892815043)
- [x] [@Romer](https://discordapp.com/users/702955480267358329)
- [x] [@portusan](https://discordapp.com/users/717776768244908053)
- [x] [@RiojasMx](https://discordapp.com/users/201813752356536320)
- [x] [@programando.ideas](https://discordapp.com/users/716354253081542666)

## Instalar Ionic
1. Bajar Node.js desde https://nodejs.org/es/
2. Plataformas
    + Windows
        - `npm install -g @ionic/cli`
    + Mac
        - `sudo npm install -g @ionic/cli`
        - `sudo gem install cocoapods`
        
## Iniciar el proyecto
1. Comandos
    + `npm install`
    + `ionic build`
    + `npx cap init`
    + `npx cap sync`
2. Iniciar el proyecto (Debug Web)
    + `ionic serve`

## Comandos
- Pages:
`ionic g page pages/nombrePagina --spec=false`
- Components:
`ionic g c components/nombreComponente --spec=false`
- Models:
`ionic g class models/nombreClase --spec=false`
- Services:
`ionic g service services/nombreServicio --spec=false`

## Capacitor
- Ejecución
  + `ionic capacitor run android`
  + `ionic capacitor run ios`

- Debug
  + chrome://inspect
  
 ## Seguridad
- Android
  + Para debugear en el telefono, se debe abrir el archivo: `android\app\src\main\AndroidManifest.xml`
  + y agregar `android:usesCleartextTraffic="true"`

