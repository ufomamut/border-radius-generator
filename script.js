'use strict';

/* ==================================================
   DOM REFERENCES
   ==================================================
   Centralized access to all required DOM elements.
*/
const el = {
    rectangle: document.querySelector('.rectangle'),
    cssOutput: document.getElementById('cssOutput'),
    resetButton: document.getElementById('resetBtn'),
    copyButton: document.getElementById('copyBtn'),
    inputs: {
        lt: document.getElementById('lt'),
        rt: document.getElementById('rt'),
        rb: document.getElementById('rb'),
        lb: document.getElementById('lb')
    },
    labels: {
        lt: document.getElementById('lt-value'),
        rt: document.getElementById('rt-value'),
        rb: document.getElementById('rb-value'),
        lb: document.getElementById('lb-value')
    }
};




/* ==================================================
   HELPERS
   ==================================================
   Converts a numeric value to a px string.
*/
const toPx = val => `${val}px`;




/* ==================================================
   CORE LOGIC
   ==================================================
   Updates:
   - rectangle border-radius
   - CSS output text
   - slider value labels
*/
function updateCSS() {
    const { lt, rt, rb, lb } = el.inputs;
    const values = [lt.value, rt.value, rb.value, lb.value];

    // Apply border-radius to preview element
    el.rectangle.style.borderRadius = values.map(toPx).join(' ');

    // Update CSS output text
    el.cssOutput.textContent = `border-radius: ${values.map(toPx).join(' ')};`;

    // Update numeric labels next to sliders
    Object.entries(el.labels).forEach(([key, span]) => {
        span.textContent = toPx(el.inputs[key].value);
    });
}




/* ==================================================
   EVENT LISTENERS – SLIDERS
   ==================================================
   Handles slider input and active preview state.
*/
Object.values(el.inputs).forEach(input => {
    input.addEventListener('input', updateCSS);

    input.addEventListener('pointerdown', () => {
        el.rectangle.classList.add('active');
    });

    input.addEventListener('pointerup', () => {
        el.rectangle.classList.remove('active');
    });
});




/* ==================================================
   RESET BUTTON
   ==================================================
   Resets all slider values to defaults.
*/
el.resetButton.addEventListener('click', () => {
    Object.values(el.inputs).forEach(input => (input.value = 75));
    updateCSS();
});




/* ==================================================
   COPY TO CLIPBOARD
   ==================================================
   Copies the generated CSS to clipboard
   and provides user feedback.
*/
el.copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(el.cssOutput.textContent)
        .then(() => {
            el.copyButton.textContent = "Zkopírováno!";
            el.copyButton.classList.add('copied');

            setTimeout(() => {
                el.copyButton.textContent = "Zkopírovat do schránky";
                el.copyButton.classList.remove('copied');
            }, 1200);
        });
});




/* ==================================================
   INIT
   ==================================================
   Initial application state.
*/
updateCSS();
