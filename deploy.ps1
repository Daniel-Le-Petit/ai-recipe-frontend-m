# git.ps1
# .\deploy.ps1 "feat: depot actif"
# C:\Users\AIFinesHerbes\AIFB\frontend-m

$Env:PATH += ";C:\Program Files\Git\cmd"

$logFile = ".\git.log"
"=== Git script lancé à $(Get-Date) ===" | Out-File $logFile

try {
    "== Remote(s) ==" | Out-File $logFile -Append
    git remote -v | Out-File $logFile -Append

    "`n== Statut du dépôt ==" | Out-File $logFile -Append
    git status | Out-File $logFile -Append

    "`n== Passage à la branche main ==" | Out-File $logFile -Append
    git checkout main | Out-File $logFile -Append

    "`n== Pull des dernières modifs ==" | Out-File $logFile -Append
    git pull origin main | Out-File $logFile -Append

    "`n== Ajout des fichiers ==" | Out-File $logFile -Append
    git add . | Out-File $logFile -Append

    "`n== Commit avec message ==" | Out-File $logFile -Append
    git commit -m "feat: $args" | Out-File $logFile -Append

    "`n== Push vers GitHub ==" | Out-File $logFile -Append
    git push origin main | Out-File $logFile -Append

    "Script terminé avec succès." | Out-File $logFile -Append
}
catch {
    "Une erreur est survenue : $_" | Out-File $logFile -Append
}

Get-Content $logFile
