document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('video');
    const contenidoDiv = document.getElementById('contenido');
  
    // Verificar si el navegador admite getUserMedia
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
  
    if (navigator.getUserMedia) {
      // Obtener acceso a la cámara del dispositivo
      navigator.getUserMedia(
        { video: { facingMode: 'environment' } },
        function (stream) {
          video.srcObject = stream;
          video.play();
          // Llamar a la función para procesar el video y buscar códigos QR
          findQRCode();
        },
        function (error) {
          console.error('Error al acceder a la cámara:', error);
        }
      );
    } else {
      console.error('getUserMedia no es compatible en este navegador.');
    }
  
    // Función para buscar códigos QR en el video
    function findQRCode() {
      const canvasElement = document.createElement('canvas');
      const canvas = canvasElement.getContext('2d');
  
      canvasElement.width = video.videoWidth;
      canvasElement.height = video.videoHeight;
  
      setInterval(function () {
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        });
  
        if (code) {
          // Una vez que se detecta un código QR, code.data contiene la información del JSON
          const jsonData = JSON.parse(code.data);
          // Llamar a una función para mostrar el contenido en el DOM
          mostrarContenido(jsonData);
        }
      }, 1000 / 15);
    }
  
    // Función para mostrar el contenido en el DOM
    function mostrarContenido(data) {
      // Mostrar el contenido del JSON en el elemento con el id 'contenido'
      contenidoDiv.textContent = JSON.stringify(data);
    }
  });
  





















// document.addEventListener('DOMContentLoaded', function () {
//     const video = document.getElementById('video');
//     const resultDiv = document.getElementById('result');
  
//     // Verificar si el navegador admite getUserMedia
//     navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
  
//     if (navigator.getUserMedia) {
//       // Obtener acceso a la cámara del dispositivo
//       navigator.getUserMedia(
//         { video: { facingMode: 'environment' } },
//         function (stream) {
//           video.srcObject = stream;
//           video.play();
//           // Llamar a la función para procesar el video y buscar códigos QR
//           findQRCode();
//         },
//         function (error) {
//           console.error('Error al acceder a la cámara:', error);
//         }
//       );
//     } else {
//       console.error('getUserMedia no es compatible en este navegador.');
//     }
  
//     // Función para buscar códigos QR en el video
//     function findQRCode() {
//       const canvasElement = document.createElement('canvas');
//       const canvas = canvasElement.getContext('2d');
  
//       canvasElement.width = video.videoWidth;
//       canvasElement.height = video.videoHeight;
  
//       setInterval(function () {
//         canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
//         const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
//         const code = jsQR(imageData.data, imageData.width, imageData.height, {
//           inversionAttempts: 'dontInvert'
//         });
  
//         if (code) {
//           resultDiv.innerText = 'Código QR detectado: ' + code.data;
//         }
//       }, 1000 / 15);
//     }
//   });
  