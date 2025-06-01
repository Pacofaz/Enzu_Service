# Enzu_Service
### git push
Mit `git push` schickt man Änderungen vom lokalen Repository zu GitHub.
```
git push origin main
```
`origin` ist der Standardname des Remote-Repositories.

### git pull
Mit `git pull` holt man sich die neuesten Änderungen von GitHub.
```
git pull origin main
```

### git clone
Mit `git clone` kopiert man ein Projekt von GitHub auf den eigenen Rechner.
```
git clone https://github.com/benutzername/projektname.git
```

### git branch
Mit `git branch` erstellt man neue Zweige (Branches).
```
git branch neuerZweig
```
- Alle Branches anzeigen:
  ```
  git branch
  ```

### git checkout
Mit `git checkout` wechselt man zwischen Zweigen oder Versionen.
```
git checkout neuerZweig
```
- Neuen Branch erstellen und direkt wechseln:
  ```
  git checkout -b neuerZweig
  ```

### git merge
Mit `git merge` verbindet man Änderungen aus einem Branch mit einem anderen.
```
git merge neuerZweig
```

### git reset
Mit `git reset` setzt man Änderungen zurück oder löscht sie komplett.
- Änderungen zurücksetzen, aber behalten:
  ```
  git reset --soft HEAD~1
  ```
- Änderungen komplett löschen:
  ```
  git reset --hard HEAD~1
  ```
