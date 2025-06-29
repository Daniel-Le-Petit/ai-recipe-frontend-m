# deploy.ps1
$logFile = ".\git.log"

# Démarre un nouveau fichier de log
"=== Git script lancé à $(Get-Date) ===`n" | Out-File $logFile

try {
    "== Remote(s) ==" | Out-File $logFile -Append
    git remote -v | Out-File $logFile -Append

    "`n== Statut du dépôt ==" | Out-File $logFile -Append
    git status | Out-File $logFile -Append

    "`n== Passage à la branche main ==" | Out-File $logFile -Append
    git checkout main | Out-File $logFile -Append

    "`n== Pull des dernières modifications ==" | Out-File $logFile -Append
    git pull origin main | Out-File $logFile -Append

    "`n== Ajout des fichiers modifiés ==" | Out-File $logFile -Append
    git add . | Out-File $logFile -Append

    "`n== Commit avec message : feat: $args ==" | Out-File $logFile -Append
    git commit -m "feat: $args" | Out-File $logFile -Append

    "`n== Push vers la branche main ==" | Out-File $logFile -Append
    git push origin main | Out-File $logFi
