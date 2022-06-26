export const print = el => {
	var iframe = document.createElement("IFRAME");
	var doc = null;
	iframe.setAttribute(
		"style",
		"position:absolute;width:0px;height:0px;left:-500px;top:-500px;"
	);
	document.body.appendChild(iframe);
	doc = iframe.contentWindow.document;
	doc.write("<div>" + el + "</div>");
	doc.close();
	iframe.contentWindow.focus();
	iframe.contentWindow.print();
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		document.body.removeChild(iframe);
	}
};

export const printInNewTab = el => {
	var myWindow = window.open("", "newWindow");
	myWindow.document.write("<div>" + el + "</div>");
	myWindow.focus();
	myWindow.print();
	myWindow.close();
};

export const printTable = (heads = [], data = []) => {
	const head = heads.map(i => `<th>${i}</th>`).join("");
	const els = data
		.map((i, index) => {
			return (
				`<tr><td style="width:20px">${index + 1}</td>` +
				i.map(j => `<td>${j}</td>`).join("") +
				"</tr>"
			);
		})
		.join("");

	const dom = `
    <table border="1" cellspacing="0" style="word-break:break-all;text-align: center;">
    <tr>
    ${head}
    </tr>
    ${els}
  </table>
  `;
	print(dom);
};
