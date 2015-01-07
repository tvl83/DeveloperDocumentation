var currentLanguage = "objc";
var currentDocument = "ide";

function setCurrentLanguage(_language) {
  currentLanguage = _language;
  updateContent();
}

function setCurrentDocument(_currentDocument) {
  currentDocument = _currentDocument;

  updateContent();
}

function updateContent() {
  $('#content').load('/getting-started/getting-started-' + currentDocument + '-' + currentLanguage + '/index.html');
}