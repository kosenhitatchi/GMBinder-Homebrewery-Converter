javascript:(function(){
if(location.href=='https://homebrewery.naturalcrit.com/new'){
	const inputText = prompt('Enter source text:');
	  const replacementList = [
		  {term: "\\\\pagebreaknum[ \\t]*", text: "{{pageNumber,auto}}\n\\page"},
		  {term: "@=====", text:"{{pageNumber,auto}}\n\\page"},
		  {term: "\\\\pagebreak[ \\t]*", text: "\\page"},
		  {term: "======", text: "\\page"},
		  {term: "\\\\columnbreak[ \\t]*", text: "\\column"},
		  {term: "(?:\\n)(>[\\s\\S]*?)(?:\\n[^>])", text: "{{note\n$1\n}}\n", flags: "gi"},
		  {term: "(___[\\r\\n]+{{note)", text: "{{monster,frame", flags: "gi"},
		  {term: "(___[\\r\\n]+{{monster,frame)", text: "{{monster,frame,wide", flags: "gi"},
		  {term: "^>\\s*?-\\s*", text: ""},
		  {term: "^(>\\s*)", text: ""},
		  {term: "^(\\*\\*.+\\*\\*)(.*)", text: "$1 :: $2"},
		  {term: ".phb", text: ".page"},
		  {	term: "<div\\s+class=['\"][^'\"]*\\bclassTable\\b[^'\"]*\\bwide\\b[^'\"]*['\"]>([\\s\\S]*?)<\\/div>",
			text: "{{classTable,frame,decoration,wide\n$1\n}}"
			},
		  {term: "<div\\s+class=['\"]wide['\"]>([\\s\\S]*?)<\\/div>",text: "{{wide\n$1\n}}"},
		  {
			term: "<div\\s+class=['\"]footnote['\"]>([\\s\\S]*?)<\\/div>", 
			text: "{{footnote\n$1\n}}"
		},
		  {term: "<div\\s+class=['\"]partpage['\"]>\\s*#\\s*Part\\s+([^\\r\\n]+)\\s*[\\r\\n]+#####\\s*([^\\r\\n]+)\\s*<\\/div>", text: "{{partCover}}\n\n# PART $1\n## $2"},
		  
	  ];
	  var outputText = '\n' + inputText + '\n\n';
	  for (const replacement of replacementList){
		  outputText = outputText.replace(new RegExp(replacement.term, replacement.flags || 'gim'), replacement.text);
	  }
	  localStorage.setItem('homebrewery-new', outputText);
	  localStorage.setItem('homebrewery-new-style', '.page {\n  font-size: 0.317cm;\n  padding: 1cm 1.7cm 1.5cm;\n}');
	  localStorage.setItem('homebrewery-new-style', '.page .note  {\n  border-width: 11px;;\n}');
	  localStorage.setItem('homebrewery-new-meta','{"renderer":"V3"}');
	  location.reload();
	  };
})();
