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

### git revert
Mit `git revert` macht man einen vorherigen Commit rückgängig (erstellt einen neuen Commit, der diese Änderung zurücknimmt).
```
git revert <Commit-ID>
```

## Merge-Konflikte – Was tun?
Ein Merge-Konflikt passiert, wenn zwei Personen gleichzeitig an derselben Stelle in einer Datei etwas ändern und diese Änderungen zusammengeführt werden sollen. Dann weiß Git nicht, welche Änderung übernommen werden soll.

**Wie merkt man, dass es einen Merge-Konflikt gibt?**
- Wenn man z.B. mit `git merge` oder `git pull` arbeitet, meldet Git einen Konflikt und bricht das Zusammenführen ab.
- In der betroffenen Datei tauchen Markierungen wie `<<<<<<<`, `=======` und `>>>>>>>` auf. Damit zeigt Git die verschiedenen Versionen an.
