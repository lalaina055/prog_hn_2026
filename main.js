// cette fonction s'exécute automatiquement quand la page est complètement chargée
window.onload = function() {
    // bouton pour choisir un fichier
    let fileInput = document.getElementById('fileInput');
    // la zone où le texte du fichier va s'afficher
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    
    fileInput.addEventListener('change', function(e) {
        // récupère le fichier choisi
        let file = fileInput.files[0];
        // vérifie que c'est bien un fichier texte
        let textType = new RegExp("text.*");

        // si c'est un fichier texte
        if (file.type.match(textType)) {
            // je crée un lecteur de fichier
            var reader = new FileReader();

            // quand le fichier est lu, j'affiche son contenu
            reader.onload = function(e) {
                // j'affiche le texte dans la zone de gauche
                fileDisplayArea.innerText = reader.result;
                
                // lance la segmentation (découpage en mots et en lignes)
                segText();
                
                // récupère le nombre de mots et le nombre de lignes
                var nbTokens = global_var_tokens.length;
                var nbLines = global_var_lines.length;
                
                // j'affiche un message de succès avec les compteurs
                if (nbTokens > 0) {
                    document.getElementById("logger3").innerHTML = '<span class="infolog">Fichier chargé avec succès - ' + nbTokens + ' tokens, ' + nbLines + ' lignes trouvés</span>';
                } else {
                    document.getElementById("logger3").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
                }
            }

            //lis le fichier
            reader.readAsText(file);    
        } else {
            // si ce n'est pas un fichier texte, j'affiche une erreur
            fileDisplayArea.innerText = "";
            document.getElementById("logger3").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}