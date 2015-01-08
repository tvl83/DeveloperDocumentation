var currentLanguage = "objc";
var currentDocument = "ide";

var hasUpdatedContent = false;

function setCurrentLanguage(_language) {
  currentLanguage = _language;
  updateContent();
}

function setCurrentDocument(_currentDocument) {
  currentDocument = _currentDocument;

  updateContent();
}

function updateContent() {
	if (!hasUpdatedContent) {
		var documentLink = document.getElementById("default_document");
		documentLink.className = documentLink.className + " active";

		var languageLink = document.getElementById("default_language");
		languageLink.className = languageLink.className + " active";
		hasUpdatedContent = true;
	}

	$('#content').load('/getting-started/getting-started-' + currentDocument + '-' + currentLanguage + '/index.html');
}