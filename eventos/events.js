document.addEventListener('DOMContentLoaded', (event) => {
    const output = document.getElementById('output');
  
    function logEvent(event) {
      output.textContent += `${event.type} event fired on ${event.target.tagName}\n`;
    }
  
    // Eventos de Mouse
    const mouseButton = document.getElementById('mouseButton');
    mouseButton.addEventListener('click', logEvent);
    mouseButton.addEventListener('dblclick', logEvent);
    const mouseArea = document.getElementById('mouseArea');
    mouseArea.addEventListener('mouseover', logEvent);
    mouseArea.addEventListener('mouseout', logEvent);
    mouseArea.addEventListener('mousedown', logEvent);
    mouseArea.addEventListener('mouseup', logEvent);
    mouseArea.addEventListener('mousemove', logEvent);
  
    // Eventos de Teclado
    const textInput = document.getElementById('textInput');
    textInput.addEventListener('keydown', logEvent);
    textInput.addEventListener('keyup', logEvent);
    textInput.addEventListener('keypress', logEvent);
  
    // Eventos de Formulario
    const form = document.getElementById('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Previene el envío del formulario para propósitos de demostración
      logEvent(event);
    });
    form.addEventListener('change', logEvent);
    form.addEventListener('focus', logEvent, true);  // true usa la fase de captura
    form.addEventListener('blur', logEvent, true);
  
    // Eventos de Documento/Window
    window.addEventListener('resize', logEvent);
    window.addEventListener('scroll', logEvent);
  
    // Botones para cambiar tamaño y desplazar
    const resizeButton = document.getElementById('resizeButton');
    resizeButton.addEventListener('click', () => {
      window.resizeTo(800, 600);
      logEvent(new Event('resize'));
    });
  
    const scrollButton = document.getElementById('scrollButton');
    scrollButton.addEventListener('click', () => {
      window.scrollTo(0, document.body.scrollHeight);
      logEvent(new Event('scroll'));
    });
  });
  