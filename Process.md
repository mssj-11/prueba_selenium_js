
## Rama de Desarrollo (develop)
`git checkout -b develop`


## Ramas de Características (feature/):
`git checkout -b feature/add-selenium-tests`

Agregar cambios y commits.
##### Fusionar la rama de características a develop
```sh
git checkout develop
git merge feature/add-selenium-tests
```


## Ramas de Release (release/):
`git checkout -b release/v1.0`

## Fusionar cambios a master cuando estés listo para producción:
```sh
git checkout master
git merge release/v1.0
```

``
``
``
