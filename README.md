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

## Beispiel eines Workflows: Lokal und Remote
Ein typischer Workflow könnte folgendermaßen aussehen:
- Man erstellt lokal auf dem eigenen Computer ein Repository.
- Man bearbeitet Dateien lokal und speichert Änderungen mit Commits.
- Man überprüft den Status regelmäßig mit `git status`.
- Wenn man zufrieden ist, lädt man die Commits mit `git push` auf das Remote-Repository bei GitHub hoch.
- Wenn andere etwas hochgeladen haben, lädt man deren Änderungen mit `git pull` herunter, um auf dem neuesten Stand zu sein.
- Falls es Konflikte gibt, behebt man diese zuerst lokal, macht anschließend einen neuen Commit und lädt ihn wieder hoch.

## Tipps, was man in der Zusammenarbeit mit Git gelernt hat
- Am besten redet man im Team regelmäßig miteinander, damit solche Merge Konflikte gar nicht erst entstehen.
- Man sollte regelmäßig Commits erstellen, um den Fortschritt übersichtlich zu speichern.
- Man sollte klare und informative Commit-Nachrichten schreiben, damit man später leichter nachvollziehen kann, was geändert wurde.
- Man sollte Branches verwenden, um parallel an verschiedenen Funktionen oder Features arbeiten zu können, ohne andere zu stören.
- Regelmäßige Kommunikation mit Teammitgliedern ist wichtig, um Konflikte frühzeitig zu vermeiden.

## Weitere wichtige Git-Befehle (fortgeschritten)

### git rebase
Mit `git rebase` integriert man Änderungen eines Branches neu in einen anderen Branch. So bleibt die Projektgeschichte übersichtlicher und linear.

### git cherry-pick
Mit `git cherry-pick` übernimmt man einen bestimmten Commit aus einem anderen Branch und fügt ihn im aktuellen Branch ein. Es wird nur dieser eine Commit eingefügt, nicht der ganze Branch.

### .gitignore
Die Datei `.gitignore` legt fest, welche Dateien oder Ordner Git ignorieren soll. Diese Dateien werden dann nicht ins Repository übernommen.
