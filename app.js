handleFiles = (files) => {
  console.log(files[0]);  
  Object.keys(files).forEach((item, index) => {
    const file = files[index];
    const reader = new FileReader();
    reader.onload = () => {
      const fileResult = reader.result;
      crypto.subtle.digest('SHA-256', fileResult).then((hash) => {
        var sha256result = hex(hash);
		
		var alex = document.getElementById("alex");
		
		src3D = 'https://nmsr.nickac.dev/fullbody/' + sha256result;
		src2D = 'https://nmsr.nickac.dev/frontfull/' + sha256result;
		
		if (alex.checked == true){
			src3D += '?alex';
			src2D += '?alex';
		}
		
		img3D = document.createElement('img');
		img3D.src = src3D;
        document.body.appendChild(img3D);
		
		img2D = document.createElement('img');
		img2D.src = src2D;
        document.body.appendChild(img2D);
		
      });
    };
    reader.readAsArrayBuffer(file);
  });
  
}
  
function hex(buffer) {
  var hexCodes = [];
  var view = new DataView(buffer);
  for (var i = 0; i < view.byteLength; i += 4) {
    var value = view.getUint32(i)
    var stringValue = value.toString(16)
    var padding = '00000000'
    var paddedValue = (padding + stringValue).slice(-padding.length)
    hexCodes.push(paddedValue);
  }

  return hexCodes.join("");
}